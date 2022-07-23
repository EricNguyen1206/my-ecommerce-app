import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./Register.scss";
import { authApi } from "../../api";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const signup = async (account) => {
        const res = await authApi.register(account);
        return res;
    };
    const handleClick = (e) => {
        e.preventDefault();
        if (username && email && password && password === confirm) {
            signup({ username, email, password })
                .then((res) => {
                    console.log("res", res);
                    toast.success("Register successfully. Let's shopping!");
                })
                .catch((err) => {
                    toast.error("Register fail. Please try again!");
                });
            navigate("/");
        } else {
            toast.error("Invalid information, check input again!");
        }
    };
    return (
        <div className="register">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper">
                <h1>CREATE AN ACCOUNT</h1>
                <form>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.trim())}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.trim())}
                    />
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value.trim())}
                    />
                    <span>
                        By creating an account, I consent to the processing of
                        my personal data in accordance with the{" "}
                        <b>PRIVACY POLICY</b>
                    </span>
                    <Link to="/login">
                        <span>I have account already. Go to login.</span>
                    </Link>
                    <button onClick={handleClick}>CREATE</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
