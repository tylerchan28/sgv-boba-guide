import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import Header from "./Header";
import LoadingPage from "./LoadingPage";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import GoogleMap from "./GoogleMap";
import { getRatingAverage, colorCode } from "../RestaurantPage-helpers";

const axios = require("axios");

const RestaurantPage = (props) => { 
    
    let info = useParams();
    let id = info.id;
    
    const verified = sessionStorage.getItem("verified");
    const [restaurantReviews, setRestaurantReviews] = useState([]);
    const [drinkAvg, setDrinkAvg] = useState("");
    const [foodAvg, setFoodAvg] = useState("");
    const [hangoutAvg, setHangoutAvg] = useState("");
    const [studyAvg, setStudyAvg] = useState("");
    const [reviewsToShow, setReviewsToShow] = useState(3);
    const [restaurant, setRestaurant] = useState("");

    const fetchShop = async () => {
        await axios.get(`http://localhost:3000/cities/city-shops/${id}`)
            .then((res) => {
                setRestaurant(res.data[0])
            })
    }

    const fetchReviews = async () => {
        // await axios.get("https://boba-api-tyler.herokuapp.com/reviews") PRODUCTION
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
        // axios.post("https://boba-api-tyler.herokuapp.com/reviews/add", entry, { PRODUCTION
        axios.post("http://localhost:3000/reviews/add", entry, {
            headers: {"Authorization": token}
        }).then(() => fetchReviews())
    }

    const showMore = (e) => {
        e.preventDefault();
        setReviewsToShow(reviewsToShow + 3)
    }

    const goBack = () => {
        props.history.goBack();
    }

    useEffect(() => {
        fetchShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const token = sessionStorage.getItem("token");


    return restaurant ? 
    <div>
        <Header />
        <div className="restaurant-page-container-test"> 
            <div className="page-info-div">
                <button onClick={goBack} className="back-btn">&#8592;</button>
                <div className="title-div">
                    <div className="title">
                        {restaurant.name} 
                        <img src={restaurant.image_url} className="test-image" alt="Depiction of the restaurant." />
                    </div>  
                </div>
                <div className="shop-info">
                    {restaurant.location.address1}  &#127968;<br/>
                    {restaurant.location.city + ", " + restaurant.location.state + ", " + restaurant.location.zip_code}<br/>
                    {restaurant.display_phone} &#9742;&#65039; 
                </div>
                { restaurantReviews.length > 0 ?
                    <div className="ratings-container">
                        <div className="rating-item">Drinks &#129380;: {colorCode(drinkAvg)} </div>
                        <div className="rating-item">Food &#127858;: {colorCode(foodAvg)}</div>
                        <div className="rating-item">Atmosphere &#128107;: {colorCode(hangoutAvg)}</div>
                        <div className="rating-item">Study &#128214;: {colorCode(studyAvg)}</div>
                    </div>
                    :
                    <div className="ratings-container">
                        <div className="rating-item">Drinks &#129380;: {colorCode("N/A")} </div>
                        <div className="rating-item">Food &#127858;: {colorCode("N/A")}</div>
                        <div className="rating-item">Atmosphere &#128107;: {colorCode("N/A")}</div>
                        <div className="rating-item">Study &#128214;: {colorCode("N/A")}</div>
                    </div>
                }
                <div>
                    <GoogleMap {...restaurant}/>
                </div>
            </div>
            <div className="review-div">
                    { (token && verified === "true") ? 
                        <div className="review-div-text">
                            <div> Hello what is going on </div>
                            <ReviewForm onSubmit={onSubmit} restaurantid={props.match.params.id} /> 
                        </div>
                        : 
                        <div className="review-div-text">
                        <div className="no-login">Log in and verify your account to write a review.</div>
                        </div>
                     }   
                {restaurantReviews.length > 0 && 
        
                    <div className="review-container-test"> 
                        <div className="review-count">  
                            Read {restaurantReviews.length} review(s):
                        </div>
                        <div className="review-item-container">
                            {restaurantReviews.slice(0, reviewsToShow).map((review) => {
                                return <ReviewItem key={review._id} {...review} />
                            })}
                        </div>
                        {restaurantReviews.length > 3 && <button onClick={showMore} className="show-more-btn">Show 3 More</button>}
                    </div>}
            </div>
        </div>
    </div>
    :
    <LoadingPage />
}
    

export default RestaurantPage;


