import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
export const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
).user
    ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).user
          .accessToken
    : "";

const publicRequest = axios.create({
    baseURL: BASE_URL,
});

const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { authorization: `Bearer ${TOKEN}` },
});

publicRequest.interceptors.response.use((res) => res.data);
userRequest.interceptors.response.use((res) => res.data);
export { publicRequest, userRequest };
