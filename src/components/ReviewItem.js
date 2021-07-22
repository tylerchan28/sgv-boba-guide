import React from "react";
import moment from "moment";
import axios from "axios";

const ReviewItem = ({ drinkRating, foodRating, hangoutRating, studyRating, review, date, user, userId, reviewId }) => {
    let currentUserId = sessionStorage.getItem("userId")
    let token = sessionStorage.getItem("token");
    const removeReview = (reviewId) => {
        axios.delete("http://localhost:3000/reviews/delete", {
            headers: {
                "Authorization": token
            },
            data: {
                reviewId
            }
        }).then(window.location.reload())
    }

    const updateReview = () => {
        // axios update(?) request here
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
            <div className="review-details">
                {userId === currentUserId &&<div>
                    <button onClick={() => removeReview(reviewId)}>Remove</button>
                    <button>Edit</button>
                </div>}
                <div>
                    posted {moment(date).format("MM/DD/YYYY")} by {user}
                </div>
            </div>
        </div> 
        
    )
}

export default ReviewItem;