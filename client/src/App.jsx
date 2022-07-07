import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useUser, useMode } from "./hooks";
import { publicRoutes, userRoutes } from "./routes";
import { Loader, PageNotFound } from "./components";
import { loadUser, checkCart } from "./redux/actions";
import { createTheme, ThemeProvider } from "@mui/material";
import palette from "./common/mui/_palette";
import "./App.scss";

function App() {
    const { user } = useUser();
    const dispatch = useDispatch();
    const { mode } = useMode();

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
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
                        element={
                            <ThemeProvider theme={darkTheme}>
                                <ThemeProvider theme={palette()}>
                                    {item.element}
                                </ThemeProvider>
                            </ThemeProvider>
                        }
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
