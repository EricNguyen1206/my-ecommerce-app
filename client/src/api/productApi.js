import axiosCLient from "./axiosClient";

const productsApi = {
    getAll() {
        const url = "/products";
        return axiosCLient.get(url);
    },
    getById(id) {
        const url = `/products/find/${id}`;
        return axiosCLient.get(url);
    },
    getByCategories(cat) {
        const url = `/products?category=${cat}`;
        return axiosCLient.get(url);
    },
};

export { productsApi };
