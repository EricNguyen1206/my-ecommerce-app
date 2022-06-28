import { Alert } from "reactstrap";
import { Add, Remove, Star, StarHalf } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./Product.scss";
import { productsAPI } from "../../api";
import { Announcement, Footer, Navbar, Newsletter } from "../../components";
import { createCart } from "../../redux/actions";
// import { publicRequest } from "../requestMethods";
import { addProduct } from "../../redux/slices/cartSlice";

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [alert, setAlert] = useState(false);
    const [index, setIndex] = useState(0);
    const { user } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await productsAPI.getById(id);
                setProduct(res);
                setColor(res.color[0]);
                setSize(res.size[0]);
            } catch (err) {
                console.log("err", err);
            }
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!user) {
            navigate("/login");
        } else {
            dispatch(
                addProduct({ product: { ...product, color, size, quantity } })
            );
        }
    };
    const handleBuyNow = (e) => {
        e.preventDefault();
        if (!user) {
            navigate("/login");
        } else {
            dispatch(
                addProduct({ product: { ...product, color, size, quantity } })
            );
            navigate("/cart");
        }
    };
    return (
        <div className="product-page">
            <Navbar />
            <Announcement />
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img
                            src={product.img}
                            className="product-detail-image"
                            alt={product.title}
                        />
                    </div>
                    {/* 
                        <div className="small-images-container">
                            {product?.image?.map((item, i) => (
                            <img key={i} src={urlFor(item)} className={i === index ? "small-image selected-image" : "small-image"} onMouseEnter={() => setIndex(i)} />
                            ))}
                        </div>
                    */}
                </div>

                <div className="product-detail-desc">
                    <h1>{product.title}</h1>
                    <div className="reviews">
                        <div>
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <StarHalf />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{product.desc}</p>
                    <p className="price">$ {product.price}</p>
                    <div className="filter-container">
                        <div className="filter">
                            <span className="title">Color</span>
                            {product.color?.map((c) => (
                                <div
                                    className="color"
                                    key={c}
                                    style={{
                                        backgroundColor: c,
                                        boxShadow: `0 0 ${
                                            c === color ? 8 : 1
                                        }px 1px #333`,
                                    }}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </div>
                        <div className="filter">
                            <span className="title">Size</span>
                            <select
                                className="size"
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {product.size?.map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span
                                className="minus"
                                onClick={() => handleQuantity("dec")}
                            >
                                <Remove />
                            </span>
                            <span className="num">{quantity}</span>
                            <span
                                className="plus"
                                onClick={() => handleQuantity("inc")}
                            >
                                <Add />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button
                            type="button"
                            className="add-to-cart"
                            onClick={handleAddProduct}
                        >
                            Add to Cart
                        </button>
                        <button
                            type="button"
                            className="buy-now"
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            {/* <Alert
                isOpen={alert}
                toggle={() => window.setTimeout(() => setAlert(false), 3000)}
            /> */}
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Product;
