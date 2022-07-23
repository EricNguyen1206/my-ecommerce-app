import axiosCLient from "./axiosClient";

const cartApi = {
    update(cart, user) {
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = `/carts/${userId}`;
        cart.userId = userId;
        return axiosCLient.put(url, cart, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
    },
    checkUserCart(user) {
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = `/carts/find/${userId}`;
        return axiosCLient.get(url, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
    },
    create(cart, user) {
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = "/carts";
        cart.userId = userId;
        return axiosCLient.post(url, cart, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
    },
    delete() {
        const user = JSON.parse(localStorage.getItem("user"));
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = `/carts/${userId}`;
        return axiosCLient.delete(url, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
    },
};

export { cartApi };
