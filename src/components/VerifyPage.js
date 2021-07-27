import React, { useState } from "react";
import axios from "axios";

const VerifyPage = (props) => {
    // const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const details = {
            email
        }
        axios.post("http://localhost:3000/users/verify", details)
            .then(console.log("email sent"))
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
                    <button className="signup-btn" type="submit">Send Verification Email</button>
                </form>
                <button className="signup-btn" onClick={() => props.history.push("/")}>Back to Home</button>
            </div>
        </div>
    )
}

export default VerifyPage;