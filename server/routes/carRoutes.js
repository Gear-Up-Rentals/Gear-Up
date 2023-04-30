const express = require("express");
const carController = require("../controllers/carController");
const docsValidation = require("../utils/docsValidation");

const router = express.Router(); //this is a middleware
router
  .route("/")
  .get(carController.getAllCars)
  .post(
    docsValidation.ensureChassis,
    docsValidation.ensureRC,
    docsValidation.ensureCarNumber,
    carController.createCar
  );

router
  .route("/:id")
  .get(carController.getCar)
  .patch(carController.updateCar)
  .delete(carController.deleteCar);

module.exports = router;
