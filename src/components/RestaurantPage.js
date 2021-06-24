import React, { useState } from "react";
import shops from "./fixtures/shops"; // use shop to find matching id to props.match.params.id?
import NotFoundPage from "./NotFoundPage";

const RestaurantPage = (props) => {
    const foundShop = shops.find((shop) => shop.id === props.match.params.id);
    
    const [review, setReview] = useState("");
    const [foodRating, setFoodRating] = useState("");
    const [drinkRating, setDrinkRating] = useState("");
    
    const onReviewChange = (e) => {
        const review = e.target.value;
        console.log(review)
        setReview(review);
    }

    const onFoodRatingChange = (e) => {
        const foodRating = e.target.value;
        if (!foodRating || foodRating.match(/^[0-9]{0,1}(\.[0-9]{0,1})?$/)) {
            setFoodRating(foodRating)
            console.log(foodRating)
        }
    }
   
    // on submit = gather all info from form
   
   
    return foundShop ? 
    <div className="restaurant-page-container">
            <img src={foundShop.image_url} className="restaurant-page-image" alt="A depiction representative of the restaurant" />
            <div className="restaurant-page-name"> {foundShop.name} </div>
            <div className="restaurant-page-contact"> 
                {foundShop.location.address1 + " " + foundShop.location.city + ", " + foundShop.location.state + ", " + foundShop.location.zip_code}<br></br><br></br>
                {foundShop.display_phone} 
            </div>
            <form className="review-form">
                <label htmlFor="review">Write a Review:</label>
                <textarea 
                    type="text"
                    placeholder="Write a review..."
                    id="review"
                    onChange={onReviewChange}
                    value={review}
                />
                <label htmlFor="food-rating">Food Rating:</label>
                <input 
                    type="string"
                    id="food-rating"
                    name="food-rating"
                    onChange={onFoodRatingChange}
                    value={foodRating}
                />
                <button type="submit">Submit Review</button>
            </form>
            <div>
                Review list section here.
            </div>
    </div>
        :
    <NotFoundPage />
}
    

export default RestaurantPage;