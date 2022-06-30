import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { login } from "../../redux/actions";
import { useUser } from "../../hooks";
import "./Login.scss";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isFetching, error } = useUser();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(login.loginRequest({ username, password }));
    };
    useEffect(() => {
        user && navigate(-1);
    }, [user, dispatch, navigate]);

    useEffect(() => {
        error && toast.error("Login fail. Please try again!");
    }, [error]);
    return (
        <div className="login">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper">
                <h1>SIGN IN</h1>
                <form>
                    <input
                        placeholder="username"
                        autoComplete="on"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        placeholder="password"
                        autoComplete="on"
                        type="password"
                        onChange={(e) => setPassword(e.target.value.trim())}
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
