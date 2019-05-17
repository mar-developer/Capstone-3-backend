const express = require("express");
const router = express.Router();
const ImageModel = require('../models/Image');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
    let image = await ImageModel.find();
    res.send(image);
});

router.post("/", [auth, admin],async (req, res) => {
    let image = ImageModel({
        img_name: req.body.img_name,
        bus_id: req.body.bus_id,
    });

    image = await image.save();
    res.send(image);
});

router.put('/:id', [auth, admin], async (req, res) => {

    let image = await ImageModel.findById(req.params.id);

    image.img_name = req.body.img_name;

    image = await image.save();
    res.send(image);
});


router.delete("/:id", [auth, admin], async (req, res) => {
    let image = await ImageModel.findByIdAndDelete(req.params.id);

    res.send(image);
});


module.exports = router
