const mongoose = require("mongoose");

var tripSchema = new mongoose.Schema({
  
    timestamp : Number,
    dest      : String,
    password      : String,
    title     : String,
    timeOfTrip: String

});

module.exports = mongoose.model("Trip", tripSchema);