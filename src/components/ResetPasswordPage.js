import axios from "axios";
import React, { useState } from "react";
import Loader from "../images/loader2.gif";

const ResetPasswordPage = (props) => {
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [loading, setLoading] = useState(false);

    const email = sessionStorage.getItem("email");

    const onSubmit = (e) => {
        // axios here
        e.preventDefault();
        const id = props.match.params.id;
        setLoading(true);
        axios.post(`http://localhost:3000/users/reset-password/${id}`, { password: password, secretCode: secretCode, email: email })
            .then((res) => { 
                setLoading(false);
                setMessage(res.data.msg) 
            })
    }
    
    return (
        <div className="signup-layout">
            <div className="signup-container">
                <form className="signup-form" onSubmit={onSubmit}>
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        value={password}
                        className="signup-input"
                        required
                    />
                    <label htmlFor="secretCode">Enter Verification Code</label>
                    <input
                        type="text"
                        onChange={(e) => setSecretCode(e.target.value)}
                        id="secretCode"
                        name="secretCode"
                        value={secretCode}
                        className="signup-input"
                        required
                    />
                    <button className="signup-btn" type="submit">Reset Password</button>
                    <button className="signup-btn" onClick={() => props.history.push("/")}>Back to Home</button>
                </form>
                { loading && 
                    <img className="loader" src={Loader} alt="Loading spinner to signify password reset" />                
                }
                { message && <div className="message">{message}</div>}
            </div>
        </div>
    )
}

export default ResetPasswordPage;