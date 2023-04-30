const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Owner must be provided"],
  },
  images: [{ type: String }],
  // The rental price per day.
  hourlyPrice: {
    type: Number,
  },
  //  The type of fuel the car uses (e.g., gasoline, diesel, hybrid, etc.).
  fuelType: {
    type: String,
    required: [true, "Fuel Type must be provided"],
  },
  // The type of transmission (e.g., manual, automatic, etc.).
  transmission: {
    type: String,
    required: [true, "Transmission must be provided"],
  },
  color: {
    type: String,
    default: "Black",
  },
  seats: {
    type: Number,
    required: [true, "Number of Seats must be provided"],
  },
  year: {
    type: Number,
    required: [true, "Year must be provided"],
  },
  // make : Car Company - Maker
  make: {
    type: String,
    required: [true, "Make must be provided"],
  },
  // This is The Model - Without Car Company Name
  model: {
    type: String,
    required: [true, "Model must be provided"],
  },
  // The body type of the car (e.g., sedan, SUV, etc.).
  bodyType: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 1;
      },
      message: (props) =>
        `${props.value} is not a valid bodyType array. It must have at least 1 value.`,
    },
  },
  rating: {
    type: Number,
    min: [1, "Rating can not be lesser than 1"],
    max: [5, "Rating can not greater than 5"],
  },
  carLocation: {
    type: String,
    required: [true, "location must be provided"],
  },
});

CarSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name drivingLicense email -bookings",
  });
  next();
});
const Car = mongoose.model("Car", CarSchema);
module.exports = Car;
