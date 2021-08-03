import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const CityPage = () => {

    return (
        <div>
            <Header />
            <div className="city-container">
                <div className="city-title">Select a city below to view 50 of the top rated boba shops in that area and leave a review if you've been there!.</div>
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




// when choosing a location, direct to a RestaurantList.js and db for 
// that specific location (pull restaurants from db)
// route to {cityname} on click

// make link to san-gabriel, new york, san francisco
    // render component and pass city name as props
// if san gabriel is clicked, load RestaurantList with props = san-gabriel
    // <RestaurantList city={san-gabriel}
    // in RestaurantList, call axios.get(`http://localhost:3000/cities/${props.city}`) 


// back button on restaurant pages so it goes to same list