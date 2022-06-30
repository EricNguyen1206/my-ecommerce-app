import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const api = axios.create(
    { baseURL: BASE_URL },
    { headers: { "Content-Type": "application/json" } }
);

api.interceptors.response.use((res) => res.data);

const authApi = {
    async login(account) {
        console.log("account", account);
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
        // const getNewToken = async () => {
        // };
        // getNewToken();
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
    update(cart) {
        const user = JSON.parse(localStorage.getItem("user"));
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = `/carts/${userId}`;
        cart.userId = userId;
        return api.put(url, {
            headers: { authorization: `Bearer ${JWTToken}` },
            body: JSON.stringify(cart),
        });
    },
    checkUserCart(user) {
        const JWTToken = user.accessToken;
        const userId = user.user._id;
        const url = `/carts/find/${userId}`;
        return api.get(url, {
            headers: { authorization: `Bearer ${JWTToken}` },
        });
    },
    create(cart, userId, JWTToken) {
        const url = "/carts";
        cart.userId = userId;
        console.log("create cart", cart);
        return api.post(
            url,
            {
                headers: { authorization: `Bearer ${JWTToken}` },
            },
            cart
        );
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
