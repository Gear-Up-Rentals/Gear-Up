const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Amount must be provided"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date must be provided"],
    validate: {
      validator: function (date) {
        return date >= new Date();
      },
      message: "Start date can not be in the past",
    },
  },
  endDate: {
    type: Date,
    required: [true, "End date must be provided"],
    validate: {
      validator: function (date) {
        return date > this.startDate;
      },
      message: "End date can not be before start date",
    },
  },
  rentedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "RentedBy must be provided"],
  },
  renter: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Renter must be provided"],
  },
  car: {
    type: mongoose.Schema.ObjectId,
    ref: "Car",
    required: [true, "Car must be provided"],
  },

  location: {
    type: String,
    required: [true, "Location must be provided"],
  },
});

BookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "renter rentedBy",
    select: "name drivingLicense address email -bookings",
  }).populate({
    path: "car",
    select: "model type rating carLocation -user",
  });
  next();
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
