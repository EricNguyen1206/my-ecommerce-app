import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Badge, styled } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../../hooks";
import { logout } from "../../redux/slices/userSlice";
import { useCart } from "../../hooks";

const StyledToolbar = styled(Toolbar)({
    height: "4.5rem",
    minHeight: "45px",
});

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const cart = useCart();
    const { user } = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pages = ["men", "women", "kids"];
    const settings = useMemo(
        () => (user ? ["profile", "logout"] : ["login", "register"]),
        [user]
    );

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSettingsMenu = (action) => {
        console.log("action", action);
        switch (action) {
            case "profile":
                return handleCloseUserMenu();
            case "logout":
                return dispatch(logout());
            case "login":
                return navigate("/login");
            case "register":
                return navigate("/register");
            default:
                return handleCloseUserMenu();
        }
    };

    return (
        <AppBar className="header" position="sticky">
            <Container className="header__container" maxWidth="xl">
                <StyledToolbar disableGutters variant="dense">
                    <Box
                        sx={{
                            flex: 0,
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Link to="/">
                            <Typography
                                component="div"
                                sx={{
                                    display: "flex",
                                    color: "white",
                                    alignItems: "center",
                                }}
                            >
                                <AdbIcon
                                    sx={{
                                        display: { xs: "none", md: "flex" },
                                        mr: 1,
                                        fontSize: "2.8rem",
                                    }}
                                />
                                <Typography
                                    variant="h3"
                                    sx={{
                                        display: "block",
                                        fontFamily: "monospace",
                                        fontWeight: 700,
                                        letterSpacing: ".3rem",
                                        textDecoration: "none",
                                    }}
                                >
                                    UrBRAND
                                </Typography>
                            </Typography>
                        </Link>
                    </Box>

                    <Box
                        sx={{ flex: 0, display: { xs: "flex", md: "none" } }}
                        className="header__settings"
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{ fontSize: "2.4rem" }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        <Link
                                            to={`/products/${page}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                            }}
                                        >
                                            <span
                                                key={page}
                                                style={{
                                                    margin: "0 10px",
                                                    fontSize: "2rem",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {page}
                                            </span>
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flex: 1, display: { xs: "flex", md: "none" } }}>
                        <Link
                            to="/"
                            style={{
                                color: "white",
                                textDecoration: "none",
                                display: "flex",
                            }}
                        >
                            <AdbIcon
                                sx={{
                                    mr: 1,
                                    fontSize: "2.4rem",
                                }}
                            />
                            <Typography
                                variant="h4"
                                noWrap
                                component="span"
                                sx={{
                                    flexGrow: 1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                UrBRAND
                            </Typography>
                        </Link>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: { xs: "none", md: "flex" },
                            listStyle: "none",
                            justifyContent: "center",
                        }}
                        component="ul"
                    >
                        {pages.map((page) => (
                            <li
                                key={page}
                                style={{
                                    margin: "0 10px",
                                    fontSize: "2rem",
                                    textTransform: "capitalize",
                                }}
                            >
                                <Link
                                    key={page}
                                    to={`/products/${page}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                >
                                    {page}
                                </Link>
                            </li>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenUserMenu}
                            color="inherit"
                        >
                            <PersonIcon
                                sx={{
                                    fontSize: {
                                        xs: "2.4rem",
                                        md: "2.8rem",
                                    },
                                }}
                            />
                        </IconButton>

                        <Link
                            to="/cart"
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                sx={{ paddingLeft: { xs: "0", md: "12px" } }}
                            >
                                <Badge
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            fontSize: 9,
                                            height: "16px",
                                            minWidth: "16px",
                                            padding: 0,
                                        },
                                    }}
                                    badgeContent={cart.quantity}
                                    color="error"
                                    showZero
                                >
                                    <ShoppingCart
                                        sx={{
                                            fontSize: {
                                                xs: "2.4rem",
                                                md: "2.8rem",
                                            },
                                        }}
                                    />
                                </Badge>
                            </IconButton>
                        </Link>

                        <Menu
                            id="menu-setting"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={() => handleSettingsMenu(setting)}
                                >
                                    <Typography
                                        textAlign="center"
                                        sx={{
                                            textTransform: "uppercase",
                                            fontSize: "2rem",
                                        }}
                                    >
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
