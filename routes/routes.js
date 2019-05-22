const express = require("express");
const router = express.Router();
const RoutesSchema = require('../models/Route');
const BusModel = require('../models/Bus');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.get("/",  async (req, res) => {
    let route = await RoutesSchema.find();
    res.send(route);
});


router.get("/:route_id",auth,  async (req, res) => {
    let route = await RoutesSchema.findById(req.params.route_id);
    res.send(route);
});

// getting the specific value on subdocument
router.get('/:route_id/:seat_id', auth, async (req, res) => {
    let route = await RoutesSchema.findById(req.params.route_id);
    
    let seat = route.seats.id(req.params.seat_id);
    res.send(seat);
});


/* edit bus */
router.put('/edit_bus/:id', [auth, admin], async (req, res) => {
    let bus = await BusModel.findById(req.params.id);
    bus.isAvailable = req.body.isAvailable;

    bus = await bus.save();
    res.send(bus);
});

router.post("/", [auth, admin], async (req, res) => {
    
    
    let seatsArray = [];
    let r = 0;
    if (req.body.total_seats === 60) {
        r = 5;
    }else{
        r = 4;
    }
    
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        for (let s = 1; s <= r; s++) {
            if (seatsArray.length < req.body.total_seats ) {
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
        departure: {
            date: req.body.date,
            time: req.body.time
        },
        price: req.body.price,
        total_seats: req.body.total_seats,
        seats: seatsArray
        
    });
    
    route = await route.save();
    res.send(route);
});

//edit seats
router.put('/:route_id/:seat_id', auth,async (req, res) => {
    let d_id = req.params.route_id;
    let s_id = req.params.seat_id;
    
    let route = await RoutesSchema.findOneAndUpdate(
        { "_id": d_id, "seats._id": s_id},
        {
            $set:{
                "seats.$.isTaken": req.body.isTaken
            }
        },
        );
        
        res.send(route);
    });
    
router.put('/:routeId',auth , async (req, res) => {
    let route = await RoutesSchema.findById(req.params.routeId);
        
        
        if (route.bus_id != req.body.bus_id){
            let seatsArray = [];
            route.seats = seatsArray;
            route = await route.save();

            let r = 0;
            if (req.body.total_seats === 60) {
                r = 5;
            } else {
                r = 4;
            }
            
            for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
                for (let s = 1; s <= r; s++) {
                    if (seatsArray.length < req.body.total_seats) {
                        seatsArray.push({
                            "seatNumber": String.fromCharCode(i).concat(s),
                            "isTaken": false
                        });
                    }
                }
            }

            route.seats = seatsArray;
            route.total_seats = req.body.total_seats;
            route.bus_id = req.body.bus_id;
        }
        route.departure.date = req.body.date;
        route.departure.time = req.body.time;
        route.routes.from = req.body.from;
        route.routes.to = req.body.to;
        route.price = req.body.price;
        
        
        route = await route.save();
        res.send(route);
    });
    
    router.delete("/:route_id/:bus_id", [auth, admin], async (req, res) => {

        let bus = await BusModel.findById(req.params.bus_id);
        bus.isAvailable = true;

        bus = await bus.save();

        let route = await RoutesSchema.findByIdAndDelete(req.params.route_id);
        
        res.send(route);
    });
    
    module.exports = router;