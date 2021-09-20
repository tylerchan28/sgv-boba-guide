import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Modal from "react-modal";

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
        <button onClick={displayModal} className="add-review-btn">Add a Review </button>
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
                    <textarea 
                        type="text"
                        placeholder="Write a review..."
                        id="review"
                        onChange={(e) => setReview(e.target.value)}
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
                                onChange={(e) => setDrinkRating(parseFloat(e.target.value))}
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
                            onChange={(e) => setFoodRating(parseFloat(e.target.value))}
                            value={foodRating}
                            className="review-form-rating"
                        />
                        </div>
                        <div>  
                            <label htmlFor="hangout-rating" className="rating-label">Atmosphere:</label>
                            <input 
                                type="string"
                                id="hangout-rating"
                                name="hangout-rating"
                                onChange={(e) => setHangoutRating(parseFloat(e.target.value))}
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
                                onChange={(e) => setStudyRating(parseFloat(e.target.value))}
                                value={studyRating}
                                className="review-form-rating"
                            />
                        </div>  
                    </div>
                    <button type="submit" className="review-submit">Submit Review</button>
                </form> 
            </Modal>
    }
        </div>
    )
}


export default ReviewForm;