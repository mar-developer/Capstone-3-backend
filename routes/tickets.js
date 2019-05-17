const express = require("express");
const router = express.Router();
const TicketModel = require('../models/Ticket');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.get("/", auth, async (req, res) => {
    let ticket = await TicketModel.find();
    res.send(ticket);
});


router.post("/", async (req, res) => {

    
    let ticket = TicketModel({
        ticketNumber: req.body.ticketNumber,
        bus_id: req.body.bus_id,
        bookingDate: req.body.bookingDate,
        quantity: req.body.quantity,
        destination_id: req.body.destination_id,
        user_id: req.body.user_id
    });

    ticket = await ticket.save();
    res.send(ticket);
});

router.put('/:id', auth,async (req, res) => {
    let ticket = await TicketModel.findById(req.params.id);

    ticket.bus_id = req.body.bus_id;
    ticket.ticketNumber = req.body.ticketNumber;
    ticket.bookingDate = req.body.bookingDate;
    ticket.quantity = req.body.quantity;
    ticket.destination_id = req.body.destination_id;
    ticket.user_id = req.body.user_id;


    ticket = await ticket.save();
    res.send(ticket);
});

router.delete("/:id", [auth, admin],async (req, res) => {
    let ticket = await TicketModel.findByIdAndDelete(req.params.id);

    res.send(ticket);
});

module.exports = router;