import React, { useState } from "react";
import UpdateForm from "./UpdateForm";
import moment from "moment";
import axios from "axios";
import Modal from "react-modal";

const ReviewItem = ({ drinkRating, foodRating, hangoutRating, studyRating, review, date, user, userId, reviewId }) => {
    let [modal, showModal] = useState(false);
    let currentUserId = sessionStorage.getItem("userId")
    let token = sessionStorage.getItem("token");

    const removeReview = (reviewId) => {
        window.confirm("Are you sure you want to delete this review?") &&
        axios.delete("http://localhost:3000/reviews/delete", {
            headers: {
                "Authorization": token
            },
            data: {
                reviewId
            }
        }).then(window.location.reload())
    }

    const updateReview = ({ review, foodRating, drinkRating, studyRating, hangoutRating }) => {
        const inputs = {
            reviewId,
            review,
            foodRating,
            drinkRating,
            studyRating,
            hangoutRating
        }
        axios.put("http://localhost:3000/reviews/update", inputs, { headers: { "Authorization": token }})
            .then(window.location.reload())
        showModal(false)
    }

    return (
        <div className="review">
            <div className="review-ratings">
                Drinks: {drinkRating}<br></br><br></br>
                Food: {foodRating}<br></br><br></br>
                Hangout: {hangoutRating}<br></br><br></br>
                Study: {studyRating}<br></br><br></br>
            </div>
            <div className="review-content">
                {review}
            </div>
            {(userId === currentUserId && token) ?
                <div className="review-details">
                    <div className="button-container">
                        <button className="review-btn" onClick={() => removeReview(reviewId)}>Remove</button>
                        <button className="review-btn" onClick={() => showModal(true)}>Edit</button>
                    </div>
                    <div className="review-date"> submitted {moment(date).format("MM/DD/YYYY")} by {user} </div>
                </div>
                :
                <div className="review-details"> 
                    <div></div>
                    <div className="review-date"> submitted {moment(date).format("MM/DD/YYYY")} by {user} </div>
                </div>
            }
            {modal && 
                <Modal
                    isOpen={!!modal} 
                    onRequestClose={() => showModal(false)}
                    contentLabel="Update form" 
                    ariaHideApp={false}
                    closeTimeoutMS={200}
                    className="modal" 
                >
                    <UpdateForm onSubmit={updateReview} {...review} /> 
                </Modal>
            }
        </div> 
        
    )
}

export default ReviewItem;