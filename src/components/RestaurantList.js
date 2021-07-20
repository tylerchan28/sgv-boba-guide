import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const RestaurantList = () => {
    
    let city = useLocation();

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/cities/${city.state.city}`)   
            .then((res) => {
                setRestaurants(res.data[0].restaurants)
            })
    }, []);
    

    return (
        <div>
            {restaurants.map((shop, idx) => {
                return (
                    <Link className="link" key={idx+1} to={{ pathname: `/shop/${shop.id}`, state: { restaurants: restaurants }}}>
                        <div className="restaurant-card">
                            <div className="image-container">
                                <img src={shop.image_url} className="feed-img" alt="A depiction representative of the restaurant" />
                            </div>
                            <div className="restaurant-name-container">
                                <div className="restaurant-name">
                                    {idx+1}. {shop.name}
                                </div>
                            </div>
                            {shop.location.address2 ? 
                                <div className="restaurant-contact">
                                    {shop.location.address1 + " " + shop.location.address2}<br></br>
                                    {shop.location.city + ", " + shop.location.state + ", " + shop.location.zip_code}<br></br>
                                    {shop.display_phone}
                                </div> 
                                : 
                                <div className="restaurant-contact">
                                    {shop.location.address1}<br></br>
                                    {shop.location.city + ", " + shop.location.state + ", " + shop.location.zip_code}<br></br>
                                    {shop.display_phone}
                                </div>}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default RestaurantList;