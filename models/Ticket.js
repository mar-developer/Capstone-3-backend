const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const TicketSchema = new Schema({
  ticketNumber: {
    type: String,
    required: true,
    unique: true
  },
  quantity: Number,
  bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus'
  },
  bookingDate: {
        type: String,
        required: true
  },
  destination_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});

TicketSchema.plugin(timestamps);

module.exports = mongoose.model("Ticket", TicketSchema);