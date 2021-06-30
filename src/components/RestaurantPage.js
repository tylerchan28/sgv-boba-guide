import React, { useState, useEffect } from "react";
import shops from "./fixtures/shops"; 
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
const axios = require("axios");

const RestaurantPage = (props) => { // useEffect to load comments if comment's restaurantId matches???
    const [restaurantReviews, setRestaurantReviews] = useState([]);

    const fetchReviews = async () => {
        await axios.get("http://localhost:3000/reviews")
        .then(({ data }) => {
        // get restaurants only with matching restaurant ids to prop.match.params.id
        let pageReviews = data.filter((review) => review.restaurantId === props.match.params.id)
        setRestaurantReviews(pageReviews)
        })
    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => { // makes axios req to localhost:3000/reviews
        fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const foundShop = shops.find((shop) => shop.id === props.match.params.id);
    
    const [review, setReview] = useState("");
    const [foodRating, setFoodRating] = useState("");
    const [drinkRating, setDrinkRating] = useState("");
    const [hangoutRating, setHangoutRating] = useState("");
    const [studyRating, setStudyRating] = useState("");

    const onReviewChange = (e) => {
        const review = e.target.value;
        setReview(review);
    }

    const onFoodRatingChange = (e) => {
        const foodRating = e.target.value;
        if (!foodRating || foodRating.match(/^[0-9]{0,1}(\.[0-9]{0,1})?$/) || foodRating.match(/^(10)$/)) {
            setFoodRating(foodRating)
        }
    }

    const onDrinkRatingChange = (e) => {
        const drinkRating = e.target.value;
        if (!drinkRating || drinkRating.match(/^[0-9]{0,1}(\.[0-9]{0,1})?$/) || drinkRating.match(/^(10)$/)) {
            setDrinkRating(drinkRating)
        }
    }

    const onHangoutRatingChange = (e) => {
        const hangoutRating = e.target.value;
        if (!hangoutRating || hangoutRating.match(/^[0-9]{0,1}(\.[0-9]{0,1})?$/) || hangoutRating.match(/^(10)$/)) {
            setHangoutRating(hangoutRating)
        }
    }

    const onStudyRatingChange = (e) => {
        const studyRating = e.target.value;
        if (!studyRating || studyRating.match(/^[0-9]{0,1}(\.[0-9]{0,1})?$/) || studyRating.match(/^(10)$/)) {
            setStudyRating(studyRating)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const submittedContent = ({ // add user id later
            review,
            foodRating,
            drinkRating,
            hangoutRating,
            restaurantId: props.match.params.id,
            date: Date.now()
        })

        axios.post("http://localhost:3000/reviews/add", submittedContent)

        setReview("");
        setFoodRating("");
        setDrinkRating("");
        setHangoutRating("");
        setStudyRating("");
        fetchReviews();
    }
   
    return foundShop ? 
    <div className="restaurant-page-container">
        <Header />
        <div className="restaurant-page-name"> {foundShop.name} </div>
        <div className="restaurant-page-contact"> 
            {foundShop.location.address1 + " " + foundShop.location.city + ", " + foundShop.location.state + ", " + foundShop.location.zip_code}<br></br><br></br>
            {foundShop.display_phone} 
        </div>
        <img src={foundShop.image_url} className="restaurant-page-image" alt="A depiction representative of the restaurant" />
        Click and hold to see original resolution.
        <form className="review-form" onSubmit={onSubmit}>
            <label htmlFor="review">Write a Review:</label>
            <textarea 
                type="text"
                placeholder="Write a review..."
                id="review"
                onChange={onReviewChange}
                value={review}
            />
            <label htmlFor="food-rating">Food Rating:</label>
            <input  // maybe use star rating system/dropdown
                type="string"
                id="food-rating"
                name="food-rating"
                onChange={onFoodRatingChange}
                value={foodRating}
            />
            <label htmlFor="drink-rating">Drink Rating:</label>
            <input  // maybe use star rating system/dropdown
                type="string"
                id="drink-rating"
                name="drink-rating"
                onChange={onDrinkRatingChange}
                value={drinkRating}
            />
            <label htmlFor="hangout-rating">Hangout Rating:</label>
            <input  // maybe use star rating system/dropdown
                type="string"
                id="hangout-rating"
                name="hangout-rating"
                onChange={onHangoutRatingChange}
                value={hangoutRating}
            />
            <label htmlFor="study-rating">Study Rating:</label>
            <input  // maybe use star rating system/dropdown
                type="string"
                id="study-rating"
                name="study-rating"
                onChange={onStudyRatingChange}
                value={studyRating} 
            />
            <button type="submit">Submit Review</button>
        </form> 
        <div> 
            Read {restaurantReviews.length} reviews:
            {restaurantReviews.map((review) => ( // put into own component
                <div className="review" key={review._id}>
                    {review.review}
                </div> 
            ))}
        </div>
    </div>
        :
    <NotFoundPage />
}
    

export default RestaurantPage;


