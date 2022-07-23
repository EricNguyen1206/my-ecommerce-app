import axiosCLient from "./axiosClient";

const transactionApi = {
    checkout(paymentObj) {
        const url = "/checkout/payment";
        return axiosCLient.post(url, paymentObj);
    },
    order(orders) {
        const url = "/orders";
        return axiosCLient.post(url, orders);
    },
};

export { transactionApi };
