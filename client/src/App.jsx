import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./pages/Home/Home";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Success from "./pages/Success/Success";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { loadUserRequest } from "./redux/actions";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
        }
        dispatch(loadUserRequest());
    }, [dispatch]);
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/products/:category" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<Success />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
