import { publicRequest, userRequest } from "../api";

export const authApi = {
    login(account) {
        const url = "/auth/login";
        return publicRequest.post(url, account);
    },
    register(newAccount) {
        const url = "/auth/register";
        return publicRequest.post(url, newAccount);
    },
    refreshToken(token) {
        console.log("token", token);
        const url = "/auth/refreshToken";
        return publicRequest.post(url, { token: token });
    },
};

export const productsApi = {
    get() {
        return publicRequest.get("/products");
    },
    add(product) {
        console.log("Post:", product);
        return userRequest.post(`/products`, product);
    },
    update(product) {
        console.log("updated");
        return product;
    },
    delete(id) {
        return userRequest.delete(`/products/${id}`);
    },
};
