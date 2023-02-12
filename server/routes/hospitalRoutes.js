const express = require("express")

const {
  createHospital,
  getHospital,
  updateHospital,
  getSingleHospital,
  deleteHospital
} = require("../controllers/HospitalControllers.js")

const {
  protect
} = require("../controllers/authControllers.js")

const router = express.Router()

router
  .route("/")
    .get(getHospital)
    .post(createHospital)

router
  .route("/:id")
    .patch(updateHospital)
    .get(getSingleHospital)
    .delete(deleteHospital)

module.exports = router
