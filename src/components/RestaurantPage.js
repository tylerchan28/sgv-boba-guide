import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import Header from "./Header";
import LoadingPage from "./LoadingPage";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import GoogleMap from "./GoogleMap";
import Pagination from "./Pagination";
import { getRatingAverage } from "../RestaurantPage-helpers";
import Rating from '@mui/material/Rating';
import LocalCafe from "@mui/icons-material/LocalCafe";
import Fastfood from "@mui/icons-material/Fastfood";
import Laptop from "@mui/icons-material/Laptop";
import Group from "@mui/icons-material/Group";
import Home from "@mui/icons-material/Home";
import Phone from "@mui/icons-material/Phone";
import LeftArrow from '@mui/icons-material/KeyboardArrowLeft';
import Infographic from "../images/boba_types.jpg";
import axios from "axios";

const RestaurantPage = (props) => { 
    
    let info = useParams();
    let id = info.id;
    
    const verified = sessionStorage.getItem("verified");
    const token = sessionStorage.getItem("token");
    
    const [restaurantReviews, setRestaurantReviews] = useState([]);
    const [drinkAvg, setDrinkAvg] = useState(0);
    const [foodAvg, setFoodAvg] = useState(0);
    const [hangoutAvg, setHangoutAvg] = useState(0);
    const [studyAvg, setStudyAvg] = useState(0);
    
    const [restaurant, setRestaurant] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = restaurantReviews.slice(indexOfFirstReview, indexOfLastReview)
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const fetchShop = async () => {
        // await axios.get(`http://localhost:3000/cities/city-shops/${id}`)
        await axios.get(`https://boba-api-tyler.herokuapp.com/cities/city-shops/${id}`)
            .then((res) => {
                setRestaurant(res.data[0])
            })
    }

    const fetchReviews = async () => {
        await axios.get("https://boba-api-tyler.herokuapp.com/reviews") 
        // await axios.get("http://localhost:3000/reviews")
            .then(({ data }) => {
                let pageReviews = data.filter((review) => review.restaurantId === props.match.params.id)
                setRestaurantReviews(pageReviews)          
                if (pageReviews.length > 0) {
                    let drinkRatingAvg = getRatingAverage(pageReviews, "drinkRating")
                    setDrinkAvg(parseFloat(drinkRatingAvg))
                    
                    let foodRatingAvg = getRatingAverage(pageReviews, "foodRating");  
                    setFoodAvg(foodRatingAvg)
                    
                    let hangoutRatingAvg = getRatingAverage(pageReviews, "hangoutRating")
                    setHangoutAvg(hangoutRatingAvg)
                    
                    let studyRatingAvg = getRatingAverage(pageReviews, "studyRating");  
                    setStudyAvg(studyRatingAvg)
                }              
            })
    }
        
    const onSubmit = (entry) => {
        const token = sessionStorage.getItem("token");
        axios.post("https://boba-api-tyler.herokuapp.com/reviews/add", entry, { 
        // axios.post("http://localhost:3000/reviews/add", entry, {
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
                <button onClick={goBack} className="button__back"><LeftArrow /></button>
                <div className="restaurant-page__title-container">
                    <div className="restaurant-page__title">
                        {restaurant.name}
                    </div>  
                </div>
                <div className="restaurant-page__info">
                    <div className="restaurant-page__info-icon">{restaurant.location.address1} <Home className="rating__icon" /></div>
                    {restaurant.location.city + ", " + restaurant.location.state + ", " + restaurant.location.zip_code}<br/>
                    <div className="restaurant-page__info-icon">{restaurant.display_phone} <Phone className="rating__icon"/></div>
                </div>
                <div className="rating__container">
                        <div className="rating__item rating__item--average">Drinks <LocalCafe className="rating__icon" /></div>
                        <Rating value={drinkAvg} precision={.5} readOnly max={5} size="large"/> 
                        <div className="rating__item rating__item--average">Food <Fastfood className="rating__icon" /></div>
                        <Rating value={foodAvg} precision={.5} readOnly max={5} size="large"/> 
                        <div className="rating__item rating__item--average">Atmosphere <Group className="rating__icon"/></div>
                        <Rating value={hangoutAvg} precision={.5} readOnly max={5} size="large"/> 
                        <div className="rating__item rating__item--average">Study <Laptop className="rating__icon"/></div>
                        <Rating value={studyAvg} precision={.5} readOnly max={5} size="large"/>
                </div>
                <div className="restaurant-page__map-container">
                    <GoogleMap {...restaurant}/>
                </div>
            </div>
            <div className="restaurant-page__review-container">
                { (token && verified === "true") ?
                    <div className="review__add-button-container">
                        <ReviewForm onSubmit={onSubmit} restaurantid={props.match.params.id} /> 
                    </div>
                    :
                    <div className="error__no-login">
                            Log in and verify your account to write a review.
                    </div>
                }   
                {
                    restaurantReviews.length > 0 ? 
        
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
                    </div>
                    :
                    <div className="restaurant-page__infographic-container">
                        <div className="restaurant-page__no-reviews"> Be the first user to write a review for {restaurant.name}! </div>
                        <img src={Infographic} alt="Different types of boba (tapiocs, bursting, and crystal)" className="restaurant-page__infographic" />
                    </div>
                }
            </div>
        </div>
    </div>
    :
    <LoadingPage />
}
    

export default RestaurantPage;


