const carQueryApi = require("../api/car.query.api");
exports.getMakes = async (req, res) => {
  try {
    const { year } = req.query;
    const makes = await carQueryApi.getMakes({ year });
    res.status(200).json(makes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Failed to get Makes",
    });
  }
};
exports.getModels = async (req, res) => {
  try {
    const { year, make } = req.query;
    const models = await carQueryApi.getModels({ year, make });
    res.status(200).json(models);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Failed to get Models",
    });
  }
};
exports.getCarDetails = async (req, res) => {
  try {
    const { year, make, model } = req.query;
    const details = await carQueryApi.getDetails({ year, make, model });
    res.status(200).json(details);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Failed to get Details",
    });
  }
};
