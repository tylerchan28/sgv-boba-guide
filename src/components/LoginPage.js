import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const LoginPage = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(props)
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
        })
        .then(() => alert("Login successful!"))
        .then(() => props.history.push("/cities"))
        .catch(function (error) {
            if (error) {
                setError(error.response.data)
                setUsername("")
                setPassword("")
            }
        })
    }

    return (
        <div>
            <Header />
            <form onSubmit={onSubmit}>
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
                <button type="submit">Log In</button>
            </form>
            { error && <div> {error} </div> }
        </div>
    )
}

export default LoginPage;