import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate, Link } from "react-router-dom";
import { Add, Remove, DeleteForever } from "@mui/icons-material";

import Announcement from "../../components/Announcement/Announcement";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../api";
import "./Cart.scss";
import { useUser } from "../../hooks";
import { removeProduct, clearProduct } from "../../redux/slices/cartSlice";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const { user } = useUser();

    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                dispatch(clearProduct({ user }));
                toast.success("Checkout successfully!");
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

    const handleDeleteProduct = (product) => {
        dispatch(removeProduct({ product, user }));
    };
    return (
        <div className="cart">
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <Announcement />
            <div className="wrapper">
                <h1>YOUR BAG</h1>
                <div className="top">
                    <Link to="/">
                        <button type="button">CONTINUE SHOPPING</button>
                    </Link>
                    <div className="content">
                        <span>Shopping Bag({cart.quantity})</span>
                    </div>
                </div>
                <div className="bottom">
                    <div className="content">
                        {cart ? (
                            cart.products.map((product) => (
                                <div key={product._id} className="product">
                                    <div className="product__details">
                                        <img
                                            src={product.img}
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
                                            {/* <Remove /> */}
                                            <p>{product.quantity}</p>
                                            <DeleteForever
                                                onClick={() =>
                                                    handleDeleteProduct(product)
                                                }
                                            />
                                        </div>
                                        <div className="price__details--price">
                                            ${" "}
                                            {product.sale
                                                ? product.sale *
                                                  product.quantity
                                                : product.price *
                                                  product.quantity}
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
