import { useRef } from "react";
import { Link } from "react-router-dom";
import {
    ArrowBack,
    ShoppingBagOutlined,
    Add,
    Remove,
    HighlightOff,
} from "@mui/icons-material";
const Cart = () => {
    const cartRef = useRef();
    const {
        totalPrice,
        totalQuantities,
        cartItems,
        setShowCart,
        toggleCartItemQuanitity,
        onRemove,
    } = undefined;

    const handleCheckout = async () => {
        // const stripe = await getStripe();
        // const response = await fetch("/api/stripe", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(cartItems),
        // });
        // if (response.status !== 200) {
        //   toast.error(`Failed to Proceed because of ${response.status}`);
        //   return;
        // }
        // const data = await response.json();
        // toast.loading("Redirecting...");
        // stripe.redirectToCheckout({ sessionId: data.id });
    };

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => setShowCart(false)}
                >
                    <ArrowBack />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">
                        ({totalQuantities} items)
                    </span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <ShoppingBagOutlined fontSize="large" />
                        <h3>Your shopping bag is empty</h3>
                        <Link to="/">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.length >= 1 &&
                        cartItems.map((item) => (
                            <div className="product" key={item._id}>
                                <img
                                    src={item.img}
                                    className="cart-product-image"
                                    alt={item.img}
                                />
                                <div className="item-desc">
                                    <div className="flex top">
                                        <h5>{item.name}</h5>
                                        <h4>${item.price}</h4>
                                    </div>
                                    <div className="flex bottom">
                                        <div>
                                            <p className="quantity-desc">
                                                <span
                                                    className="minus"
                                                    onClick={() =>
                                                        toggleCartItemQuanitity(
                                                            item._id,
                                                            "dec"
                                                        )
                                                    }
                                                >
                                                    <Remove />
                                                </span>
                                                <span
                                                    className="num"
                                                    onClick=""
                                                >
                                                    {item.quantity}
                                                </span>
                                                <span
                                                    className="plus"
                                                    onClick={() =>
                                                        toggleCartItemQuanitity(
                                                            item._id,
                                                            "inc"
                                                        )
                                                    }
                                                >
                                                    <Add />
                                                </span>
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="remove-item"
                                            onClick={() => onRemove(item)}
                                        >
                                            <HighlightOff />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Total:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button
                                type="button"
                                className="btn"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
