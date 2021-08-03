import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

const RestaurantList = (props) => {
    // let city = useLocation();
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        const cityName = window.location.pathname.toString().split("/")[2]
        // axios.get(`http://localhost:3000/cities/${city.state.city}`)
        axios.get(`http://localhost:3000/cities/${cityName}`) 
            .then((res) => {
                setRestaurants(res.data[0].restaurants)
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <Header />
            {restaurants.map((shop, idx) => {
                return (
                    <Link className="restaurant-link" key={idx+1} to={{ pathname: `/shop/${shop.id}`, state: { restaurants: restaurants }}}>
                        <div className="restaurant-card">
                            <div className="image-container">
                                <img src={shop.image_url} className="feed-img" alt="A depiction representative of the restaurant" />
                            </div>
                            <div className="restaurant-name-container">
                                <div className="restaurant-name">
                                    {shop.name}
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
            <button onClick={scrollToTop} className="go-top-btn">SCROLL TO TOP</button>
        </div>
    )
}

export default RestaurantList;