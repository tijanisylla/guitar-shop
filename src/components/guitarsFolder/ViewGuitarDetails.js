import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import {useParams, Link} from 'react-router-dom';
import StarsRating from './StarsRating';
import {formatterFunc, calculatePercentage} from './Helper';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleLeft} from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import axios from 'axios';
import './Style/GuitarId.css';
import Cart from '../Cart/Cart';
const ViewGuitarDetails = () => {
  const [data, setData] = useState([]);
  const {id} = useParams();

  async function getDataById() {
    try {
      const response = await axios.get(`http://localhost:8000/guitars/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      if (response.status === 200 || response.statusText === 'OK') {
        setData(response.data)
      }
    } catch (err) {
      throw err
    };
  };

  useEffect(() => {
    getDataById();
  }, []);

  const {
    brand_name,
    model_name,
    description,
    price,
    rating,
    image_url,
    category
  } = data;

  return (
    <div className="guitar-id-container">
      <div className="details-left">
        <span className="go-back-guitars">
          <Link to="/guitars/">
            <FontAwesomeIcon icon={faArrowCircleLeft} className="arrow-left"/>
          </Link>
        </span>
      
        <div className="header-left">
          <h2 style={{
            textAlign: 'center'
          }}>{brand_name}</h2>
        </div>

        <Carousel>
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

      {/* Right side  */}
      <div className="details-right">
        <div className="header-right">
          <h3 style={{
            float: 'left'
          }}>{model_name}</h3>
        </div>

        <p>{description}</p>
        <StarsRating numberOfStars={rating}/>
        <br/>
        <br/>
        <span className="orginal">
          <s>{formatterFunc(price)}</s>
        </span>
        <br/>
        <span className="price">{calculatePercentage(price)}</span>

        <br/>
        <br/>
        <Button onClick={() => alert("NO CART YET")} variant="primary">
          Add to cart
        </Button>
      </div>
    </div>
  )
};

export default ViewGuitarDetails;