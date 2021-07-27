import React, { useState } from "react";

// form onsubmit sends api call?
// need to send to users email

// if no email match, send error message

const ForgotPasswordPage = (props) => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            email
        }
        console.log(data)
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
                    <button className="signup-btn" type="submit">Reset Password</button>
                </form>
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

export default ForgotPasswordPage;