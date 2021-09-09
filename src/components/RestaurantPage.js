import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
const axios = require("axios");

const RestaurantPage = (props) => { 
    let restaurants = useLocation();
    let cityShops = restaurants.state.restaurants;
    const verified = sessionStorage.getItem("verified");
    const [restaurantReviews, setRestaurantReviews] = useState([]);
    const [drinkAvg, setDrinkAvg] = useState("");
    const [foodAvg, setFoodAvg] = useState("");
    const [hangoutAvg, setHangoutAvg] = useState("");
    const [studyAvg, setStudyAvg] = useState("");
    const [reviewsToShow, setReviewsToShow] = useState(3);

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

    const colorCode = (ratingType) => {
        if (ratingType <= 4 || ratingType === "N/A") {
            return <div className="rating-item rating-item--red">{ratingType}</div>
        } else if (ratingType >= 4 && ratingType <= 7.5) {
            return <div className="rating-item rating-item--yellow">{ratingType}</div>
        } else {
            return <div className="rating-item rating-item--green">{ratingType}</div>
        }
    }

    const showMore = (e) => {
        e.preventDefault();
        setReviewsToShow(reviewsToShow + 3)
    }

    const goBack = () => {
        props.history.goBack();
    }

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        fetchReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const token = sessionStorage.getItem("token");

    const foundShop = cityShops.find((shop) => shop.id === props.match.params.id);

    return foundShop ? 
    <div className="restaurant-page__container"> 
        <Header />
        <div className="flexbox-row">
            <div className="flexbox-column">
                <button onClick={goBack} className="back-btn">&#8592;</button>
                <img src={foundShop.image_url} className="restaurant-page__image" alt="A depiction representative of the restaurant" />
            </div>
            <div className="flexbox-column">
                <div className="flexbox-column__container">
                    <div className="restaurant-page__contact"> 
                        <div className="restaurant-page__name"> {foundShop.name} </div>
                        {foundShop.location.address1}  &#127968;<br></br>
                        {foundShop.location.city + ", " + foundShop.location.state + ", " + foundShop.location.zip_code}
                        <br></br>
                        <br></br>
                        {foundShop.display_phone} &#9742;&#65039; 
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
    <NotFoundPage />
}
    

export default RestaurantPage;


