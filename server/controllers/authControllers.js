const Patient = require("../model/patientModel")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

// ----------CREATE TOKEN----------
const signToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

// ----------SIGN UP----------
exports.signup = catchAsync(async (req, res, next) => {
  const newPatient = await Patient.create({
    name: req.body.name,
    walletAddress: req.body.walletAddress,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })

  const token = signToken(newPatient._id)

  res.status(201).json({
    status: "Success",
    token,
    data: {
      patient: newPatient
    }
  })
})

// ----------LOGIN USER----------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if(!email || !password) {
    return next(new AppError("Please provide your email and password"), 401)
  }
  const patient = await Patient.findOne({ email }).select("+password")

  if(!patient || !(await patient.correctPassword(password, patient.password))) {
    return next(new AppError("Incorrect Email and Password", 401))
  }

  const token = signToken(patient.id)
  res.status(200).json({
    status: "Success",
    token
  })
})

// ----------PROTECTING DATA----------
exports.protect = catchAsync(async (req, res, next) => {
  let token
  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
    
  }

  if(!token) {
    return next(new AppError("You are not loged in to get access", 401))
  }
  // validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // Patient exists
  const freshPatient = await Patient.findById(decoded.id)

  if(!freshPatient) {
    return next(new AppError("The user belonging to this token no longer exist", 401))
  }

  // Change Password
  freshPatient.changedPasswordAfter(decoded.iat)


  next()
})
