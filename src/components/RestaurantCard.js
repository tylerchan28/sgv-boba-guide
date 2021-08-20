import axios from "axios";
import React, { useEffect, useState } from "react";
require('dotenv').config();
// const axios = require("axios");

const RestaurantCard = () => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/cities/matcha")
            .then((res) => {
                setRestaurants(res.data[0].restaurants)
            })
    }, [])

    return (
        <div>
            {console.log(restaurants)}
            Hello
        </div>
    )
}

export default RestaurantCard;


