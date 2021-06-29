import React from "react";
import { Link } from "react-router-dom"

const Header = () => (
    <div className="header-container">
        <Link className="link" to="/">
            <div className="header-title">San Gabriel Valley Boba Guide</div>
        </Link>
        <div>The top 50 boba shops in the San Gabriel Valley with a comprehensive rating system.</div>
    </div>
)

export default Header;