const Patient = require("../model/patientModel.js")
const catchAsync = require("../utils/catchAsync.js")
const AppError = require("../utils/appError.js")
const ApiFeatures = require("../utils/apiFeatures.js")

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

