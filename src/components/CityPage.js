import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-slideshow-image"; 
import Header from "./Header";
import 'react-slideshow-image/dist/styles.css'
import SanFrancisco from "../images/maarten-van-den-heuvel-gZXx8lKAb7Y-unsplash.jpg";
import Manhattan from "../images/edward-mer-zkFvaJFYdvw-unsplash.jpg";



const CityPage = () => {
    const slideImages = [
        {
          url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
          caption: 'Explore San Gabriel Valley',
          city: "san-gabriel"
        },
        {
          url: SanFrancisco,
          caption: 'Explore San Francisco',
          city: "san-francisco"
        },
        {
          url: Manhattan,
          caption: 'Explore Manhattan',
          city: "manhattan"
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
                                    state: { city: slideImage.city }
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
                        cards
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

