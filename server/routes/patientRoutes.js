const express = require("express")

const {
  getPatient,
  getSinglePatient,
} = require("../controllers/PatientControllers.js")

const{
  signup,
  login
} = require("../controllers/authControllers.js")

const router = express.Router()

router
  .route("/signup")
    .post(signup)

router
  .route("/login")
    .post(login)

router
  .route("/")
    .get(getPatient)

router
  .route("/:id")
    .get(getSinglePatient)

module.exports = router
