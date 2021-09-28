import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Modal from "react-modal";
import Rating from "@mui/material/Rating";

const ReviewForm = (props) => {
    const [review, setReview] = useState("");
    const [foodRating, setFoodRating] = useState("");
    const [drinkRating, setDrinkRating] = useState("");
    const [hangoutRating, setHangoutRating] = useState("");
    const [studyRating, setStudyRating] = useState("");
    const [modal, showModal] = useState(false);

    const displayModal = (e) => {
        e.preventDefault();
        showModal(!modal)
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
        showModal(false);
    }

    return ( 
        <div>
            <button onClick={displayModal} className="button__write-review">Write a Review </button>
            { modal &&        
                <Modal
                        isOpen={!!modal} 
                        onRequestClose={() => showModal(false)}
                        contentLabel="Update form" 
                        ariaHideApp={false}
                        closeTimeoutMS={200}
                        className="modal"
                >
                    <form className="review-form" onSubmit={onSubmit}>                     
                        <div className="review-form__container">
                            <div className="review-form__ratings">
                                <div className="rating__stars">  
                                    <label htmlFor="drink-rating" className="rating-label">Drinks</label>
                                    <Rating precision={.5} max={5} onChange={(e) => setDrinkRating(parseFloat(e.target.value))} />
                                </div>
                                <div className="rating__stars">  
                                    <label htmlFor="food-rating" className="rating-label">Food</label>
                                    <Rating precision={.5} max={5} onChange={(e) => setFoodRating(parseFloat(e.target.value))} />
                                </div>
                                <div className="rating__stars">  
                                    <label htmlFor="hangout-rating" className="rating-label">Atmosphere</label>
                                    <Rating precision={.5} max={5} onChange={(e) => setHangoutRating(parseFloat(e.target.value))} />
                                </div>  
                                <div className="rating__stars">  
                                    <label htmlFor="study-rating" className="rating-label">Study</label>
                                    <Rating precision={.5} max={5} onChange={(e) => {
                                        setStudyRating(parseFloat(e.target.value))
                                        console.log(studyRating)
                                    }} />
                                </div>  
                                <button type="submit" className="review-form__submit-button">Post Review</button>
                            </div>
                            <textarea 
                                type="text"
                                placeholder='Write a review...&#13;&#13;If a rating is left empty, it will not count towards the average score.'
                                id="review"
                                onChange={(e) => setReview(e.target.value)}
                                value={review}
                                required
                                className="review-form__textarea"
                                autoFocus
                            />
                        </div>
                    </form> 
                </Modal>
            }
        </div>
    )
}


export default ReviewForm;