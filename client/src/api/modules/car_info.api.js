import publicClient from "../client/public.client";
const customer_key = "inpersonal";
const carImageUrl = `https://cdn.imagin.studio//getImage?customer=${customer_key}&zoomType=fullscreen&angle=23&fileType=png`;

const carEndpoints = {
  image: ({ make, model, year }) =>
    `${carImageUrl}&make=${make}&modelFamily=${model}&modelYear=${year}`,
  getMakes: ({ year }) => `features/getMakes?year=${year}`,
  getModels: ({ year, make }) => `features/getModels?year=${year}&make=${make}`,
  getCarDetails: ({ year, make, model }) =>
    `features/getCarDetails?make=${make}&model=${model}&year=${year}`,
};

const carInfoApi = {
  getImage: ({ make, model, year }) => {
    return carEndpoints.image({ make, model, year });
  },
  getMakes: async ({ year }) => {
    try {
      const response = await publicClient.get(
        carEndpoints.getMakes({ year: year })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getModels: async ({ year, make }) => {
    try {
      const response = await publicClient.get(
        carEndpoints.getModels({ year, make })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getCarDetails: async ({ year, make, model }) => {
    try {
      const response = await publicClient.get(
        carEndpoints.getCarDetails({ year, make, model })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default carInfoApi;
