const express = require("express");
const router = express.Router();
const CommentSchema = require('../models/Comment');

router.get("/", async (req, res) => {
    let comment = await CommentSchema.find();
    res.send(comment);
});

router.post("/", async (req, res) => {
    let comment = CommentSchema({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        message: req.body.comment,
        isRead: false
    });

    comment = await comment.save();
    res.send(comment);
});

module.exports = router
