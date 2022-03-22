import {idleTimeoutMillis} from 'pg/lib/defaults';
import React from 'react'
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap';
import '../Style/Home.css'
import FetchingData from './FetchingData';
import Loading from './Loading';
const Home = () => {
  const {data, loading, error} = FetchingData('http://localhost:8000/guitars');

  return (
    <div className="home-component">
      {loading
        ? <Loading/>
        : null}
      {error
        ? <span>An error has occurred !</span>
        : null}
      <div className="card-container">
        {data.map((guitar, idx) => {
          const {
            brand_name,
            model_name,
            description,
            price,
            rating,
            image_url,
            category
          } = guitar;
          return (

            <Card className="card-guitars">
              <Card.Img variant="top" src={image_url} alt="guitar"/>
              <Card.Body>
                <Card.Title>{brand_name}</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. 
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>

          )
        })
}

      </div>
    </div>
  )
}
export default Home

{/* <Carousel infiniteLoop autoPlay>
        <div className="image">
          <img src="" alt="guitar"/>
          <div>
          </div>
        </div>
        <div className="image">
          <img src="" alt="guitar"/>
        </div>
        <div className="image">
          <img src="" alt="guitar"/>
        </div>
        <div className="image">
          <img src="" alt="guitar"/>
        </div>
        <div className="image">
          <img src="" alt="guitar"/>
        </div>
      </Carousel> */
}