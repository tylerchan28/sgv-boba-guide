import React from "react";
import Header from "./Header";

const CityPage = () => (
    <div>
        <Header />
        <div className="city-container">
            <div className="city">
                <div className="city-name">  
                    San Gabriel Valley
                </div>  
            </div>
            <div className="city">
                <div className="city-name">
                    San Francisco
                </div>  
            </div>
            <div className="city">
                <div className="city-name">
                    New York
                </div>  
            </div>
        </div>
    </div>
)

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