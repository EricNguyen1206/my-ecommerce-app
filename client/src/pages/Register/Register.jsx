import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
            try {
                const res = signup({ username, email, password });
                console.log(res);
            } catch (err) {
                alert("Register fail! Please try again.");
            }
            navigate("/login");
        } else {
            alert("Somethings wrong! Please try again.");
        }
    };
    return (
        <div className="register">
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
