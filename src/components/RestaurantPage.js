import React, { useState, useEffect } from "react";
import shops from "./fixtures/shops"; 
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import ReviewForm from "../ReviewForm";
import ReviewItem from "./ReviewItem";
const axios = require("axios");

const RestaurantPage = (props) => { 
    const [restaurantReviews, setRestaurantReviews] = useState([]);

    const fetchReviews = async () => {
        await axios.get("http://localhost:3000/reviews")
        .then(({ data }) => {
        let pageReviews = data.filter((review) => review.restaurantId === props.match.params.id)
        setRestaurantReviews(pageReviews)
        })
    }
    
    const onSubmit = (entry) => {
        axios.post("http://localhost:3000/reviews/add", entry)
        fetchReviews();
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const foundShop = shops.find((shop) => shop.id === props.match.params.id);
   
    return foundShop ? // put into own component
    <div className="restaurant-page-container"> 
        <Header />
        <div className="restaurant-page-name"> {foundShop.name} </div>
        <div className="restaurant-page-contact"> 
            {foundShop.location.address1 + " " + foundShop.location.city + ", " + foundShop.location.state + ", " + foundShop.location.zip_code}<br></br><br></br>
            {foundShop.display_phone} 
        </div>
        <img src={foundShop.image_url} className="restaurant-page-image" alt="A depiction representative of the restaurant" />
        Click and hold to see original resolution.
        <ReviewForm onSubmit={onSubmit} restaurantid={props.match.params.id} />
        {restaurantReviews.length > 0 && <div className="review-container"> 
            <div className="review-count">  
                Read {restaurantReviews.length} reviews:
            </div>
            <div className="review-item-container">
                {restaurantReviews.map((review) => {
                    return <ReviewItem key={review._id} {...review} />
                })}
            </div>
        </div>}
    </div>
        :
    <NotFoundPage />
}
    

export default RestaurantPage;


