import React, { useState } from "react";
import axios from "axios";

const VerifyPage = (props) => {
    const [message, setMessage] = useState("");
    const token = sessionStorage.getItem("token");
    const currentEmail = sessionStorage.getItem("email");


    const sendEmail = (e) => {
        e.preventDefault()
        const details = {
            email: currentEmail
        }
        axios.post("http://localhost:3000/users/verify", details)
            .then((res) => setMessage(res.data.msg))
    }

    return (
            <div className="signup-layout">
                <div className="signup-container">
                    {token ?
                        <button onClick={sendEmail}>
                            Send verification email.
                        </button> : 
                        <div> 
                            Please log in to access this page. 
                        </div>
                    }
                    <button className="signup-btn" onClick={() => props.history.push("/")}>Back to Home</button>
                    { message && <div className="error">{message}</div>}
                </div>
            </div>
    )
}

export default VerifyPage;