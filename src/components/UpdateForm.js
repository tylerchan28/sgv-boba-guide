import React, { useState } from "react";
import Rating from "@mui/material/Rating";

const UpdateForm = (props) => {
    const [review, setReview] = useState(props.review);
    const [foodRating, setFoodRating] = useState(props.foodRating);
    const [drinkRating, setDrinkRating] = useState(props.drinkRating);
    const [hangoutRating, setHangoutRating] = useState(props.hangoutRating);
    const [studyRating, setStudyRating] = useState(props.studyRating);

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
        <form className="review-form review-form--update" onSubmit={onSubmit}>                     
                        <div className="review-form__container">
                            <div className="review-form__ratings">
                                <div>  
                                    {console.log(props)}
                                    <label htmlFor="drink-rating" className="rating-label">Drinks</label>
                                    <Rating defaultValue={props.drinkRating} precision={.5} max={5} onChange={(e) => setDrinkRating(parseFloat(e.target.value))} />
                                </div>
                                <div>  
                                    <label htmlFor="food-rating" className="rating-label">Food</label>
                                    <Rating defaultValue={props.foodRating} precision={.5} max={5} onChange={(e) => setFoodRating(parseFloat(e.target.value))} />
                                </div>
                                <div>  
                                    <label htmlFor="hangout-rating" className="rating-label">Atmosphere</label>
                                    <Rating defaultValue={props.hangoutRating} precision={.5} max={5} onChange={(e) => setHangoutRating(parseFloat(e.target.value))} />
                                </div>  
                                <div>  
                                    <label htmlFor="study-rating" className="rating-label">Study</label>
                                    <Rating defaultValue={props.studyRating} precision={.5} max={5} onChange={(e) => setStudyRating(parseFloat(e.target.value))} />
                                </div>  
                                <button type="submit" className="review-form__submit-button">Update Review</button>
                            </div>
                            <textarea 
                                type="text"
                                id="review"
                                onChange={(e) => setReview(e.target.value)}
                                value={review}
                                placeholder='Write a review...&#13;&#13;If a rating is left empty, it will not count towards the average score.'
                                required
                                className="review-form__textarea"
                                autoFocus
                            />
                        </div>
                    </form> 
    )
}


export default UpdateForm;