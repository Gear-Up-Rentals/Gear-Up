import paymentClient from "../client/payment.client";

const PaymentApi = {
    createPayment: async () => {
        try {
            const response = await paymentClient.post("/checkout", {});
            console.log(response);
            return { response };
        } catch (err) {
            return { err };
        }
    },
};

export default PaymentApi;
