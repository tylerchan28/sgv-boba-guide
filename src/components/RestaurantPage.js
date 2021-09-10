import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import Header from "./Header";
import LoadingPage from "./LoadingPage";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import { getRatingAverage, colorCode, scrollToTop } from "../RestaurantPage-helpers";
const axios = require("axios");

const RestaurantPage = (props) => { 
    let info = useParams();
    console.log(info)
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
    <div className="restaurant-page__container"> 
        <Header />
        <div className="flexbox-row">
            <div className="flexbox-column">
                <button onClick={goBack} className="back-btn">&#8592;</button>
                <img src={restaurant.image_url} className="restaurant-page__image" alt="A depiction representative of the restaurant" />
            </div>
            <div className="flexbox-column">
                <div className="flexbox-column__container">
                    <div className="restaurant-page__contact"> 
                        <div className="restaurant-page__name"> {restaurant.name} </div>
                        {restaurant.location.address1}  &#127968;<br></br>
                        {restaurant.location.city + ", " + restaurant.location.state + ", " + restaurant.location.zip_code}
                        <br></br>
                        <br></br>
                        {restaurant.display_phone} &#9742;&#65039; 
                    </div>
                    <br></br>
                    { restaurantReviews.length > 0 ?
                            <div>
                                <div className="rating-item">Drinks &#129380;: {colorCode(drinkAvg)} </div>
                                <div className="rating-item">Food &#127858;: {colorCode(foodAvg)}</div>
                                <div className="rating-item">Atmosphere &#128107;: {colorCode(hangoutAvg)}</div>
                                <div className="rating-item">Study &#128214;: {colorCode(studyAvg)}</div>
                            </div>
                            :
                            <div>
                                <div className="rating-item">Drinks &#129380;: {colorCode("N/A")} </div>
                                <div className="rating-item">Food &#127858;: {colorCode("N/A")}</div>
                                <div className="rating-item">Atmosphere &#128107;: {colorCode("N/A")}</div>
                                <div className="rating-item">Study &#128214;: {colorCode("N/A")}</div>
                            </div>
                    }
                </div>
            </div>
        </div>
        { (token && verified === "true") ? 
                <ReviewForm onSubmit={onSubmit} restaurantid={props.match.params.id} /> 
                : 
                <div className="no-login">Log in and verify your account to write a review.</div>
                }
        
        {restaurantReviews.length > 0 && 
        
        <div className="review-container"> 
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
        <button onClick={scrollToTop} className="go-top-btn">SCROLL TO TOP</button>
    </div>
    :
    <LoadingPage />
}
    

export default RestaurantPage;


