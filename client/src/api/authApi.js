import axiosCLient from "./axiosClient";

const authApi = {
    async login(account) {
        const url = "/auth/login";
        const res = await axiosCLient.post(url, account);
        return res;
    },
    register(newAccount) {
        const url = "/auth/register";
        return axiosCLient.post(url, newAccount);
    },
    refreshToken() {
        let user = JSON.parse(localStorage.getItem("user"));
        const JWTToken = user.refreshToken;
        const url = "/auth/refreshToken";
        return axiosCLient.post(url, { token: JWTToken });
        // return newToken.accessToken;
    },
};

export { authApi };
