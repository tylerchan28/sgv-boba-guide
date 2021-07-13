import React from "react";
import { Link } from "react-router-dom"

const Header = (props) => {
    return (
        <div className="header-layout">
            <div className="header-container">
                <Link className="link" to="/">
                    <div className="header-title">San Gabriel Valley Boba Guide </div>
                </Link>
                <div className="logsign-container">
                    <Link to="/login" className="login-link">
                        Login
                    </Link>
                    <Link to="/signup" className="signup-link">
                        Sign up
                    </Link>
                </div>
                <div>
                    The top 50 boba shops in the San Gabriel Valley with a comprehensive rating system. 
                </div>
            </div>
        </div>
    )
}

export default Header;