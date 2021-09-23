import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-slideshow-image"; 
import { cities } from "../RestaurantPage-helpers";
import CityCard from "./CityCard";
import Header from "./Header";
import 'react-slideshow-image/dist/styles.css'
import SanGabriel from "../images/san-gabriel.png";
import SanFrancisco from "../images/maarten-van-den-heuvel-gZXx8lKAb7Y-unsplash.jpg";
import Manhattan from "../images/edward-mer-zkFvaJFYdvw-unsplash.jpg";
import BobaInfographic from "../images/boba-infographic.jpg";

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
          url: SanGabriel,
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
                        <span className="city__quote">"You wanna get boba?"</span> <br/><br/>

                        A question I’ve heard too many times to know it can be more than just grabbing drinks. <br/><br/>
                        
                        Nowadays, getting boba can mean different things &ndash; hanging out with friends, studying, or even a date. But at the bare minimum, you’re still getting a delicious drink. <br/><br/>
                        
                        I’ve been to too many boba shops to remember and found that there is no objectively “perfect” boba shop because each store has its own unique traits. <br/><br/>
                        
                        Boba Guide’s reviews are based on drinks, food, atmosphere, and study environment to help you find the perfect boba shop for any occasion.                  
                    </div>
                </div>
                <div className="city__cards">
                    <h1 className="city__info-header">Cities</h1>
                    <div className="city__card-container">
                        {
                            cities.map((city) => 
                                <Link to={`/cities/${city.linkName}`} className="city-card__link city-card__container" style={{ 'backgroundImage': `url(${city.backgroundImage})` }} key={city.name}>
                                    <CityCard name={city.name} linkName={city.linkName} />
                                </Link>
                            )
                        }
                    </div>
                </div>
                <div className="city__cultural-impact">
                   <h1 className="city__info-header">Boba's Cultural Impact</h1>
                   <div className="city__subsection-container">
                       <div className="city__info-subsection">
                            Bubble tea (colloquially known as “boba”) originated in Taiwan during the late <span className="city__date">1980s</span> when tapioca balls were added to the traditional tea with milk and sugar. <br/><br/>

                            A decade later, the popularity of bubble tea exploded among young people in Asian countries as each region added their own twist to the classic drink. <br/><br/>
                            
                            Fantasia Coffee & Tea in Cupertino, California brought bubble tea to America in the <span className="city__date">1990s</span> and paved the way for boba shops like Ten Ren’s Tea Time, Quickly, Tapioca Express, and Lollicup to flourish. <br/><br/>
                            
                            As popularity grew in the <span className="city__date">2000s</span> and more stores opened, the drink eventually came to be a piece of cultural identity for Asian immigrants who opened the shops and Asian Americans who frequented them. <br/><br/>
                            
                            In <span className="city__date">2020</span>, Taiwan has declared April 30th as National Bubble Tea Day to further cement the drink as a cultural icon. <br/><br/>
                            
                            <span className="city__date">Now</span>, bubble tea is commonplace in many countries. <br/><br/>
                            
                            Some shops are focused on creating a drink from the highest quality ingredients to make a traditional and nostalgic bubble tea. <br/><br/>
                            
                            However, others continue to innovate and push the boundaries of what can be done with a simple ball made out of tapioca starch.  <br/><br/>
                            
                            No matter the mission, I’m just excited to see what’s coming next in the renaissance of bubble tea.                    
                       </div>
                       <img src={BobaInfographic} className="city__image" alt="Infographic about boba in a few countries" />
                   </div>
                </div>
            </div>
        </div>
    )        
}


export default CityPage;

