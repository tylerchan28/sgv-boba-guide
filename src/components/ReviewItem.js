import React, { useState } from "react";
import UpdateForm from "./UpdateForm";
import moment from "moment";
import axios from "axios";
import Modal from "react-modal";
import LocalCafe from "@mui/icons-material/LocalCafe";
import Fastfood from "@mui/icons-material/Fastfood";
import Laptop from "@mui/icons-material/Laptop";
import Group from "@mui/icons-material/Group";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";

const ReviewItem = ({ drinkRating, foodRating, hangoutRating, studyRating, review, date, user, userId, reviewId }) => {
    let [modal, showModal] = useState(false);
    let currentUserId = sessionStorage.getItem("userId")
    let token = sessionStorage.getItem("token");

    const removeReview = (reviewId) => {
        window.confirm("Are you sure you want to delete this review?") &&
        axios.delete("https://boba-api-tyler.herokuapp.com/reviews/delete", { 
        // axios.delete("http://localhost:3000/reviews/delete", {
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
        axios.put("https://boba-api-tyler.herokuapp.com/reviews/update", inputs, { headers: { "Authorization": token }}) 
        // axios.put("http://localhost:3000/reviews/update", inputs, { headers: { "Authorization": token }})
            .then(window.location.reload())
        showModal(false)
    }

    return (
        <div className="review">
            <div className="review__ratings">
                <div className="rating__rating-item">
                    <div className="rating__item">
                        <LocalCafe />
                        { 
                            drinkRating > 0 ?
                            <Rating value={parseFloat(drinkRating)} precision={.5} readOnly size="small" className="rating__individual"/>
                            :
                            <div className="rating__none">N/A</div>
                        }
                    </div>
                </div>
                <div className="rating__rating-item">
                    <div className="rating__item">
                        <Fastfood />
                        { 
                            foodRating > 0 ?
                            <Rating value={parseFloat(foodRating)} precision={.5} readOnly size="small" className="rating__individual"/>
                            :
                            <div className="rating__none">N/A</div>
                        }
                    </div>
                </div>
                <div className="rating__rating-item">
                    <div className="rating__item">
                        <Group />
                        {
                            hangoutRating > 0 ?
                            <Rating value={parseFloat(hangoutRating)} precision={.5} readOnly size="small" className="rating__individual"/>
                            :
                            <div className="rating__none">N/A</div>
                        }
                    </div>
                </div>
                <div className="rating__rating-item">
                    <div className="rating__item">
                        <Laptop />
                        {
                            studyRating > 0 ?
                            <Rating value={parseFloat(studyRating)} precision={.5} readOnly size="small" className="rating__individual"/>
                            :
                            <div className="rating__none">N/A</div>
                        }
                    </div>
                </div>
            </div>
            <div className="review__content">
                {review}
            </div>
            {(userId === currentUserId && token) ?
                <div className="review__details">
                    <div>
                        <button className="review__btn" onClick={() => removeReview(reviewId)}><Delete fontSize="small" /></button>
                        <button className="review__btn" onClick={() => showModal(true)}><Edit fontSize="small" /></button>
                    </div>
                    <div className="review__date"> {moment(date).format("MM/DD/YYYY")} <br/> {user} </div>
                </div>
                :
                <div className="review__details"> 
                    <div></div>
                    <div className="review__date"> {moment(date).format("MM/DD/YYYY")} <br/> {user} </div>
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
                    <UpdateForm 
                        onSubmit={updateReview} 
                        review={review}
                        drinkRating={drinkRating}
                        foodRating={foodRating} 
                        studyRating={studyRating}
                        hangoutRating={hangoutRating}
                    /> 
                </Modal>
            }
        </div> 
        
    )
}

export default ReviewItem;