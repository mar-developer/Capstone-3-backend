const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');


const BusSchema = new Schema({
    busName:{
        type: String,
        required: true,
        unique: true
    },
    Driver:{
        DriverName: {
            type: String,
            required: true,
        },
        DriverLicense:{
            type: String,
            required: true,   
        }
    },
    plate_number: {
        type: String,
        required: true,
        unique: true
    },
    seats_type: {
        type: String,
        required: true,
    },
    bus_type: {
        type: String,
        required: true
    },
    image_inside: {
        type: String,
        required: true
    },
    image_front: {
        type: String,
        required: true
    },
    isAvailable:Boolean
});

BusSchema.plugin(timestamps);

module.exports = mongoose.model('Bus', BusSchema);