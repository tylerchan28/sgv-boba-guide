import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { scrollToTop } from "../RestaurantPage-helpers";
import Header from "./Header";
import axios from "axios";

const RestaurantList = () => {
    
    const parameters = useParams();
    let city = parameters.name;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const chooseCityDescription = () => {
        switch(city) {
            case "san-gabriel":
                return <div className="list__description">
                            <h1>San Gabriel</h1>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
            case "san-francisco":
                return <div className="list__description">
                            <h1>San Francisco</h1>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
            case "manhattan":
                return <div className="list__description">
                            <h1>Manhattan</h1>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
            default:
                return <div className="list__description">error</div>
        }
    }
    
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

    const filteredShops = restaurants.filter((shop) =>
        shop.name.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            <Header />
            <div className="list__description-container">
                {chooseCityDescription()}
            </div>
            <div className="list__filter-container">
                <input
                    type="text"
                    className="list__filter"
                    placeholder="Search..."
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value)
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
                                    {shop.name}
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