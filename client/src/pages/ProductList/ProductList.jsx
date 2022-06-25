import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { categories } from "../../data";
import "./ProductList.scss";

import {
    Announcement,
    Footer,
    Navbar,
    Newsletter,
    Products,
} from "../../components";
const ProductList = () => {
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");
    const location = useLocation();
    const cat = location.pathname.split("/")[2];

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };
    return (
        <div className="product-list">
            <Navbar />
            <Announcement />
            <h1>{categories.find((item) => item.cat === cat).title}</h1>
            <div className="filter-container">
                <div className="filter">
                    <span>Filter Products:</span>
                    <select name="color" onChange={handleFilters}>
                        <option disabled>Color</option>
                        <option>white</option>
                        <option>black</option>
                        <option>red</option>
                        <option>gray</option>
                        <option>blue</option>
                        <option>yellow</option>
                        <option>green</option>
                    </select>
                    <select name="size" onChange={handleFilters}>
                        <option disabled>Size</option>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                </div>
                <div className="filter">
                    <span>Sort Products:</span>
                    <select onChange={(e) => setSort(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="asc">Price (asc)</option>
                        <option value="desc">Price (desc)</option>
                    </select>
                </div>
            </div>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default ProductList;