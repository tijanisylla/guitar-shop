import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import './Style/Home.css'
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios  from 'axios'
const Home = ({loggedIn}) => {
  const userName = localStorage.getItem('User');
  
  const images = [

    {
      img: "https://media.musiciansfriend.com/is/image/MMGS7/Special-Grand-Performance-Cutaw" +
          "ay-15ME-Streetmaster-Style-Acoustic-Electric-Guitar-Natural/L40683000001000-00-2" +
          "20x220.jpg"
    }, {
      img: "https://media.musiciansfriend.com/is/image/MMGS7/Excel-Series-SS-Semi-Hollow-Ele" +
          "ctric-Guitar-with-Stopbar-Tailpiece-Black/L13200000005000-00-220x220.jpg"
    }, {
      img: "https://media.musiciansfriend.com/is/image/MMGS7/LTD-Kirk-Hammett-Signature-Whit" +
          "e-Zombie-Electric-Guitar-Graphic/J03791000001000-00-220x220.jpg"
    }, {
      img: "https://media.musiciansfriend.com/is/image/MMGS7/Concept-Series-Rhoads-RR24MG-Eb" +
          "ony-Fingerboard-Electric-Guitar-Gloss-Black/L85496000001000-00-220x220.jpg"
    }, {
      img: "https://media.musiciansfriend.com/is/image/MMGS7/RG5120M-Prestige-Electric-Guita" +
          "r-Polar-Lights/L34998000002000-00-220x220.jpg"
    }, {
      img: "https://media.musiciansfriend.com/is/image/MMGS7/Boden-Metal-NX-6-Electric-Guita" +
          "r-Black-Granite/L89226000001000-00-220x220.jpg"
    }

  ];


  async function getUserAsync () {
    try{
      let response = await axios({
          method: 'get',
          url: `http://localhost:8000/users`,
          json: true
      });
      console.log(response.data[2].role) ;
    } catch(err){
        console.error(err);
    }
}
getUserAsync()


  return (
    <div className="home-component">
      {loggedIn
        ? <h1>Welocme : {userName}</h1>
        : null}

{/* <Carousel>
        {images.map((__i, idx) => {
            <div className="image" key={idx}>
              <img src={__i.img} alt="guitar"/>
              <div className="shop-now">
                <span>
                  <Link to="/guitars">
                    SHOP NOW
                  </Link>
                </span>
              </div>
            </div>
        })};
       </Carousel> */}
    </div>
  )
}
export default Home;
