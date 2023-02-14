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
  patientAddress: {
    type: String,
    required: [true, "must provide patient wallet address"]
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
