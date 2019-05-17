const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');


const ImageSchema = new Schema({
img_name:{
    type: String,
    required: true,
    unique: true
},
bus_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
},  
});

ImageSchema.plugin(timestamps);

module.exports = mongoose.model('Image', ImageSchema);