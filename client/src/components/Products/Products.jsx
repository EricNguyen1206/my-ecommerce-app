import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product/Product";
import { getProducts, getProductsByCategory } from "../../redux/actions";
const Products = ({ cat, filters, sort }) => {
    const products = useSelector((state) => state.products.products);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        cat
            ? dispatch(getProductsByCategory.getProductsByCategoryRequest(cat))
            : dispatch(getProducts.request());
    }, [dispatch, cat]);

    useEffect(() => {
        cat &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            );
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
            {cat
                ? filteredProducts.map((item, index) => (
                      <Product item={item} key={index} />
                  ))
                : products
                      .slice(0, 8)
                      .map((item, index) => (
                          <Product item={item} key={index} />
                      ))}
        </div>
    );
};

export default Products;
