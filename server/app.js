const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
// Routes
const userRouter = require("./routes/userRoutes");
const carRouter = require("./routes/carRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const featureRouter = require("./routes/featureRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //in miliseconds
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use(cors());
app.use("/api", limiter);
app.use(express.json());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data Sanitization against XSS
app.use(xss());
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

app.use(express.urlencoded({ extended: false }));

// Serving static fields
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log(`Request : ${req.method} "${req.url}"`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routes (Middlewares too)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cars", carRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/features", featureRouter);

//This will run for all routes that weren't catched by middlewares before
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); //anything you pass into next will be assumed to be error
});

//this is an error handling middleware
app.use(globalErrorHandler);
module.exports = app;
