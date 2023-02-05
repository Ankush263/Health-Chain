const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require("./app")
dotenv.config({ path: "./.env" })

process.on("uncaughtException", error => {
  console.log("unhandleRejection shutting down the application")
  console.log(error.name, error.message)
  process.exit(1)
})

const DB = process.env.DATABASE

mongoose.connect(DB, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true
}).then((con) => {
  console.log("DB connected successfully")
  console.log(process.env.NODE_ENV)
})

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  console.log(`You are listening to the port ${port}`)
})

process.on("unhandledRejection", err => {
  console.log("UnhandleRejection Shutting down the application")
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
