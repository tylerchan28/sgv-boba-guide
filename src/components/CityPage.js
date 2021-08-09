import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const CityPage = () => {

    return (
        <div>
            <Header />
            <div className="city-container">
                <div className="city-title">Welcome to Boba Guide.<br></br>Click on a city to see the top 50 boba shops in the area and leave a review if you've been there!</div>
                <Link to={
                        { 
                            pathname: "/cities/san-gabriel",
                            state: { city: "san-gabriel" }
                        }
                    } 
                    className="city city--san-gabriel">
                    <div className="city-name">  
                        San Gabriel Valley
                    </div>  
                </Link>
                <Link to={
                        { 
                            pathname: "/cities/san-francisco",
                            state: { city: "san-francisco" }
                        }
                    } 
                    className="city city--san-francisco">
                    <div className="city-name">  
                        San Francisco
                    </div>  
                </Link>
                <Link to={
                        { 
                            pathname: "/cities/manhattan",
                            state: { city: "manhattan" }
                        }
                    } 
                    className="city city--manhattan">
                    <div className="city-name">  
                        Manhattan
                    </div>  
                </Link>
            </div>
        </div>
    )        
}


export default CityPage;

