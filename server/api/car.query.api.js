const axios = require("axios");
const baseUrl = "https://www.carqueryapi.com/api/0.3/";

// Client
const axiosClientGet = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
    },
  });
  return response.data;
};

// Get Url
const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  return `${baseUrl}${endpoint}&${qs}`;
};

// Endpoints
const carEndpoints = {
  getMakes: ({ year }) => getUrl(`?cmd=getMakes&year=${year}`),
  getModels: ({ year, make }) =>
    getUrl(`?&cmd=getModels&year=${year}&make=${make}`),
  getCarDetails: ({ year, make, model }) =>
    getUrl(`?cmd=getTrims&make=${make}&model=${model}&year=${year}`),
};

// API
const carQueryApi = {
  getMakes: async ({ year }) =>
    await axiosClientGet(carEndpoints.getMakes({ year })),
  getModels: async ({ year, make }) =>
    await axiosClientGet(carEndpoints.getModels({ year, make })),
  getDetails: async ({ year, make, model }) =>
    await axiosClientGet(carEndpoints.getCarDetails({ year, make, model })),
};

module.exports = carQueryApi;
