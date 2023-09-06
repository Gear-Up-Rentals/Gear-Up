import axios from "axios";
// const baseURL = `http://localhost:3000/api/v1/`;
const baseURL = `https://gear-up-tau.vercel.app/api/v1/`;
const publicClient = axios.create({
  baseURL,
  // paramsSerializer: (params) => new URLSearchParams(params).toString(),
});

publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    Headers: {
      "Content-Type": "application/json",
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (err.code == "ERR_NETWORK") {
      throw err;
    }
    throw err.response.data;
  }
);

export default publicClient;
