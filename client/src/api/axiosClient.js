import axios from "axios";

const axiosCLient = axios.create(
    { baseURL: "https://my-ecom-app-nodejs.herokuapp.com/api/" },
    { headers: { "Content-Type": "application/json" } }
);

// Add a request interceptor
axiosCLient.interceptors.request.use(
    (res) => res,
    (err) => Promise.reject(err)
);

// Add a response interceptor
axiosCLient.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
);

export default axiosCLient;
