import React, {useState} from "react";
// import ReCAPTCHA from "react-google-recaptcha";
// import Modal from 'react-modal';
import { GoogleMap, LoadScript } from '@react-google-maps/api';



import {FaTimes} from "react-icons/fa"
import '../Layout/Style/Contact.css'

const Contact = () => {
  let REACT_APP_API;
  if ("localhost:3000" === window.location.host) {
    REACT_APP_API = 'http://localhost:8000/send'
  }

  const [modalIsOpen,
    setIsOpen] = useState(false);
  const [mailerState,
    setMailerState] = useState({name: "", email: "", message: ""});
  const [sendin,
    setSending] = useState(false);

  const submitEmail = async(e) => {
  // const REACT_APP_API_KEY = 
    e.preventDefault();

    // ===========FALSE============//
    setSending(true)
    setIsOpen(false)
    console.log({mailerState});

    // ===========REACT_APP_API and refresh the server if not it will undefined  ;)
    // ============//
    const response = await fetch(`${REACT_APP_API}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"

      },
      body: JSON.stringify({mailerState})

    }).then((res) => res.json()).then(async(res) => {
      const resData = await res;
      console.log(resData);
      // ===========FALSE============//
      setSending(false)
      setIsOpen(false)

      if (resData.status === "success") {
        // alert('message sent!')

      } else if (resData.status === "fail") {
        alert("Message failed to send");
      }

    }).then(() => {
      setMailerState({email: "", name: "", message: ""});

    });
  };
  console.log('SECRET:', `${REACT_APP_API}`)

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

  }

  //======REACR_MODAL=======//

  function openModal() {
    setTimeout(function () {
      setIsOpen(true)
    }, 3000);

  }

  function closeModal() {
    setIsOpen(false);

  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '2px solid black'
    }
  };
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  return (
    <div className='contact'>
      {/* Left Side */}
      <div className='timing'>
       
        <div className='card-timing'>
        <h3 className='header-timing'>Chicago,IL</h3>
            <p>5328 W Leland Ave.</p>
            <p>Chicago,&nbsp;IL&nbsp;60630</p>
            <p>Monday &nbsp;
              <strong>CLOSED</strong>
            </p>
            <p>Tues - Friday &nbsp;
              <strong>12pm - 7pm</strong>
            </p>
            <p>Saturday &nbsp;
              <strong>10am - 7pm</strong>
            </p>
            <p>Sunday &nbsp;
              <strong>11am - 5pm</strong>
            </p>           
            <p>(312) 690-0771</p>
          </div>
          <div className="img-timing">
            <LoadScript 
            googleMapsApiKey={process.env.REACT_APP_API_KEY}>
            <GoogleMap
            mapContainerStyle={containerStyle}
            zoom = {10}
            // Longitude && Latitude
            center = {
              {
              lat : 41.878113,  
              lng : -87.629799
              }
            }>

            </GoogleMap>           
             </LoadScript>
            {/* <img src="https://cdn.pixabay.com/photo/2016/11/04/14/13/google-maps-1797882_1280.png"/> */}
          </div>
      </div>
      <div className="contact-input">
        <form onSubmit={submitEmail}>
          <fieldset>
            <legend>Contact</legend>

            <label className="label">Name</label>

            <input className="input-contact"
              type="text"
              placeholder="Your name"
              required
              onChange={handleStateChange}
              name="name"
              value={mailerState.name}/>

            <label className="label">Email</label>

            <input className="input-contact"
              type="text"
              placeholder="Example@gmail.com"
              onChange={handleStateChange}
              name="email"
              value={mailerState.email}
              required/>

            <label className="label">
              Message</label>

            <textarea
              placeholder="Message..."
              onChange={handleStateChange}
              name="message"
              value={mailerState.message}
              required/> {!sendin && <button type="submit" className="form-btn">
              Send Message</button>}

            {sendin && <div className="Loading">
            

               <h5>Send message...</h5>

            </div>}

            {sendin && <div>
              {openModal()}
            </div>}

          </fieldset>
        </form>

        
           {/* <Modal

              isOpen={modalIsOpen}
              style={customStyles}
              appElement={document.getElementById('app')}
              //to avoid modal errors
              ariaHideApp={false}
              onClick={closeModal}>


             <FaTimes
             style={{color : 'red',
                     float : 'right'}}
             onClick={closeModal }


              >close</FaTimes>
              <div>
              <h3 style={{textAlign : 'center'}}>Message Sent ! ✅ </h3>
              <p style={{textAlign : 'center'}}>I will respond to you as quickly as possible!</p>
              </div>

           </Modal>  */}

      </div>

    </div>
  );

}

export default Contact;