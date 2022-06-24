import { Add, Remove } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Announcement from "../../components/Announcement/Announcement";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
// import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import "./Cart.scss";
// import { userRequest } from "../../requestMethods";
// import { useHistory } from "react-router";
import { dummyCart } from "../../data";

// const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
    // const cart = useSelector((state) => state.cart);
    const [cart, setCart] = useState(null);

    const [stripeToken, setStripeToken] = useState(null);
    // const history = useHistory();

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        setCart(dummyCart[0]);
    }, []);

    // useEffect(() => {
    //   const makeRequest = async () => {
    //     try {
    //       const res = await userRequest.post("/checkout/payment", {
    //         tokenId: stripeToken.id,
    //         amount: 500,
    //       });
    //       history.push("/success", {
    //         stripeData: res.data,
    //         products: cart, });
    //     } catch {}
    //   };
    //   stripeToken && makeRequest();
    // }, [stripeToken, cart.total, history]);
    console.log("cart", cart);
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
                                        <div>
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
                            <span>$ 5.90</span>
                            {/* <span>$ {cart.total}</span> */}
                        </div>
                        <div className="summary__items">
                            <span>Estimated Shipping</span>
                            <span>$ 5.90</span>
                        </div>
                        <div className="summary__items">
                            <span>Shipping Discount</span>
                            <span>$ -5.90</span>
                        </div>
                        <div
                            className="summary__items"
                            style={{ fontWeight: "500", fontSize: "24px" }}
                            type="total"
                        >
                            <span>Total</span>
                            <span>$ -5.90</span>
                            {/* <span>$ {cart.total}</span> */}
                        </div>
                        {/* <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <button>CHECKOUT NOW</button>
            </StripeCheckout> */}
                        <button>CHECKOUT NOW</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
