import React from 'react'
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Style/Carousel.css'
const Home = () => {

  const guitar = {
    model_name: "Stratocaster",
    brand_name: "Fender",
    price: "1600.00",
    rating: 5,
    image_url: "https://media.musiciansfriend.com/is/image/MMGS7/American-Professional-II-Strato" +
        "caster-Rosewood-Fingerboard-Electric-Guitar-3-Color-Sunburst/L78030000001000-00-" +
        "500x500.jpg"
  }
  const {model_name, image_url, price, rating,  brand_name} = guitar
  return (
    <div className="home-component">
      <Carousel infiniteLoop autoPlay>
        <div className="image">
          <img src={image_url} alt="guitar"/>
          <div>
          </div>
        </div>
        <div className="image">
          <img src={image_url} alt="guitar"/>
        </div>
        <div className="image">
          <img src={image_url} alt="guitar"/>
        </div>
        <div className="image">
          <img src={image_url} alt="guitar"/>
        </div>
        <div className="image">
          <img src={image_url} alt="guitar"/>
        </div>
      </Carousel>
    </div>
  )
}
export default Home