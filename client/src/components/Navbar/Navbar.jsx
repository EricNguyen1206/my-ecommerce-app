import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./Navbar.scss";
import { useUser } from "../../hooks";
import { logout } from "../../redux/slices/userSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useUser();
    const quantity = useSelector((state) => state.cart.quantity);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <Link to="/">
                        <h1 className="logo">ERIC.</h1>
                    </Link>
                </div>
                <div className="center">
                    {/* <span className="language">EN</span> */}
                    <div className="search">
                        <input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </div>
                </div>
                <div className="right">
                    {user.user ? (
                        <button
                            className="logout"
                            onClick={handleLogout}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                            }}
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <>
                            <Link to="/register">
                                <div className="menu-items">REGISTER</div>
                            </Link>
                            <Link to="/login">
                                <div className="menu-items">SIGN IN</div>
                            </Link>
                        </>
                    )}
                    <Link to="/cart">
                        <div className="menu-items">
                            <span
                                className="badge"
                                style={{
                                    display: `${
                                        quantity > 0 ? "flex" : "none"
                                    }`,
                                }}
                            >
                                {quantity}
                            </span>
                            <ShoppingCartOutlined />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
