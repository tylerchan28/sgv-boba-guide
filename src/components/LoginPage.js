import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const onSubmit = (e) => {
        e.preventDefault();
        const entry = {
            username,
            password
        }
        console.log(entry)
        // redirect after login to city page
    }

    return (
        <div>
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
        </div>
    )
}

export default LoginPage;