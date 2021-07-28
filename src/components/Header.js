import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
    const username = sessionStorage.getItem("username");
    const verified = sessionStorage.getItem("verified");
    const logout = () => {
        axios.get("http://localhost:3000/users/logout")
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <div className="header-layout">
            <div className="header-container">
                <Link className="link" to="/">
                    <div className="header-title"> Boba Guide </div>
                </Link>               
                { username ? 
                    <div className="logout-container">
                        <div> 
                            Welcome {username} 
                        </div> 
                        <button onClick={logout}>
                            Logout
                        </button>
                        {(verified === "false") && <Link className="link" to="/verify">
                            Verify your email
                        </Link>}
                    </div>
                    : 
                    <div className="logsign-container">
                        <Link to="/login" className="login-link">
                            Login
                        </Link>
                        <Link to="/signup" className="signup-link">
                            Sign up
                        </Link>
                    </div>
                }
                <div>
                    The top 50 boba shops in the San Gabriel Valley with a comprehensive rating system. 
                </div>
            </div>
        </div>
    )
}

export default Header;