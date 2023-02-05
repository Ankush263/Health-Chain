const Hospital = require("../model/hospitalModel.js")
const catchAsync = require("../utils/catchAsync.js")

exports.createHospital = catchAsync(async (req, res, next) => {
  const newHospital = await Hospital.create(req.body)
  res.status(201).json({
    status: "Success",
    data: {
      hospital: newHospital
    }
  })
})

exports.getHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.find()
  res.status(201).json({
    status: "Success",
    result: hospital.length,
    data: {
      hospital
    }
  })
})

exports.getSingleHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id)
  res.status(201).json({
    status: "Success",
    data: {
      hospital
    }
  })
})

exports.updateHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  if(!hospital) {
    return next(new AppError("No hospital found with that ID", 404))
  }
  res.status(200).json({
    status: "Success",
    data: {
      hospital
    }
  })
})