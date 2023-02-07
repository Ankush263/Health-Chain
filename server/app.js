const express = require("express")
const cors = require("cors")
const app = express()

const hospitalRouter = require("./routes/hospitalRoutes.js")
const patientRouter = require("./routes/patientRoutes.js")
const bookingRouter = require("./routes/bookingRoutes.js")

const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorControllers.js")

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log("This is from middleware")
  next()
})

app.use("/api/v1/hospital", hospitalRouter)
app.use("/api/v1/patient", patientRouter)
app.use("/api/v1/booking", bookingRouter)

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app
