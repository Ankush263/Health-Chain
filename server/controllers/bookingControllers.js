const Booking = require("../model/bookingModel")
const catchAsync = require("../utils/catchAsync")
const ApiFeatures = require("../utils/apiFeatures")
const AppError = require("../utils/appError")

// ----------CREATE BOOKING----------
exports.createBooking = catchAsync(async (req, res, next) => {
  const newBooking = await Booking.create(req.body)
  res.status(201).json({
    status: "Success",
    data: {
      booking: newBooking
    }
  })
})

// ----------GET ALL BOOKINGS----------
exports.getBookings = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .pagination()
    .limitFields()

  const bookings = await features.query
  res.status(201).json({
    status: "Success",
    result: bookings.length,
    data: {
      booking: bookings
    }
  })
})

// ----------GET SINGLE BOOKING----------
exports.getSingleBooking = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Booking.findById(req.params.id), req.query)
    .filter()
    .limitFields()

  const booking = await features.query
  if(!booking) {
    return next(new AppError("No booking is found with that ID"), 404)
  }
  res.status(201).json({
    status: "Success",
    data: {
      booking
    }
  })
})

// ----------UPDATE BOOKING----------
exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  if(!booking) {
    return next(new AppError("No Booking is found with that ID", 404))
  }
  res.status(200).json({
    status: "Success",
    data: {
      booking
    }
  })
})

// ----------DELETE BOOKING----------
exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id)
  if(!booking) {
    return next(new AppError("No Booking is found with that ID", 404))
  }
  res.status(204).json({
    status: "Success",
    data: null
  })
})
