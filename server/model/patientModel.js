const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide patient name"]
  },
  walletAddress: {
    type: String,
    required: [true, "must provide patient wallet address"]
  },
  age: {
    type: Number,
    required: [true, "must provide patient age"]
  },
  gender: {
    type: String,
    required: [true, "must provide patient gender"]
  },
  height: {
    type: String
  },
  weight: {
    type: String
  }
})

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient
