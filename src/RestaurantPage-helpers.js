import Manhattan from "../src/images/ny-resize.jpg";
import SanFrancisco from "../src/images/sf-resize.jpg";
import SanGabriel from "../src/images/sg-resize.jpg";

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

export const cities = [
    {
        name: "San Gabriel",
        linkName: "san-gabriel",
        backgroundImage: SanGabriel
    },
    {
        name: "San Francisco",
        linkName: "san-francisco",
        backgroundImage: SanFrancisco
    },
    {
        name: "Manhattan",
        linkName: "manhattan",
        backgroundImage: Manhattan
    }
]
