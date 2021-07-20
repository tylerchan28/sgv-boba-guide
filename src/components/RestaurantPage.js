import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import shops from "./fixtures/shops"; 
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
const axios = require("axios");

const RestaurantPage = (props) => { 
    
    let restaurants = useLocation();
    let cityShops = restaurants.state.restaurants;

    const [restaurantReviews, setRestaurantReviews] = useState([]);
    const [drinkAvg, setDrinkAvg] = useState("");
    const [foodAvg, setFoodAvg] = useState("");
    const [hangoutAvg, setHangoutAvg] = useState("");
    const [studyAvg, setStudyAvg] = useState("");

    const getRatingAverage = (pageReviews, ratingType) => {
        let ratings = pageReviews.filter((review) => review[ratingType] !== "N/A")
            .map((review) => parseInt(review[ratingType]));
        if (ratings.length === 0) {
            return "N/A";
        } else {
            let ratingAvg = (ratings.reduce((value, accumulator) => accumulator + value)) / ratings.length;
            return ratingAvg;
        }
    }

    const fetchReviews = async () => {
        await axios.get("http://localhost:3000/reviews")
            .then(({ data }) => {
                let pageReviews = data.filter((review) => review.restaurantId === props.match.params.id)
                setRestaurantReviews(pageReviews)
                
                if (pageReviews.length > 0) {
                    let drinkRatingAvg = getRatingAverage(pageReviews, "drinkRating")
                    if (drinkRatingAvg === "N/A") {
                        setDrinkAvg("N/A")
                    } else {
                        setDrinkAvg((Math.floor(drinkRatingAvg * 10) / 10)) 
                    }
                    
                    let foodRatingAvg = getRatingAverage(pageReviews, "foodRating");  
                    if (foodRatingAvg === "N/A") {
                        setFoodAvg("N/A")
                    } else {
                    setFoodAvg((Math.floor(foodRatingAvg * 10) / 10))   
                    } 
                    
                    let hangoutRatingAvg = getRatingAverage(pageReviews, "hangoutRating")
                    if (hangoutRatingAvg === "N/A") {
                        setHangoutAvg("N/A")
                    } else {
                        setHangoutAvg((Math.floor(hangoutRatingAvg * 10) / 10)) 
                    }
                    
                    let studyRatingAvg = getRatingAverage(pageReviews, "studyRating");  
                    if (studyRatingAvg === "N/A") {
                        setStudyAvg("N/A")
                    } else {
                        setStudyAvg((Math.floor(studyRatingAvg * 10) / 10))
                    }

                }
                
            })
    }
        
    const onSubmit = (entry) => {
        const token = sessionStorage.getItem("token");
        axios.post("http://localhost:3000/reviews/add", entry, {
            headers: {"Authorization": token}
        }).then(() => fetchReviews())
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const token = sessionStorage.getItem("token");

    const foundShop = cityShops.find((shop) => shop.id === props.match.params.id);
   
    return foundShop ? 
    <div className="restaurant-page-container"> 
        <Header />
        <div className="restaurant-page-name"> {foundShop.name} </div>
        <div className="restaurant-page-contact"> 
            {foundShop.location.address1 + " " + foundShop.location.city + ", " + foundShop.location.state + ", " + foundShop.location.zip_code}<br></br><br></br>
            {foundShop.display_phone} 
        </div>
        <img src={foundShop.image_url} className="restaurant-page-image" alt="A depiction representative of the restaurant" />
        {restaurantReviews.length > 0 &&    
            <div>
                Drinks: {drinkAvg}<br></br>
                Food: {foodAvg}<br></br>
                Hangout: {hangoutAvg}<br></br>
                Study: {studyAvg}<br></br>
            </div>
        } 

        { token ? 
            <ReviewForm onSubmit={onSubmit} restaurantid={props.match.params.id} /> 
            : 
            <div className="no-login">Sign up or log in to write a review.</div>
        }
        
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


