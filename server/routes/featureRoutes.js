const express = require("express");
const featureController = require("../controllers/featureController");
const router = express.Router(); //this is a middleware

router.route("/getMakes").get(featureController.getMakes);
router.route("/getModels").get(featureController.getModels);
router.route("/getCarDetails").get(featureController.getCarDetails);

module.exports = router;
