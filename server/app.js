const express = require("express")
const cors = require("cors")
const app = express()
const hospitalRouter = require("./routes/hospitalRoutes.js")
const patientRouter = require("./routes/patientRoutes.js")
const AppError = require("./utils/appError")

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log("This is from middleware")
  next()
})

app.use("/api/v1/hospital", hospitalRouter)
app.use("/api/v1/patient", patientRouter)

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

module.exports = app