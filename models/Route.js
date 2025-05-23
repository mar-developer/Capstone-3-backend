const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const RoutesSchema = new Schema({
    bus_id: {
        type: Schema.Types.ObjectId,
        ref: 'Bus'
    },
    routes: {
        from: {
            type: String,
            required: true
        },
        to : {
            type: String,
            required: true
        }
    },
    departure: {
        date:{
            type: String,
            required: true
        },
        time:{
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true 
    },
    total_seats: {
        type: Number,
        required: true
    },
    seats: [{
        seatNumber: {
            type: String,
            required: true
        },
        
        isTaken: Boolean
    }], 
    isActive: Boolean
});

RoutesSchema.plugin(timestamps);

module.exports = mongoose.model("Route", RoutesSchema);