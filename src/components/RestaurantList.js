import React from "react";
import { Link } from "react-router-dom";
import shops from "./fixtures/shops"; 

const RestaurantList = () => (
    <div>
        {shops.map((shop) => {
            return ( // add key to the div
                <Link className="link" key={shop.id} to={`/shop/${shop.id}`}>
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
    </div>
)

export default RestaurantList;