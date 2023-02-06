const express = require("express")

const {
  createPatient,
  getPatient,
  getSinglePatient,
  updatePatient,
  deletePatient
} = require("../controllers/PatientControllers.js")

const router = express.Router()

router
  .route("/")
    .post(createPatient)
    .get(getPatient)

router
  .route("/:id")
    .get(getSinglePatient)
    .patch(updatePatient)
    .delete(deletePatient)

module.exports = router
