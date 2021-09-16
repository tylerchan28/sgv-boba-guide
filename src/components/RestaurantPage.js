import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import Header from "./Header";
import LoadingPage from "./LoadingPage";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import GoogleMap from "./GoogleMap";
import Pagination from "./Pagination";
import { getRatingAverage, colorCode } from "../RestaurantPage-helpers";

const axios = require("axios");

const RestaurantPage = (props) => { 
    
    let info = useParams();
    let id = info.id;
    
    const verified = sessionStorage.getItem("verified");
    const token = sessionStorage.getItem("token");
    
    const [restaurantReviews, setRestaurantReviews] = useState([]);
    const [drinkAvg, setDrinkAvg] = useState("");
    const [foodAvg, setFoodAvg] = useState("");
    const [hangoutAvg, setHangoutAvg] = useState("");
    const [studyAvg, setStudyAvg] = useState("");
    
    const [restaurant, setRestaurant] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(3);
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = restaurantReviews.slice(indexOfFirstReview, indexOfLastReview)
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

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

    return restaurant ? 
    <div>
        <Header />
        <div className="restaurant-page__container"> 
            <div className="restauraunt-page__info-container">
                <button onClick={goBack} className="button__back">&#8592;</button>
                <div className="restaurant-page__title-container">
                    <div className="restaurant-page__title">
                        {restaurant.name} 
                        <img src={restaurant.image_url} className="restaurant-page__image" alt="Depiction of the restaurant." />
                    </div>  
                </div>
                <div className="restaurant-page__info">
                    {restaurant.location.address1}  &#127968;<br/>
                    {restaurant.location.city + ", " + restaurant.location.state + ", " + restaurant.location.zip_code}<br/>
                    {restaurant.display_phone} &#9742;&#65039; 
                </div>
                { restaurantReviews.length > 0 ?
                    <div className="rating__container">
                        <div className="rating__item">Drinks &#129380;: {colorCode(drinkAvg)} </div>
                        <div className="rating__item">Food &#127858;: {colorCode(foodAvg)}</div>
                        <div className="rating__item">Atmosphere &#128107;: {colorCode(hangoutAvg)}</div>
                        <div className="rating__item">Study &#128214;: {colorCode(studyAvg)}</div>
                    </div>
                    :
                    <div className="rating__container">
                        <div className="rating__item">Drinks &#129380;: {colorCode("N/A")} </div>
                        <div className="rating__item">Food &#127858;: {colorCode("N/A")}</div>
                        <div className="rating__item">Atmosphere &#128107;: {colorCode("N/A")}</div>
                        <div className="rating__item">Study &#128214;: {colorCode("N/A")}</div>
                    </div>
                }
                <div>
                    <GoogleMap {...restaurant}/>
                </div>
            </div>
            <div className="restaurant-page__review-container">
                    { (token && verified === "true") ? 
                        <div className="review__message">
                            <div> Hello what is going on </div>
                            <ReviewForm onSubmit={onSubmit} restaurantid={props.match.params.id} /> 
                        </div>
                        : 
                        <div className="review__message">
                        <div className="error__no-login">Log in and verify your account to write a review.</div>
                        </div>
                     }   
                {restaurantReviews.length > 0 && 
        
                    <div className="review__container"> 
                        <div className="review__count">  
                            Read {restaurantReviews.length} review(s):
                        </div>
                        <div className="review__item-container">
                            {currentReviews.map((review) => {
                                return <ReviewItem key={review._id} {...review} />
                            })}
                            <Pagination reviewsPerPage={reviewsPerPage} totalReviews={restaurantReviews.length} paginate={paginate}/>
                        </div>
                    </div>}
            </div>
        </div>
    </div>
    :
    <LoadingPage />
}
    

export default RestaurantPage;


