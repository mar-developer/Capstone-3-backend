const express = require("express");
const router = express.Router();
const MessageSchema = require('../models/Comment');

router.get("/", async (req, res) => {
    let message = await MessageSchema.find();
    res.send(message);
});

router.post("/", async (req, res) => {
    let message = MessageSchema({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        message: req.body.comment,
        isRead: false
    });

    comment = await comment.save();
    res.send(message);
});

module.exports = router
