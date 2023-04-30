import publicClient from "../client/public.client";
const carEndpoints = {
  getAllCars: `/cars`,
  createCar: `/cars`,
  getCar: ({ carId }) => `/cars/${carId}`,
  updateCar: ({ carId }) => `/cars/${carId}`,
  deleteCar: ({ carId }) => `/cars/${carId}`,
};

const carApi = {
  getAllCars: async (params = {}) => {
    try {
      const response = await publicClient.get(carEndpoints.getAllCars, {
        params,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getCar: async ({ carId }) => {
    try {
      const response = await publicClient.get(carEndpoints.getCar({ carId }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createCar: async ({
    userId,
    images,
    hourlyPrice,
    fuelType,
    transmission,
    color,
    seats,
    year,
    make,
    model,
    bodyType,
    rating,
    carLocation,
    carNo,
    chassisNo,
    rcNo,
    rent,
    upi,
  }) => {
    try {
      const response = await publicClient.post(carEndpoints.createCar, {
        user: userId,
        images,
        hourlyPrice,
        fuelType,
        transmission,
        color,
        seats,
        year,
        make,
        model,
        bodyType,
        rating,
        carNo,
        chassisNo,
        rcNo,
        rent,
        upi,
        carLocation,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  deleteCar: async ({ carId }) => {
    try {
      const response = await publicClient.delete(
        carEndpoints.deleteCar({ carId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateCar: async (fields, { carId }) => {
    try {
      const response = await publicClient.patch(
        carEndpoints.updateCar({ carId }),
        fields
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default carApi;
