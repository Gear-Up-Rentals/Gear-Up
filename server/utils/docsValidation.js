const validateLicense = (expression) => {
  // Valid : KA01AB1234
  const pat = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/i;
  if (expression == null) return false;
  const result = expression.match(pat);
  if (result) {
    return true;
  }
  return false;
};
const validateCarNumber = (expression) => {
  // Valid : MH12AB3746
  const pat = /^([A-Z]{2}[- ]?)?([0-9]{1,2}[- ]?)[A-Z]{1,2}[- ]?([0-9]{4})$/;
  if (expression == null) return false;
  const result = expression.match(pat);
  if (result) {
    return true;
  }
  return false;
};
const validateChassis = (expression) => {
  // Valid : MAJ1XXMRJ1AW56493
  const pat = /^([A-HJ-NPR-Z0-9]){17}$/;
  if (expression == null) return false;
  const result = expression.match(pat);
  if (result) {
    return true;
  }
  return false;
};

const validateRC = (expression) => {
  // Valid : MH01AB3456
  const pat = /^([A-Z]{2}[0-9]{2})( )?([A-Z]{0,3})?(-)?([0-9]{4})$/;
  if (expression == null) return false;
  const result = expression.match(pat);
  if (result) {
    return true;
  }
  return false;
};

exports.ensureCarNumber = function (req, res, next) {
  const carNo = req.body.carNo;
  if (validateCarNumber(carNo)) {
    return next();
  } else {
    return res.status(498).json({
      status: "Invalid",
      error: "Invalid Car Number",
      message: "The Car Number is not valid. Please try again",
    });
  }
};
exports.ensureLicense = function (req, res, next) {
  const licenseNo = req.body.licenseNo;
  if (validateLicense(licenseNo)) {
    return next();
  } else {
    return res.status(498).json({
      status: "Invalid",
      error: "Invalid License",
      message: "The license is not valid. Please try again",
    });
  }
};
exports.ensureChassis = function (req, res, next) {
  const chassisNo = req.body.chassisNo;
  if (validateChassis(chassisNo)) {
    return next();
  } else {
    return res.status(498).json({
      status: "Invalid",
      error: "Invalid chassis number",
      message: "The chasis number is not valid. Please try again",
    });
  }
};

exports.ensureRC = function (req, res, next) {
  const rcNo = req.body.rcNo;
  if (validateRC(rcNo)) {
    return next();
  } else {
    return res.status(498).json({
      status: "Invalid",
      error: "Invalid RC number",
      message: "The RC number is not valid. Please try again",
    });
  }
};
