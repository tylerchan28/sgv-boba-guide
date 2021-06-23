import React, { useState } from "react";
import shops from "./fixtures/shops";
// require('dotenv').config();
// const axios = require("axios");

const RestaurantCard = () => {
    // var APIkey = process.env.REACT_APP_API_KEY;
    // const corsApiUrl = 'https://cors-anywhere.herokuapp.com/';
    // let yelpRequest = axios.create({
    //     baseURL: `${corsApiUrl}https://api.yelp.com/v3`,
    //     headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         Authorization: `Bearer ${APIkey}`,
    //         "Content-Type": "application/json",
    //     },
    // })
    
    // yelpRequest("/businesses/search", {
    //     params: {
    //         term: "boba",
    //         latitude: 34.0333,
    //         longitude: -118.105667,
    //         radius: 40000,
    //         limit: 40,
    //         sort_by: "rating",
    //     },
    //   }).then(({ data }) => { // data.businesses gets just array of businesses
    //     console.log(data.businesses)
    //   })
    return (
        <div>
            {shops.forEach((shop) => console.log(shop))}
        </div>
    )
}

export default RestaurantCard;


