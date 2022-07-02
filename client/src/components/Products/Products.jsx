import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";

import Product from "../Product/Product";
import { getProducts, getProductsByCategory } from "../../redux/actions";

const Products = ({ cat, filters, sort, limit }) => {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);
    const [page, setPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productOnpage, setProductOnpage] = useState([]);

    useEffect(() => {
        cat
            ? dispatch(getProductsByCategory.getProductsByCategoryRequest(cat))
            : dispatch(getProducts.request());
    }, [dispatch, cat]);

    useEffect(() => {
        if (cat) {
            const filterproducts = products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            );
            filterproducts.reverse();
            setFilteredProducts(filterproducts);
            setCount(Math.ceil(filterproducts.length / 8));
        }
    }, [products, filters, cat]);

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    useEffect(() => {
        cat
            ? setProductOnpage(filteredProducts.slice((page - 1) * 8, page * 8))
            : setProductOnpage(products.slice((page - 1) * 8, page * 8));
    }, [page, cat, filteredProducts, products]);
    const handlePageChange = (e, pg) => {
        setPage(pg);
    };
    return (
        <div
            className="products"
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 15,
                marginTop: 20,
                width: "100%",
            }}
        >
            {productOnpage.map((item, index) => (
                <Product item={item} key={index} />
            ))}
            <div
                className="pagination"
                style={{
                    display: `${
                        limit || filteredProducts.length <= 8 ? "none" : "flex"
                    }`,
                    width: "100%",
                    marginTop: 20,
                    justifyContent: "center",
                }}
            >
                <Pagination
                    count={count}
                    color="primary"
                    onChange={(e, pg) => handlePageChange(e, pg)}
                />
            </div>
        </div>
    );
};

export default Products;
