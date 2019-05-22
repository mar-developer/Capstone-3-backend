const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const TicketSchema = new Schema({
  ticketNumber: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus'
  },
  bookingDate: {
        type: String,
        required: true
  },
  route_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route'
  },
  seats: {
      type: String,
      required: true
    },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPaid: Boolean

});

TicketSchema.plugin(timestamps);

module.exports = mongoose.model("Ticket", TicketSchema);