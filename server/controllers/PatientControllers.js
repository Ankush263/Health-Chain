const Patient = require("../model/patientModel.js")
const catchAsync = require("../utils/catchAsync.js")
const AppError = require("../utils/appError.js")
const ApiFeatures = require("../utils/apiFeatures.js")

// ----------CREATE PATIENT----------
exports.createPatient = catchAsync(async (req, res, next) => {
  const newPatient = await Patient.create(req.body)
  res.status(201).json({
    status: "Sucess",
    data: {
      patient: newPatient
    }
  })
})

// ----------GET ALL PATIENT----------
exports.getPatient = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Patient.find(), req.query)
    .filter()
    .sort()
    .pagination()
    .limitFields()

  const patient = await features.query
  res.status(201).json({
    status: "Success",
    result: patient.length,
    data: {
      patient
    }
  })
})

// ----------GET SINGLE PATIENT----------
exports.getSinglePatient = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Patient.findById(req.params.id), req.query)
    .limitFields()
    .filter()

  const patient = await features.query
  if(!patient) {
    return next(new AppError("No patient found with that ID"), 404)
  }
  res.status(201).json({
    status: "Success",
    data: {
      patient
    }
  })
})

// ----------UPDATE PATIENT----------
exports.updatePatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true
  })
  if(!patient) {
    return next(new AppError("No patient found with that ID"), 404)
  }
  res.status(200).json({
    status: "Success",
    data: {
      patient
    }
  })
})

// ----------DELETE PATIENT----------
exports.deletePatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id)
  if(!patient) {
    return next(new AppError("No patient found with that ID"), 404)
  }
  res.status(204).json({
    status: "Success",
    data: null
  })
})
