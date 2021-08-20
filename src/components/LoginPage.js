import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            data: {
              username: username,
              password: password,
            },
            withCredentials: true,
            url: "http://localhost:3000/users/login",
        })
        .then((res) => {
            sessionStorage.setItem("token", res.data.token)
            sessionStorage.setItem("username", res.data.user.username)
            sessionStorage.setItem("userId", res.data.user.userId)
            sessionStorage.setItem("id", res.data.user._id)
            sessionStorage.setItem("email", res.data.user.email)
            sessionStorage.setItem("verified", res.data.user.verified)
        })
        .then(() => props.history.push("/"))
        .catch(function (error) {
            if (error) {
                setError(error.response.data)
                setUsername("")
                setPassword("")
            }
        })
    }

    return (
        <div className="signup-layout">
            <div className="signup-container">
                <form className="signup-form" onSubmit={onSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        name="username"
                        value={username}
                        className="signup-input"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        value={password}
                        className="signup-input"
                        required
                    />
                    <button className="signup-btn" type="submit">Log In</button>
                </form>
                <Link className="login__forgot-password" to="/forgot-password">Forgot Password</Link>
                <button className="signup-btn" onClick={() => props.history.push("/")}>Back to Home</button>
                { error && 
                    <div className="error">
                        {error}
                    </div> 
                }
            </div>
        </div>
    )
}

export default LoginPage;