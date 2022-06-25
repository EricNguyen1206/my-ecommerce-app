import { Add, Remove } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

import Announcement from "../../components/Announcement/Announcement";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../api";
import "./Cart.scss";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
    const cart = useSelector((state) => state.cart);

    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await api.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: 500,
                });
                console.log("res:", res);
                navigate("/success", {
                    state: {
                        stripeData: res,
                        products: cart,
                    },
                });
            } catch (err) {
                console.log("err", err);
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart, navigate]);
    console.log("KEY", KEY);
    console.log("stripeToken", stripeToken);
    return (
        <div className="cart">
            <Navbar />
            <Announcement />
            <div className="wrapper">
                <h1>YOUR BAG</h1>
                <div className="top">
                    <button type="button">CONTINUE SHOPPING</button>
                    <div className="content">
                        <span>Shopping Bag(2)</span>
                        <span>Your Wishlist (0)</span>
                    </div>
                    <button
                        type="button"
                        style={{
                            color: "white",
                            backgroundColor: "black",
                            border: "none",
                        }}
                    >
                        CHECKOUT NOW
                    </button>
                </div>
                <div className="bottom">
                    <div className="content">
                        {cart ? (
                            cart.products.map((product) => (
                                <div className="product">
                                    <div className="product__details">
                                        <img
                                            src={`https://drive.google.com/uc?export=view&id=${product.img}`}
                                            alt="productimg"
                                        />
                                        <div className="product__details--wrapper">
                                            <span>
                                                <b>Product:</b> {product.title}
                                            </span>
                                            <span>
                                                <b>ID:</b> {product._id}
                                            </span>
                                            <div
                                                className="product__details--color"
                                                style={{
                                                    backgroundColor: `${product.color}`,
                                                }}
                                            />
                                            <span>
                                                <b>Size:</b> {product.size}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="price__details">
                                        <div className="price__details--amount">
                                            <Remove />
                                            <p>{product.quantity}</p>
                                            <Add />
                                        </div>
                                        <div className="price__details--price">
                                            $ {product.price * product.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                        <hr />
                    </div>
                    <div className="summary">
                        <h1>ORDER SUMMARY</h1>
                        <div className="summary__items">
                            <span>Subtotal</span>
                            {/* <span>$ 5.90</span> */}
                            <span>$ {cart.total}</span>
                        </div>
                        <div className="summary__items">
                            <span>Estimated Shipping</span>
                            <span>$ 0</span>
                        </div>
                        <div className="summary__items">
                            <span>Shipping Discount</span>
                            <span>$ 0</span>
                        </div>
                        <div
                            className="summary__items"
                            style={{ fontWeight: "500", fontSize: "24px" }}
                            type="total"
                        >
                            <span>Total</span>
                            <span>$ {cart.total}</span>
                        </div>
                        <StripeCheckout
                            name="Eric Shop"
                            image="https://avatars.githubusercontent.com/u/1486366?v=4"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <button>CHECKOUT NOW</button>
                        </StripeCheckout>
                        {/* <button>CHECKOUT NOW</button> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
