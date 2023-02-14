const express = require("express")

const {
  createBooking,
  getBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking
} = require("../controllers/bookingControllers")

const {
  protect
} = require("../controllers/authControllers")

const router = express.Router()

router
  .route("/")
    .post(createBooking)
    .get(getBookings)

router
  .route("/:id")
    .get(getSingleBooking)
    .patch(updateBooking)
    .delete(deleteBooking)

module.exports = router
