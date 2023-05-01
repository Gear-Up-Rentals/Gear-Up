import axios from "axios";
const baseURL = `http://localhost:3000`;

const paymentClient = axios.create({ baseURL });

paymentClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        Headers: {
            "Content-Type": "application/json",
        },
    };
});

paymentClient.interceptors.response.use(
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

export default paymentClient;
