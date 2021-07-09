import React, { useState, useEffect } from "react";
import shops from "./fixtures/shops"; 
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
const axios = require("axios");

const RestaurantPage = (props) => { 
    const [restaurantReviews, setRestaurantReviews] = useState([]);
    const [drinkAvg, setDrinkAvg] = useState("");

    const fetchReviews = async () => {
        await axios.get("http://localhost:3000/reviews")
        .then(({ data }) => {
        let pageReviews = data.filter((review) => review.restaurantId === props.match.params.id)

        let drinkRatings = []; // make this update on every post addition
        pageReviews.forEach((review) => drinkRatings.push(review.drinkRating))
        let drinkRatingTotal = 0
        for (let i = 0; i < drinkRatings.length; i++) {
            if (!isNaN(parseInt(drinkRatings[i]))) {
                drinkRatingTotal += parseInt(drinkRatings[i]);
            }
        }
        let drinkRatingLength = drinkRatings.filter((rating) => rating !== "N/A")
        let drinkRatingAvg = drinkRatingTotal/drinkRatingLength.length;
        setDrinkAvg(Math.trunc(drinkRatingAvg))
            

        setRestaurantReviews(pageReviews)
        })
    }
    
    const onSubmit = (entry) => {
        axios.post("http://localhost:3000/reviews/add", entry).then(() => fetchReviews())
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
        {drinkAvg}
        <ReviewForm onSubmit={onSubmit} restaurantid={props.match.params.id} />
        {restaurantReviews.length > 0 && 
        <div className="review-container"> 
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


