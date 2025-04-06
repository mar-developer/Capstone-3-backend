const express = require("express");
const router = express.Router();
const TicketModel = require('../models/Ticket');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const uniqid = require('uniqid');


router.get("/", auth, async (req, res) => {
    let ticket = await TicketModel.find();
    res.send(ticket);
});


router.post("/", async (req, res) => {
    let ticket_number = await TicketModel.find();
    
    function random_number() {  
        let unique = "";
        while(unique == ""){
            let id = uniqid()

            if (ticket_number.ticketNumber == id) {
                return unique = "";
            }else{
                return unique = id;
            }
        }

        return unique;
    }

        let unique_id = random_number();

    
    let ticket = TicketModel({
        ticketNumber: unique_id,
        bus_id: req.body.bus_id,
        bookingDate: req.body.bookingDate,
        quantity: req.body.quantity,
        price: req.body.price,
        seats: req.body.seats,
        route_id: req.body.route_id,
        user_id: req.body.user_id,
        isPaid: false,
    });

    ticket = await ticket.save();
    res.send(ticket);
});

router.put('/:id', [auth, admin],async (req, res) => {
    let ticket = await TicketModel.findById(req.params.id);
    ticket.isPaid = true;

    ticket = await ticket.save();
    res.send(ticket);
});

router.delete("/:id", [auth, admin],async (req, res) => {
    
});

module.exports = router;