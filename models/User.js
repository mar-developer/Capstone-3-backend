const mongoose = require('mongoose'); 
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emergency: {
        name: {
            type: String,
            required: true
        },
        relationship: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
    },
    isActive: Boolean,
    isAdmin: Boolean

});


UserSchema.plugin(timestamps);


module.exports = mongoose.model('User', UserSchema);