import React, { useState } from "react";
import axios from "axios";

// form onsubmit sends api call?
// need to send to users email

// if no email match, send error message

const ForgotPasswordPage = (props) => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email
        }
        axios.post("http://localhost:3000/users/send-forgot-email", data)
            .then((res) => setMessage(res.data.msg))
    }

    return (
        <div className="signup-layout">
            <div className="signup-container">
                <form className="signup-form" onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        value={email}
                        className="signup-input"
                        required
                    />
                    <button className="signup-btn" type="submit">Request Reset Email</button>
                </form>
                <button className="signup-btn" onClick={() => props.history.push("/")}>Back to Home</button>
                { message && 
                    <div className="error">
                        {message}
                    </div> 
                }
            </div>
        </div>
    )
}

export default ForgotPasswordPage;