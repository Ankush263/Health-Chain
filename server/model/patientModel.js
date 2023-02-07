const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide patient name"]
  },
  walletAddress: {
    type: String,
    unique: true,
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
  email: {
    type: String,
    required: [true, "please provide patient email"],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Please provide valid email"]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el == this.password
      },
      message: "Password is not same"
    }
  },
  passwordChangedAt: Date
})

patientSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

patientSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

patientSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if(this.passwordChangedAt) {
    console.log(this.passwordChangedAt, JWTTimestamp)
  }
  return false
}

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient
