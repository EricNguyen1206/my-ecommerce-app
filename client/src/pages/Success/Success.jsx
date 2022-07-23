import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import { clearProduct } from "../../redux/slices/cartSlice";
import { transactionApi } from "../../api";

const Success = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await transactionApi.order({
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                });
                setOrderId(res.id);
                dispatch(clearProduct());
            } catch (err) {
                console.log("err", err);
            }
        };
        data && createOrder();
    }, [cart, data, currentUser, dispatch]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <Link to="/">
                <button style={{ padding: 10, marginTop: 20 }}>
                    Go to Homepage
                </button>
            </Link>
            {/* Sucessfully */}
        </div>
    );
};

export default Success;
