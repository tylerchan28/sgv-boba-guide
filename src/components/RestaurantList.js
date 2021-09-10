import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

const RestaurantList = () => {
    const parameters = useParams();
    let city = parameters.name;
    
    const [filter, setFilter] = useState("");

    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        // axios.get(`https://boba-api-tyler.herokuapp.com/cities/${cityName}`) // PRODUCTION
        axios.get(`http://localhost:3000/cities/${city}`) 
            .then((res) => {
                setRestaurants(res.data[0].restaurants)
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     setRestaurants(() => restaurants.filter((shop) => shop.name.toLowerCase().includes(filter.toLowerCase())))
    // }, [filter])

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    }

    const filteredShops = restaurants.filter((shop) =>
        shop.name.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            <Header />
            <div>
                <input
                    type="text"
                    className="list__filter"
                    placeholder="Search..."
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value)
                        // console.log(filter)
                        // console.log(restaurants)
                    }}
                />
            </div>
            {filteredShops.map((shop, idx) => {
                return (
                    <Link className="list__restaurant-link" key={idx+1} to={`/shop/${shop.id}`}>
                        <div className="list__restaurant-card">
                            <div>
                                <img src={shop.image_url} className="list__feed-img" alt="A depiction representative of the restaurant" />
                            </div>
                            <div className="list__restaurant-name-container">
                                <div className="list__restaurant-name">
                                    {idx+1}. {shop.name}
                                </div>
                            </div>
                            {shop.location.address2 ? 
                                <div className="list__restaurant-contact">
                                    {shop.location.address1 + " " + shop.location.address2}<br></br>
                                    {shop.location.city + ", " + shop.location.state + ", " + shop.location.zip_code}<br></br>
                                    {shop.display_phone}
                                </div> 
                                : 
                                <div className="list__restaurant-contact">
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