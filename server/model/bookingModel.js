const mongoose = require("mongoose")
const Patient = require("./patientModel")

const bookingSchema = new mongoose.Schema({
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"
  },
  bookingTime: {
    type: String,
    required: [true, "must provide booking time"]
  },
  bookingDate: {
    type: String,
    required: [true, "must provide booking date"]
  }
})

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking
