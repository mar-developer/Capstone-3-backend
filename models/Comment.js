const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');


const CommentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    isRead: Boolean
});

CommentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment', CommentSchema);