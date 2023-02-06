const express = require("express")

const {
  createHospital,
  getHospital,
  updateHospital,
  getSingleHospital,
  deleteHospital
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
    .delete(deleteHospital)

module.exports = router
