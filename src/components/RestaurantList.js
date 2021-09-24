import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { absoluteDistanceInMiles, scrollToTop } from "../RestaurantPage-helpers";
import Header from "./Header";
import axios from "axios";

const RestaurantList = () => {
    
    const parameters = useParams();
    let city = parameters.name;
    const userLong = sessionStorage.getItem("userLongitude");
    const userLat = sessionStorage.getItem("userLatitude");
    const [distanceFilter, setDistanceFilter] = useState(true);

    const chooseCityDescription = () => {
        switch(city) {
            case "san-gabriel":
                return <div className="list__description">
                            <h1>San Gabriel</h1>
                            <div className="list__description-text">
                                With over half a million Asian residents in the San Gabriel Valley, it’s no wonder why the area is seen as a mecca for all things Asian &ndash; especially boba. <br/> <br/>
    
                                After the boom in popularity of boba in the 2000s, shops have been opening up left and right starting with Ten Ren’s Tea Time, Quickly, Tapioca Express, and Lollicup. Nowadays, there are so many shops that it’s hard to choose. <br/> <br/>
    
                                In the San Gabriel Valley, you’ll find traditional boba shops using high quality ingredients, shops experimenting with new ideas and flavors, and places to just get a standard boba milk tea.
                            </div>
                        </div>
            case "san-francisco":
                return <div className="list__description">
                            <h1>San Francisco</h1>
                            <div className="list__description-text">
                                Boba shops typically follow Asian communities in America, and San Francisco is no exception.
                                The drink was introduced to the area in the 1990s and continued to evolve, lending to the wide variety of flavors you can choose from today. <br/><br/>
                                
                                With choices ranging from classic Taiwanese stores to new-era homegrown shops, you’ll definitely find a drink you love in San Francisco.
                            </div>
                        </div>
            case "manhattan":
                return <div className="list__description">
                            <h1>Manhattan</h1>
                            <div className="list__description-text">
                                In neighborhoods like Manhattan’s Chinatown, Flushing in Queens, and 8th Avenue, boba shops are abundant. If you want to grab a drink on the go, hang out with friends, or even go on a date, there’s a boba shop for you. <br/><br/>
    
                                San Francisco was found to have an average of 2.39 boba shops/square mile in a study finding the boba capital of the world (excluding Manhattan). <br/><br/>
                                However, Flushing was found to have an average of 33 boba shops/square mile.
    
                                If you ever end up in Manhattan and need something to do, try out a new boba shop &ndash; you can’t miss them!
                            </div>
                        </div>
            default:
                return <div className="list__description">error</div>
        }
    }
    
    const [filter, setFilter] = useState("");

    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        // axios.get(`https://boba-api-tyler.herokuapp.com/cities/${city}`) 
        axios.get(`http://localhost:3000/cities/${city}`)
            .then((res) => {
                res.data[0].restaurants.forEach((shop) => {
                    const distance = Math.round(absoluteDistanceInMiles(userLat, userLong, shop.latitude, shop.longitude) * 10) / 10
                    shop.shopDistance = distance
                })
                setRestaurants(res.data[0].restaurants)
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let filteredShops;
    distanceFilter === true ? 
    filteredShops = restaurants.filter((shop) =>
        shop.name.toLowerCase().includes(filter.toLowerCase())
    ) 
    :
    filteredShops = restaurants.filter((shop) =>
        shop.name.toLowerCase().includes(filter.toLowerCase())
    ).sort((a, b) => {
        return a.shopDistance < b.shopDistance ? -1 : 1
    })

    return (
        <div>
            <Header />
            <div className="list__description-container">
                {chooseCityDescription()}
            </div>
            <div className="list__filter-container">
                <input
                    type="text"
                    className="list__text-filter"
                    placeholder="Search..."
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }}
                />
                <div className="list__distance-filter">
                    <label htmlFor="distance-filter">
                    <span className="list__filter-label">Sort By Distance</span>
                    <input
                        className="list__filter-input"
                        type="checkbox"
                        value={distanceFilter}
                        id="distance-filter"
                        name="distance-filter"
                        onChange={() => {
                            setDistanceFilter(!distanceFilter)
                        }}
                    />
                    </label>
                    
                </div>
            </div>
            {filteredShops.map((shop, idx) => {
                return (
                    <Link className="list__restaurant-link" key={idx+1} to={`/shop/${shop.id}`}>
                        <div className="list__restaurant-card">
                            <div>
                                <img src={shop.image_url} className="list__feed-img" alt="A depiction representative of the restaurant" />
                            </div>
                            <div className="list__restaurant-name-container">
                                <div className="list__restaurant-name">
                                    {shop.name} 
                                </div>
                            </div>
                            {shop.location.address2 ? 
                                <div className="list__restaurant-contact">
                                    {shop.location.address1 + " " + shop.location.address2}<br></br>
                                    {shop.location.city + ", " + shop.location.state + ", " + shop.location.zip_code}<br></br>
                                    {shop.display_phone}
                                    {userLong && 
                                        <div className="list__distance">
                                            {shop.shopDistance} {shop.shopDistance === 1 ? "mile" : "miles"}
                                        </div>
                                    }
                                </div> 
                                : 
                                <div className="list__restaurant-contact">
                                    {shop.location.address1}<br></br>
                                    {shop.location.city + ", " + shop.location.state + ", " + shop.location.zip_code}<br></br>
                                    {shop.display_phone}
                                    {userLong && 
                                        <div className="list__distance">
                                            {shop.shopDistance} {shop.shopDistance === 1 ? "mile" : "miles"}
                                        </div>
                                    }
                                </div>}
                        </div>
                    </Link>
                )
            })}
            <button onClick={scrollToTop} className="go-top-btn">SCROLL TO TOP</button>
        </div>
    )
}

export default RestaurantList;