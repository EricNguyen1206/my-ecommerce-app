import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const api = axios.create(
    { baseURL: BASE_URL },
    { headers: { "Content-Type": "application/json" } }
);

api.interceptors.response.use((res) => res.data);

const authApi = {
    login(account) {
        const url = "/auth/login";
        return api.post(url, account);
    },
    register(newAccount) {
        const url = "/auth/register";
        return api.post(url, newAccount);
    },
    refreshToken(token) {
        console.log("token", token);
        const url = "/auth/refreshToken";
        return api.post(url, { token: token });
    },
};
const productsAPI = {
    getAll() {
        const url = "/products";
        return api.get(url);
    },
    getById(id) {
        const url = `/products/find/${id}`;
        return api.get(url);
    },
    getByCategories(cat) {
        const url = `/products?category=${cat}`;
        return api.get(url);
    },
};

const cartAPI = {
    addProduct(token, cart) {
        const url = ``;
        return api.post(url, {
            headers: { token: token },
            body: JSON.stringify(cart),
        });
    },
    checkUserCart(userId, JWTToken) {
        console.log("userId", userId);
        console.log("token", JWTToken);
        const url = `/carts/find/${userId}`;

        return api.get(url, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
    },
    create(JWTToken, cart) {
        const url = "/carts";
        return api.post(
            url,
            {
                headers: { authorization: `Bearer ${JWTToken}` },
            },
            cart
        );
    },
    update(token, id) {},
    delete(token, id) {},
    getUserCart(token, id) {},
    getAll(token) {},
};

export { authApi, productsAPI, cartAPI };
export default api;
