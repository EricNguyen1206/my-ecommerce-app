import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Autoplay } from "swiper";

import { productsApi } from "../../api";
import Product from "../Product/Product";

import "swiper/css";
import "./Slider.scss";

export default React.memo(function Slider({ cat, title = "Product" }) {
    const products = useSelector((state) => state.products.products);
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = (cat) => {
            productsApi.getByCategories(cat).then((res) => {
                setFilteredProducts(res);
            });
        };
        cat ? fetchProducts(cat) : setFilteredProducts(products);
    }, [cat, products]);
    return (
        <section className="section slider">
            <h2 className="section-title">{title}</h2>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                slidesPerGroup={2}
                speed={4000}
                loop={true}
                modules={[Autoplay, Lazy]}
                autoplay={{
                    delay: 2000,
                }}
            >
                {filteredProducts.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Product item={item} />
                    </SwiperSlide>
                ))}
                {/* Prevent empty items in swiper */}
                <SwiperSlide>
                    <></>
                </SwiperSlide>
            </Swiper>
        </section>
    );
});
