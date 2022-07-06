import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";

import { useUser } from "./hooks";
import { publicRoutes, userRoutes } from "./routes";
import { Loader, PageNotFound } from "./components";
import { loadUser, checkCart } from "./redux/actions";
import "./App.scss";

function App() {
    const { user } = useUser();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser.loadUserRequest());
    }, [dispatch]);

    useEffect(() => {
        user && dispatch(checkCart.checkCartRequest(user));
    }, [dispatch, user]);

    const renderPage = (routes) => {
        if (routes && routes.length > 0) {
            return routes.map((item, index) => {
                return (
                    <Route
                        key={index}
                        exact={item.exact}
                        path={item.path}
                        element={item.element}
                    />
                );
            });
        }
    };
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {!user ? renderPage(publicRoutes) : renderPage(userRoutes)}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
    // localStorage.removeItem("user");
    // return <div>Hello World!</div>
}

export default App;
