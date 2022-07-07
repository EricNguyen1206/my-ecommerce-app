// import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import {
    Avatar,
    Autocomplete,
    Badge,
    TextField,
    Button,
    AppBar,
    styled,
    Toolbar,
    Box,
    Stack,
    Typography,
    MenuItem,
    Menu,
    Switch,
} from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
import { Shop, ShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./Header.scss";
import { useUser } from "../../hooks";
import { logout } from "../../redux/slices/userSlice";
import { categories } from "../../utils/data";
import { changeMode } from "../../redux/slices/modeSlice";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

const Search = styled(Box)(({ theme }) => ({
    width: "40%",
}));

const SearchContent = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: "4px",
}));

const SearchButton = styled(Button)(({ theme }) => ({
    height: 100,
    display: "block",
    borderRadius: "0 4px 4px 0",
    backgroundColor: theme.palette.primary.main,
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
    },
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));
const Navbar = () => {
    const dispatch = useDispatch();
    const user = useUser();
    const quantity = useSelector((state) => state.cart.quantity);
    const [open, setOpen] = useState(false);
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };
    const handleChangeMode = (e) => {
        dispatch(changeMode());
    };
    return (
        <AppBar position="sticky" style={{ zIndex: 100 }}>
            <StyledToolbar>
                <Link to="/">
                    <Typography
                        variant="h2"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            color: "white",
                            cursor: "pointer",
                        }}
                        color="white"
                        fontWeight={600}
                    >
                        ERIC.
                    </Typography>
                </Link>
                <Shop sx={{ display: { xs: "block", sm: "none" } }} />
                <Search sx={{ display: { xs: "none", sm: "block" } }}>
                    <SearchContent
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Autocomplete
                            disablePortal
                            options={categories}
                            sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderRadius: "4px 0 0 4px",
                                },
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Categories" />
                            )}
                        />
                        <SearchButton variant="contained" sx={{ height: 48 }}>
                            <SearchIcon sx={{ fontSize: 20 }} />
                        </SearchButton>
                    </SearchContent>
                </Search>
                <Icons>
                    <Switch onChange={handleChangeMode} color="secondary" />
                    <Link to="/cart" style={{ color: "white" }}>
                        <Badge
                            badgeContent={quantity}
                            color="error"
                            sx={{ "& .MuiBadge-badge": { fontSize: 10 } }}
                        >
                            <ShoppingCart sx={{ fontSize: 28 }} />
                        </Badge>
                    </Link>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src=""
                        onClick={(e) => setOpen(true)}
                    />
                </Icons>
                <UserBox onClick={(e) => setOpen(true)}>
                    <Avatar sx={{ width: 30, height: 30 }} src="" />
                    <Typography variant="span">John</Typography>
                </UserBox>
            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e) => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem>Profile</MenuItem>
                {user.user ? (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                    <>
                        <Link to="/register">
                            <MenuItem>Register</MenuItem>
                        </Link>
                        <Link to="/login">
                            <MenuItem>Login</MenuItem>
                        </Link>
                    </>
                )}
            </Menu>
        </AppBar>
    );
};

export default Navbar;
