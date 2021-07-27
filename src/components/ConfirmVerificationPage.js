import React, { useEffect } from "react";
import axios from "axios";

const ConfirmVerificationPage = (props) => {
    console.log(props)
    useEffect(() => {
        const id = props.match.params.id;
        console.log(id)
        axios.get(`http://localhost:3000/users/change-verification/${id}`)
            .then((res) => console.log(res))
    }, [])

    return (
        <div>
        <div>
            Your e-mail has been verified. Log in to create a review.
        </div>
        </div>
    )
}

export default ConfirmVerificationPage;