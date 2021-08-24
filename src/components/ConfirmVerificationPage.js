import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ConfirmVerificationPage = (props) => {
    const [message, setMessage] = useState("");
    useEffect(() => {
        const id = props.match.params.id;
        if (id.length === 24) {
        axios.get(`http://localhost:3000/users/change-verification/${id}`)
            .then((res) => {
                setMessage(res.data.msg)
            })
        } else {
            alert("Invalid user.")
            props.history.push("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="signup-layout">
            <div className="signup-container">
                { message && <p>{message}</p>}
                <Link to="/login" className="link">Log in</Link>
            </div>
        </div>
    )
}

export default ConfirmVerificationPage;