import React from "react";
import moment from "moment";

const ReviewItem = ({ drinkRating, foodRating, hangoutRating, studyRating, review, date, user }) => (
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
            posted {moment(date).format("MM/DD/YYYY")} by {user}
        </div>
    </div> 
)

export default ReviewItem;