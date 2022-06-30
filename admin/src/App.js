import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

import { TOKEN } from "./api";

function App() {
    // const admin = true;
    const user = useSelector((state) => state.user);
    console.log("TOKEN", TOKEN);
    return (
        <Router>
            <Switch>
                {user.user == null ? (
                    <>
                        <Route path="/">
                            <Login />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route path="/login">
                            <Login />
                        </Route>
                        {user.user.user.isAdmin && (
                            <>
                                <Topbar />
                                <div className="container">
                                    <Sidebar />
                                    <Route exact path="/">
                                        <Home />
                                    </Route>
                                    <Route path="/users">
                                        <UserList />
                                    </Route>
                                    <Route path="/user/:userId">
                                        <User />
                                    </Route>
                                    <Route path="/newUser">
                                        <NewUser />
                                    </Route>
                                    <Route path="/products">
                                        <ProductList />
                                    </Route>
                                    <Route path="/product/:productId">
                                        <Product />
                                    </Route>
                                    <Route path="/newproduct">
                                        <NewProduct />
                                    </Route>
                                </div>
                            </>
                        )}
                    </>
                )}
            </Switch>
        </Router>
    );
}

export default App;
