import React, { useState } from "react";

const UpdateForm = (props) => {
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

        props.onSubmit(({
            review,
            foodRating,
            drinkRating,
            hangoutRating,
            studyRating,
        }))
        setReview("");
        setFoodRating("");
        setDrinkRating("");
        setHangoutRating("");
        setStudyRating("");
    }

    return (
        <form className="review-form" onSubmit={onSubmit}>
            <label htmlFor="review" className="review-form-title">Update Review (Ratings Optional):</label>
            <textarea 
                type="text"
                placeholder="Write a review..."
                id="review"
                onChange={onReviewChange}
                value={review}
                required
            />
            <div className="review-rating-container">
                <label htmlFor="drink-rating" className="rating-label">Drink Rating:</label>
                <input  
                    type="string"
                    id="drink-rating"
                    name="drink-rating"
                    onChange={onDrinkRatingChange}
                    value={drinkRating}
                    className="review-form-rating"
                />    
                <label htmlFor="food-rating" className="rating-label">Food Rating:</label>
                <input 
                    type="string"
                    id="food-rating"
                    name="food-rating"
                    onChange={onFoodRatingChange}
                    value={foodRating}
                    className="review-form-rating"
                />
                <label htmlFor="hangout-rating" className="rating-label">Hangout Rating:</label>
                <input 
                    type="string"
                    id="hangout-rating"
                    name="hangout-rating"
                    onChange={onHangoutRatingChange}
                    value={hangoutRating}
                    className="review-form-rating"
                />
                <label htmlFor="study-rating" className="rating-label">Study Rating:</label>
                <input  
                    type="string"
                    id="study-rating"
                    name="study-rating"
                    onChange={onStudyRatingChange}
                    value={studyRating}
                    className="review-form-rating"
                />
            </div>
            <button type="submit" className="review-submit">Update Review</button>
        </form> 
    )
}


export default UpdateForm;