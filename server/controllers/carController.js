const factory = require("./handlerFactory");
const Car = require("../models/carModel");

exports.createCar = factory.createOne(Car);
exports.updateCar = factory.updateOne(Car);
exports.deleteCar = factory.deleteOne(Car);
exports.getAllCars = factory.getAll(Car);
exports.getCar = factory.getOne(Car);
