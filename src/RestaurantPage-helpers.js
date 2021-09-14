export const getRatingAverage = (pageReviews, ratingType) => {
    let ratings = pageReviews.filter((review) => review[ratingType] !== "N/A")
        .map((review) => parseInt(review[ratingType]));
    if (ratings.length === 0) {
        return "N/A";
    } else {
        let ratingAvg = (ratings.reduce((value, accumulator) => accumulator + value)) / ratings.length;
        return ratingAvg;
    }
}

export const colorCode = (ratingType) => {
    if (ratingType <= 4 || ratingType === "N/A") {
        return <div className="rating-item rating-item--red">{ratingType}</div>
    } else if (ratingType >= 4 && ratingType <= 7.5) {
        return <div className="rating-item rating-item--yellow">{ratingType}</div>
    } else {
        return <div className="rating-item rating-item--green">{ratingType}</div>
    }
}

export const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
}


export const absoluteDistanceInMiles = (lat1, lon1, lat2, lon2) => {
    var p = 0.017453292519943295;    
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)) * .62; 
}
