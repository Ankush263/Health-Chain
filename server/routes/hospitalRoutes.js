const express = require("express")

const {
  createHospital,
  getHospital,
  updateHospital,
  getSingleHospital
} = require("../controllers/HospitalControllers.js")

const router = express.Router()

router
  .route("/")
    .post(createHospital)
    .get(getHospital)

router
  .route("/:id")
    .patch(updateHospital)
    .get(getSingleHospital)

module.exports = router
