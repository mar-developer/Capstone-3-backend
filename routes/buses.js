const express = require("express");
const router = express.Router();
const BusModel = require('../models/Bus');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
    let buses = await BusModel.find();
    res.send(buses);
});


router.post("/", [auth, admin],  async (req, res) => {

    let bus = BusModel({
        busName: req.body.busName,
        plate_number: req.body.plate_number,
        seats_type: req.body.seats_type,
        Driver: {
            DriverName: req.body.DriverName,
            DriverLicense: req.body.DriverLicense
        },
        bus_type: req.body.bus_type,
        image_inside: req.body.image_inside,
        image_front: req.body.image_front,
        isAvailable: "true"

    });

    bus = await bus.save();
    res.send(bus);
});

router.put('/:bus_id', [auth, admin], async (req, res) => {

    let bus = await BusModel.findById(req.params.bus_id);

    bus.busName = req.body.busName;
    bus.plate_number = req.body.plate_number;
    bus.seats_type = req.body.seats_type
    bus.Driver.DriverName = req.body.DriverName;
    bus.Driver.DriverLicense = req.body.DriverLicense;
    bus.bus_type = req.body.bus_type;

    if(req.body.image_inside){
        bus.image_inside = req.body.image_inside;
    }

    if(req.body.image_front){
        bus.image_front = req.body.image_front;
    }
    
    bus.isAvailable = req.body.isAvailable;


    bus = await bus.save();
    res.send(bus);
});
 
router.delete("/:id", [auth, admin], async (req, res) => {
    let bus = await BusModel.findByIdAndDelete(req.params.id);

    res.send(bus);
});

module.exports = router;