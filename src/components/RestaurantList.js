import React from "react";
import shops from "./fixtures/shops"; 

const RestaurantList = () => (
    <div>
        {console.log(shops)}
        {shops.map((shop) => {
            return ( // add key to the div
                <div className="restaurant-card">
                    <div className="image-container">
                        <img src={shop.image_url} />
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
            )
        })}
    </div>
)

export default RestaurantList;