import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import Badge from "@mui/material/Badge";
import { deepOrange } from "@mui/material/colors";
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
        <section className="navbar">
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
                    <Avatar
                        sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }}
                    >
                        N
                    </Avatar>
                    <Link to="/cart">
                        <div className="menu-items">
                            {/* <span
                                className="badge"
                                style={{
                                    display: `${
                                        quantity > 0 ? "flex" : "none"
                                    }`,
                                }}
                            >
                                {quantity}
                            </span> */}
                            <Fab color="primary" size="small" aria-label="add">
                                <Badge badgeContent={quantity} color="primary">
                                    <ShoppingCartOutlined />
                                </Badge>
                            </Fab>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
