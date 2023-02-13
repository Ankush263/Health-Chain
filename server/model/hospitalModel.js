const mongoose = require("mongoose")
const validator = require("validator")


const doctorSchema = new mongoose.Schema({
  doctors: [
    {
      name: {
        type: String,
        required: [true, "must provide doctor name"]
      },
      walletAddress: {
        type: String,
        required: [true, "must provide doctor wallet address"]
      },
      email: {
        type: String,
        required: [true, "please provide doctor email"],
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, "Please provide valid email"]
      },
      image: {
        type: String,
        required: [true, "must provide doctor image"]
      },
      description: {
        type: String,
        required: [true, "must provide doctor description"]
      },
      gender: {
        type: String,
        // required: [true, "must provide gender"]
      },
      specialistAt: {
        type: String,
        required: [true, "must provide specialist at"]
      },
      availableTime: {
        type: String,
        required: [true, "must provide available time"]
      },
      availableDate: {
        type: String,
        required: [true, "must provide available date"]
      }
    }
  ]
})

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide Hospital name"]
  },
  email: {
    type: String,
    required: [true, "please provide hospital email"],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Please provide valid email"]
  },
  image: {
    type: [String],
    required: [true, "must provide Hospital image"]
  },
  location: {
    type: String,
    required: [true, "must provide Location"]
  },
  walletAddress: {
    type: String,
    required: [true, "must provide wallet address"]
  },
  description: {
    type: String,
    required: [true, "must provide Hospital description"]
  },
  telephone: {
    type: [String],
    required: [true, "must provide teliphone number"]
  },
  allDoctors: {
    type: doctorSchema
  },
  openingHours: {
    type: String,
    // required: [true, "must provide opening hours"]
  }
})

const Hospital = mongoose.model("Hospital", hospitalSchema)

module.exports = Hospital
