import React from "react";
const Home = React.lazy(() => import("../pages/Home/Home"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const Register = React.lazy(() => import("../pages/Register/Register"));

const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const Success = React.lazy(() => import("../pages/Success/Success"));
const Product = React.lazy(() => import("../pages/Product/Product"));
const ProductList = React.lazy(() =>
    import("../pages/ProductList/ProductList")
);

export const publicRoutes = [
    {
        exact: true,
        path: "/",
        element: <Home />,
    },
    {
        exact: true,
        path: "/login",
        element: <Login />,
    },
    {
        exact: true,
        path: "/register",
        element: <Register />,
    },
    {
        exact: true,
        path: "/cart",
        element: <Login />,
    },
    {
        exact: true,
        path: "/product/:id",
        element: <Product />,
    },
    {
        exact: true,
        path: "/products/:category",
        element: <ProductList />,
    },
];

export const userRoutes = [
    {
        exact: true,
        path: "/",
        element: <Home />,
    },
    {
        exact: true,
        path: "/cart",
        element: <Cart />,
    },
    {
        exact: true,
        path: "/success",
        element: <Success />,
    },
    {
        exact: true,
        path: "/product/:id",
        element: <Product />,
    },
    {
        exact: true,
        path: "/products/:category",
        element: <ProductList />,
    },
];
