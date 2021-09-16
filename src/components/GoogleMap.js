import React from "react";
// import axios from "axios";

const GoogleMap = (props) => {
    return (
        <div>
            <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.latitude},${props.longitude}&zoom=15&size=400x250&markers=${props.latitude},${props.longitude}&key=${process.env.REACT_APP_GOOGLE_API_SECRET}`}
                alt="A map with a marker on the restaurant."
            />
        </div>
    )
}

export default GoogleMap;

// src={`https://www.google.com/maps/embed/v1/place?q=${address}&key=${apiKey}`}>