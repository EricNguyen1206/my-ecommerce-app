import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login, checkCart } from "../../redux/actions";
import "./Login.scss";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(login.loginRequest({ username, password }));
    };
    useEffect(() => {
        if (user) {
            dispatch(
                checkCart.checkCartRequest([user.user._id, user.accessToken])
            );
            navigate("/");
        }
    }, [isFetching]);
    return (
        <div className="login">
            <div className="wrapper">
                <h1>SIGN IN</h1>
                <form>
                    <input
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleClick} disabled={isFetching}>
                        {/* <button onClick={handleClick}> */}
                        LOGIN
                    </button>
                    {error && <span>Something went wrong...</span>}
                    <a href="/">DO NOT YOU REMEMBER THE PASSWORD?</a>
                    <a href="/register">CREATE A NEW ACCOUNT</a>
                </form>
            </div>
        </div>
    );
};

export default Login;
