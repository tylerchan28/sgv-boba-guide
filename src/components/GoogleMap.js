import React from "react";
// import axios from "axios";

const GoogleMap = (props) => {

    
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    return (
        <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.latitude},${props.longitude}&zoom=15&size=400x250&markers=${props.latitude},${props.longitude}&key=${apiKey}`}
            alt="A map with a marker on the restaurant."
            className="restaurant-page__map"
        />
    )
}

export default GoogleMap;

