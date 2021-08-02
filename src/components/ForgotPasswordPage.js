import React, { useState } from "react";
import axios from "axios";
import Loader from "../images/loader2.gif";

const ForgotPasswordPage = (props) => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
   
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            email
        }
        axios.post("http://localhost:3000/users/send-forgot-email", data)
            .then((res) => {
                setMessage(res.data.msg)
                setLoading(false)
            })
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
                { loading && 
                    <img className="loader" src={Loader} alt="Loading spinner to signify password reset email" />                
                }
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