import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap';
import {useParams, Link} from 'react-router-dom';
import StarsRating from './StarsRating'
import {formatterFunc} from './Helper'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Style/Home.css'
import {Carousel} from 'react-responsive-carousel';
import '../Style/GuitarId.css'
const ViewGuitarDetails = () => {
  const [data,
    setData] = useState([]);
  const [loading,
    setLoading] = useState(false);

  const {id} = useParams();

  async function getDataById() {
    const response = await fetch(`http://localhost:8000/guitars/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        mode: "cors"
      }
    })
    const data = await response.json();
    if (response.ok || response.status === 200) 
      setData(data);
    else 
      console.log(`Error: CANNOT GET URL ID `);
    }
  
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
        <div className="header-left">
        <h2 style={{textAlign: 'center'}}>{brand_name}</h2>
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
        <h3 style={{float: 'left'}}>{model_name}</h3>
        </div>

       <p>{description}</p>
       <StarsRating numberOfStars={rating}/>
       <br/>
       <br/>
       <span className="price">{formatterFunc(price)}</span> 
    
       <br/>
       <br/>
        <Button
        onClick={()=> alert("NO CART YET")}
         variant="primary" >
        Add to cart
        </Button>
      </div>


    </div>
  )
}

export default ViewGuitarDetails