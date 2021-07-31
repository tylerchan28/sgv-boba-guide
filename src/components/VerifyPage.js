import React, { useState } from "react";
import axios from "axios";
import Loader from "../images/loader2.gif"

const VerifyPage = (props) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const token = sessionStorage.getItem("token");
    const currentEmail = sessionStorage.getItem("email");


    const sendEmail = (e) => {
        e.preventDefault()
        setLoading(true)
        const details = {
            email: currentEmail
        }
        axios.post("http://localhost:3000/users/verify", details)
            .then((res) => {
                setLoading(false)
                setMessage(res.data.msg)
            })
    }

    return (
            <div className="signup-layout">
                <div className="signup-container">
                    {token ?
                        <button  className="signup-btn" onClick={sendEmail}>
                            Send verification email
                        </button> : 
                        <div> 
                            Please log in to access this page. 
                        </div>
                    }
                    <button className="signup-btn" onClick={() => props.history.push("/")}>Back to Home</button>
                    { loading && 
                        <img className="loader" src={Loader} />                
                    }
                    { message && <div className="error">{message}</div>}
                </div>
            </div>
    )
}

export default VerifyPage;