const express = require("express");
const router = express.Router();
const RoutesSchema = require('../models/Route');
const BusModel = require('../models/Bus');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.get("/",auth,  async (req, res) => {
    let route = await RoutesSchema.find();
    res.send(route);
});

router.get("/:id",auth,  async (req, res) => {
    let route = await BusModel.findById(req.params.id);
    res.send(route);
});


router.post("/", async (req, res) => {
    

    let seatsArray = [];
    if (req.body.total_seats == 45 || req.body.total_seats == 53) {
        let r = 4;
    }else{
        let r = 5;
    }

    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        for (let s = 1; s <= r; s++) {
            if (seatsArray.length <= req.body.total_seats ) {
                seatsArray.push({
                    "seatNumber": String.fromCharCode(i).concat(s),
                    "isTaken": false
                });
            }
        }
    }
    let route = RoutesSchema({
        bus_id: req.body.bus_id,
        routes: {
            from: req.body.from,
            to: req.body.to
        },
        departureDate: req.body.departureDate,
        departureTime: req.body.departureTime,
        price: req.body.price,
        total_seats: req.body.total_seats,
        seats: seatsArray
        
    });

    route = await route.save();
    res.send(route);
});

//edit seats
router.put('/:routeId/:seatId', auth,async (req, res) => {
    let d_id = req.params.destinationId;
    let s_id = req.params.seatId;

    let route = await RoutesSchema.findOneAndUpdate(
        { "_id": d_id, "seats._id": s_id},
        {
            $set:{
                "seats.$.seatNumber": req.body.seatNumber
            }
        },
        );

        res.send(route);
});

router.put('/:id',auth , async (req, res) => {
    let route = await RoutesSchema.findById(req.params.id);

    route.bus_id = req.body.bus_id;
    route.departureDate = req.body.departureDate;
    route.departureTime = req.body.departureTime;
    route.routes.from = req.body.from;
    route.routes.to = req.body.to;
    route.price = req.body.price;

       
    route = await route.save();
    res.send(route);
});

router.delete("/:id", [auth, admin], async (req, res) => {
    let route = await RoutesSchema.findByIdAndDelete(req.params.id);

    res.send(route);
});

module.exports = router;