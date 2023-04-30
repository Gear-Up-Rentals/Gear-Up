const validator = require("validator");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name."],
  },
  uid: {
    type: String,
    unique: true,
    required: [true, "Firebase ID must be Provided."],
  },
  drivingLicense: {
    type: Number,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide your email"],
  },
  role: {
    type: String,
    enum: ["user", "host"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cars: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Car",
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Booking",
    },
  ],
});

UserSchema.pre(/^find/, function (next) {
  this.populate({
    path: "bookings",
    select: "-user",
  }).populate({
    path: "cars",
    select: "-user",
  });
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
