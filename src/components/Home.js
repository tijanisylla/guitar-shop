import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Style/Home.css'


import {Link} from 'react-router-dom';
import {Carousel} from 'react-responsive-carousel';
const Home = () => {
 
 const img1 = "https://media.musiciansfriend.com/is/image/MMGS7/Special-Grand-Performance-Cutaway-15ME-Streetmaster-Style-Acoustic-Electric-Guitar-Natural/L40683000001000-00-220x220.jpg"
 const img2 = "https://media.musiciansfriend.com/is/image/MMGS7/Excel-Series-SS-Semi-Hollow-Electric-Guitar-with-Stopbar-Tailpiece-Black/L13200000005000-00-220x220.jpg"
 const img3 = "https://media.musiciansfriend.com/is/image/MMGS7/LTD-Kirk-Hammett-Signature-White-Zombie-Electric-Guitar-Graphic/J03791000001000-00-220x220.jpg"
 const img4 = "https://media.musiciansfriend.com/is/image/MMGS7/Concept-Series-Rhoads-RR24MG-Ebony-Fingerboard-Electric-Guitar-Gloss-Black/L85496000001000-00-220x220.jpg"
 const img5 = "https://media.musiciansfriend.com/is/image/MMGS7/RG5120M-Prestige-Electric-Guitar-Polar-Lights/L34998000002000-00-220x220.jpg"
 const img6 = "https://media.musiciansfriend.com/is/image/MMGS7/Boden-Metal-NX-6-Electric-Guitar-Black-Granite/L89226000001000-00-220x220.jpg"

  return (
    <div className="home-component">
       {/* Just testing for now */}
       {/* autoPlay */}
      <Carousel>
        <div className="image">
      
          <img src={img1} alt="guitar"/>
          <div className="shop-now">
            <span>
              <Link to="/guitars">
              SHOP NOW
              </Link>
              </span>
            </div>
        </div>
        <div className="image">
          <img src={img2} alt="guitar"/>
          <div className="shop-now">
            <span>
              <Link to="/guitars">
              SHOP NOW
              </Link>
              </span>
            </div>
          
        </div>
        <div className="image">
          <img src={img3} alt="guitar"/>
          <div className="shop-now">
            <span>
              <Link to="/guitars">
              SHOP NOW
              </Link>
              </span>
            </div>
        </div>
        <div className="image">
          <img src={img4} alt="guitar"/>
          <div className="shop-now">
            <span>
              <Link to="/guitars">
              SHOP NOW
              </Link>
              </span>
            </div>
        </div>
        <div className="image">
          <img src={img5} alt="guitar"/>
          <div className="shop-now">
            <span>
              <Link to="/guitars">
              SHOP NOW
              </Link>
              </span>
            </div>
        </div>
        <div className="image">
          <img src={img6} alt="guitar"/>
          <div className="shop-now">
            <span>
              <Link to="/guitars">
              SHOP NOW
              </Link>
              </span>
            </div>
        </div>
      </Carousel>
      
    </div>
  )
}
export default Home
