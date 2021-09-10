import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const ReviewForm = (props) => {
    const [review, setReview] = useState("");
    const [foodRating, setFoodRating] = useState("");
    const [drinkRating, setDrinkRating] = useState("");
    const [hangoutRating, setHangoutRating] = useState("");
    const [studyRating, setStudyRating] = useState("");
    const [showForm, setShowForm] = useState(false);

    const displayForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm)
    }

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
        const user = sessionStorage.getItem("username");
        const userId = sessionStorage.getItem("userId")
        const submittedContent = ({
            review,
            reviewId: uuidv4(),
            foodRating,
            drinkRating,
            hangoutRating,
            studyRating,
            restaurantId: props.restaurantid,
            user,
            userId,
            date: Date.now()
        })

        props.onSubmit(submittedContent)
        setReview("");
        setFoodRating("");
        setDrinkRating("");
        setHangoutRating("");
        setStudyRating("");
    }

    return ( 
        <div>
        <button onClick={displayForm} className="add-review-btn">Add a Review (Ratings Optional): </button>
        { showForm && <form className="review-form" onSubmit={onSubmit}>       
            <textarea 
                type="text"
                placeholder="Write a review with ratings out of 10!"
                id="review"
                onChange={onReviewChange}
                value={review}
                required
                className="review__textarea"
                autoFocus
            />
            <div className="review-rating-container">
                <div>  
                <label htmlFor="drink-rating" className="rating-label">Drinks:</label>
                <input  
                    type="string"
                    id="drink-rating"
                    name="drink-rating"
                    onChange={onDrinkRatingChange}
                    value={drinkRating}
                    className="review-form-rating"
                />    
                </div>
                <div>  
                <label htmlFor="food-rating" className="rating-label">Food:</label>
                <input 
                    type="string"
                    id="food-rating"
                    name="food-rating"
                    onChange={onFoodRatingChange}
                    value={foodRating}
                    className="review-form-rating"
                />
                </div>
                <div>  
                <label htmlFor="hangout-rating" className="rating-label">Ambiance:</label>
                <input 
                    type="string"
                    id="hangout-rating"
                    name="hangout-rating"
                    onChange={onHangoutRatingChange}
                    value={hangoutRating}
                    className="review-form-rating"
                />
                </div>  
                <div>  
                <label htmlFor="study-rating" className="rating-label">Study:</label>
                <input  
                    type="string"
                    id="study-rating"
                    name="study-rating"
                    onChange={onStudyRatingChange}
                    value={studyRating}
                    className="review-form-rating"
                />
                </div>  
            </div>
            <button type="submit" className="review-submit">Submit Review</button>
        </form> }
        </div>
    )
}


export default ReviewForm;