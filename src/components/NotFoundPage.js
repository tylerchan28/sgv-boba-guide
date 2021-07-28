import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage = () => (
    <div className="signup-layout">
        <div className="signup-container">
            <div className="not-found-error">404 - Not Found</div>
            <Link to="/" className="link">Go home</Link>
        </div>
    </div>
)

export default NotFoundPage;