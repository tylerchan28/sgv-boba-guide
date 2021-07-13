import React, { useState } from "react";
import Axios from "axios";
import Header from "./Header";

const LoginPage = (props) => {

    const [data, setData] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            username,
            password
        }
        // axios.post("http://localhost:3000/users/login", data)
        Axios({
            method: "POST",
            data: {
              username: username,
              password: password,
            },
            withCredentials: true,
            url: "http://localhost:3000/users/login",
        })
        // axios({
        //     method: "POST",
        //     data: {
        //         username: username,
        //         password: password,
        //     },
        //     headers: {
        //         "Access-Control-Allow-Origin": "http://localhost:3001/login"
        //     },
        //     withCredentials: true,
        //     url: "http://localhost:3000/users/login",
        // })

        .then((res) => {
            props.getUser(res.data.username)
            setData(res.data)
        })
        .then(() => alert("Login successful!"))
        .catch(function (error) {
            if (error) {
                alert("Incorrect username or password.")
                setUsername("")
                setPassword("")
            }
        })
        // redirect after login to city page
        // serializeUser, deserializeUser not working in API
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
        { data.username ? <h1> Welcome {data.username} </h1> : <h1> Welcome </h1>}
        </div>
    )
}

export default LoginPage;