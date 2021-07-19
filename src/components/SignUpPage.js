import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const SignUpPage = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(props)
        const signupDetails = {
            firstName,
            lastName,
            username,
            password,
            email,
            userId: uuidv4()
        }
        axios.post("http://localhost:3000/users/signup", signupDetails)
        .then(() => alert("Signup successful!"))
        .then(() => props.history.push("/login"))
        .catch(function (error) {
            if (error.response) {
              const errorMsg = error.response.data.errors.errors[0].msg;
              setError(errorMsg)
              setFirstName("")
              setLastName("")
              setUsername("")
              setPassword("")   
              setEmail("")
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
        })
    }
    
    return (
        <div className="signup-layout">
            <div className="signup-container"> 
                <form className="signup-form" onSubmit={onSubmit}>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        className="signup-input"
                        required
                    />
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        className="signup-input"
                        required
                    />
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
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        value={email}
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
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                { error && <div>{error}</div>}
            </div>
        </div>
    )
}

export default SignUpPage;
