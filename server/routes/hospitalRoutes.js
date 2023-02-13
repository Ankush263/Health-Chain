const express = require("express")
const Hospital = require("../model/hospitalModel.js")

const {
  createHospital,
  getHospital,
  updateHospital,
  getSingleHospital,
  deleteHospital,
  findDoctor
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

router
  .route("/:id/:walletAddress")
    .get(findDoctor)


module.exports = router
