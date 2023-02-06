const AppError = require("../utils/appError")

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 404)
}

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(?<=")(?:\\.|[^"\\])*(?=")/)
  const message = `Duplicate field values ${value}, Please use another value`
  return new AppError(message, 400)
}

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message)
  const message = `Invalid input Data. ${errors.join(". ")}`
  return new AppError(message, 404)
}

const handleJWTError = err => new AppError("Invalid Token, Please login again", 401)

const handleJWTExpiredError = err => new AppError("Your token got expired, Please ligin again", 401)

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  if(err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    console.log(err)
    res.status(500).json({
      status: "error",
      message: "Something went very wrong"
    })
  }
}

module.exports = (err, req, res, next) => {
  // console.log(err.stack)
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if(process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  }else if(process.env.NODE_ENV === "production") {
    let error = { ...err }
    if(error.name === "CastError") error = handleCastErrorDB(error)
    if(error.code === 11000) error = handleDuplicateFieldsDB(error)
    if(error.name === "ValidationError") error = handleValidationError(error)
    if(error.name === "JsonWebTokenError") error = handleJWTError(error)
    if(error.name === "TokenExpiredError") error = handleJWTExpiredError(error)
    sendErrorProd(error, res)
  }
  
  next()
}
