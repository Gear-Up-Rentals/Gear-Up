import paymentClient from "../client/payment.client";

const PaymentApi = {
    createPayment: async (carId) => {
        try {
            console.log("this is carid----> ", carId);
            const response = await paymentClient.post(`/checkout/${carId}`, {});
            // console.log(response);
            return { response };
        } catch (err) {
            return { err };
        }
    },
};

export default PaymentApi;
