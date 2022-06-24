import { Alert } from "reactstrap";
import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./Product.scss";
import { productsAPI } from "../../api";
import { Announcement, Footer, Navbar, Newsletter } from "../../components";
import { createCart } from "../../redux/actions";
// import { publicRequest } from "../requestMethods";
// import { addProduct } from "../redux/cartRedux";

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [alert, setAlert] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await productsAPI.getById(id);
                setProduct(res);
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

    const handleClick = () => {
        console.log("addProduct");
        setAlert(true);
        if (!user) {
            navigate("/login");
        } else {
            console.log("add to cart");
            if (cart.cart === null) {
                // if cart is null then create new cart
                console.log("create new cart!");
                const cart = {
                    userId: user._id,
                    products: [{ productsId: id, quantity }],
                };

                dispatch(createCart.createCartRequest(cart));
            } else {
                // else update current cart
                console.log("update current cart!");
            }
        }
    };
    return (
        <div className="product-page">
            <Navbar />
            <Announcement />
            <div className="wrapper">
                <div className="img-container">
                    <img
                        src={`https://drive.google.com/uc?export=view&id=${product.img}`}
                        alt="product imgage"
                    />
                </div>
                <div className="info-container">
                    <h1>{product.title}</h1>
                    <p>{product.desc}</p>
                    <span>$ {product.price}</span>
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
                    <div className="add-container">
                        <div className="amount-container">
                            <Remove onClick={() => handleQuantity("dec")} />
                            <span className="amount">{quantity}</span>
                            <Add onClick={() => handleQuantity("inc")} />
                        </div>
                        <button onClick={handleClick}>ADD TO CART</button>
                    </div>
                </div>
            </div>
            <Alert
                isOpen={alert}
                toggle={() => window.setTimeout(() => setAlert(false), 3000)}
            />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Product;
