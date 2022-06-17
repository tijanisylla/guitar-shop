import React from 'react';
import './Style/Home.css'
import {Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import images from '../Layout/Images'
import img1 from '../Layout/img/g3.jpeg';
import img2 from '../Layout/img/g6.jpeg';
import img3 from '../Layout/img/g5.jpeg';
import img4 from '../Layout/img/g7.jpeg';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';

const Home = ({loggedIn}) => {
const userName = localStorage.getItem('User');

  return (
<div className="home-component">
  <div className="container-cr">
  <MDBCarousel showIndicators showControls fade>
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src={img1} alt='...' />
          <MDBCarouselCaption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={img2} alt='...' />
          <MDBCarouselCaption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src={img3} alt='...' />
          <MDBCarouselCaption>
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src={img4} alt='...' />
          <MDBCarouselCaption>
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

      </MDBCarouselInner>
    </MDBCarousel>
      </div>
    </div>
  )
}
export default Home;
