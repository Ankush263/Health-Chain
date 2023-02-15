const Hospital = require("../model/hospitalModel.js")
const catchAsync = require("../utils/catchAsync.js")
const ApiFeatures = require("../utils/apiFeatures.js")
const AppError = require("../utils/appError.js")

// ----------CREATE HOSPITAL----------
exports.createHospital = catchAsync(async (req, res, next) => {
  const newHospital = await Hospital.create(req.body)
  res.status(201).json({
    status: "Success",
    data: {
      hospital: newHospital
    }
  })
})

// ----------GET ALL HOSPITALs----------
exports.getHospital = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Hospital.find(), req.query)
    .filter()
    .sort()
    .pagination()
    .limitFields()
  
  const hospital = await features.query
  res.status(201).json({
    status: "Success",
    result: hospital.length,
    data: {
      hospital
    }
  })
})

// ----------GET SINGLE HOSPITAL----------
exports.getSingleHospital = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Hospital.findById(req.params.id), req.query)
    .limitFields()
    .filter()

  const hospital = await features.query
  if(!hospital) {
    return next(new AppError("no hospital found with that ID", 404))
  }
  res.status(201).json({
    status: "Success",
    data: {
      hospital
    }
  })
})

// ----------FIND A DOCTOR FROM HOSPITAL BY IT's WALLETADDRESS----------

exports.findDoctor = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findOne(
    {
      "allDoctors.doctors.walletAddress": req.params.walletAddress 
    }
  )

  const doctor = hospital?.allDoctors.doctors.find(doctor => doctor.walletAddress === req.params.walletAddress)
  res.status(200).json({
    status: "Success",
    data: {
      doctor
      }
  })
})

// ----------UPDATE A SINGLE HOSPITAL----------
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

// ----------DELETE A SINGLE HOSPITAL----------
exports.deleteHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findByIdAndDelete(req.params.id)
  if(!hospital) {
    return next(new AppError("no hospital found with that ID", 404))
  }
  res.status(204).json({
    status: "Success",
    data: null
  })
})
