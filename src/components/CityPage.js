import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-slideshow-image"; 
import { cities } from "../RestaurantPage-helpers";
import CityCard from "./CityCard";
import Header from "./Header";
import 'react-slideshow-image/dist/styles.css'
import SanFrancisco from "../images/maarten-van-den-heuvel-gZXx8lKAb7Y-unsplash.jpg";
import Manhattan from "../images/edward-mer-zkFvaJFYdvw-unsplash.jpg";

const CityPage = () => {

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                sessionStorage.setItem("userLongitude", position.coords.longitude);
                sessionStorage.setItem("userLatitude", position.coords.latitude);
            },
            function error(msg) {console.log("User has chosen to not enable GPS location feature.");},
            {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
        } else {
            alert("Geolocation API is not supported in your browser.");
        }
    }

    useEffect(() => {
        getLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const slideImages = [
        {
          url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
          caption: "Explore Boba in San Gabriel Valley", // change to make more descriptive
          city: "san-gabriel",
          cityDescription: "san gabriel valley"
        },
        {
          url: SanFrancisco,
          caption: 'Explore Boba in San Francisco',
          city: "san-francisco",
          cityDescription: "san francisco"
        },
        {
          url: Manhattan,
          caption: 'Explore Boba in Manhattan',
          city: "manhattan",
          cityDescription: "manhattan"
        },
      ];
    const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: false,
        arrows: true,
        canSwipe: true,
        autoPlay: true
    }
    return (
        <div>
            <Header />
            <div className="slide-container">
                <Fade {...properties}>
                    {slideImages.map((slideImage, index)=> (
                        <div className="city__slide" key={index}>
                            <div style={{'backgroundImage': `url(${slideImage.url})`}}>
                                <Link className="city__link" to={{
                                    pathname: `/cities/${slideImage.city}`,
                                    state: { cityDescription: slideImage.cityDescription }
                                  }}>
                                    <span>{slideImage.caption}</span>
                                </Link>                                
                            </div>
                        </div>
                    ))} 
                </Fade>
            </div>
            <div className="city__info-container">
                <div className="city__who">
                    <h1 className="city__info-header">Not All Boba Shops are the Same.</h1>
                    <div className="city__info-subsection">
                        "Let's get boba."<br/><br/>
                        If you've heard this before, you know that it's than just drinks.<br/><br/>
                        As someone who's been to too many boba shops to remember, I realize that <br/><br/>
                        At the bare minimum, you're getting delicious drinks and food.
                    </div>
                </div>
                <div className="city__what">
                   <h1 className="city__info-header city__info-header--right">Our Goal</h1>
                   <div className="city__info-subsection--right">
                        {cities.map((city) => <CityCard name={city.name} />)}
                   </div>
                </div>
                <div className="city__goal">
                   <h1 className="city__info-header">Boba's Cultural Impact</h1>
                   <div className="city__info-subsection">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,<br/><br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                   </div>
                </div>
            </div>
        </div>
    )        
}


export default CityPage;

