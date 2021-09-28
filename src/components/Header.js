import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon from "../images/icon.png";

const Header = () => {
    const username = sessionStorage.getItem("username");
    const verified = sessionStorage.getItem("verified");
    const logout = () => {
        //axios.get("http://localhost:3000/users/logout")
        axios.get("https://boba-api-tyler.herokuapp.com/users/logout")
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <div className="header-layout">
            <div className="header-container">
                <Link className="header__link" to="/">
                    <div className="header-title"> Boba Guide <span><img className="header__icon" src={Icon} alt="A boba drink logo" /></span> </div>
                </Link>               
                { username ? 
                    <div className="logout-container">
                        <div className="logout-container-welcome"> 
                            Welcome {username} 
                        </div> 
                        {(verified === "false") && 
                        <Link className="login__verify-link" to="/verify">
                            Verify your email
                        </Link>}
                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </div>
                    : 
                    <div className="login-container">
                        <Link to="/login" className="login-link">
                            Login
                        </Link>
                        <Link to="/signup" className="signup-link">
                            Sign up
                        </Link>
                    </div>
                }   
                
            </div>
        </div>
    )
}

export default Header;