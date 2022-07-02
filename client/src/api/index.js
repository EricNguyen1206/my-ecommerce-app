import axios from "axios";

const BASE_URL = "https://my-ecom-app-nodejs.herokuapp.com/api/";
const api = axios.create(
    { baseURL: BASE_URL },
    { headers: { "Content-Type": "application/json" } }
);

api.interceptors.response.use((res) => res.data);

const authApi = {
    async login(account) {
        const url = "/auth/login";
        const res = await api.post(url, account);
        return res;
    },
    register(newAccount) {
        const url = "/auth/register";
        return api.post(url, newAccount);
    },
    async refreshToken() {
        let user = JSON.parse(localStorage.getItem("user"));
        const JWTToken = user.refreshToken;
        const url = "/auth/refreshToken";
        let newToken = "";
        newToken = await api.post(url, { token: JWTToken });
        return newToken.accessToken;
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
    async update(cart, user) {
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = `/carts/${userId}`;
        cart.userId = userId;
        console.log("cart", cart);
        return await api.put(url, cart, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
    },
    async checkUserCart(user) {
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = `/carts/find/${userId}`;
        const res = await api.get(url, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
        return res;
    },
    async create(cart, user) {
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = "/carts";
        cart.userId = userId;
        console.log("cart", cart);

        const res = await api.post(url, cart, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
        return res;
    },
    delete() {
        const user = JSON.parse(localStorage.getItem("user"));
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = `/carts/${userId}`;
        return api.delete(url, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
    },
};

export { authApi, productsAPI, cartAPI };
export default api;
