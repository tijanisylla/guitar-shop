import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Style/Forgot.css';
import {
  MDBSpinner, MDBBtn, MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,} from 'mdb-react-ui-kit';


export default function ForgotPassword() {
  const [email,
    setEmail] = useState("");
  const [loading,
    setLoading] = useState(false);
  const [error,
    setError] = useState("")
const [sent, setSent] = useState(false);

  const sendEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios('http://localhost:8000/reset-password', {
        method: 'POST',
        data: {
          username: `${email}`
        }
      })
     
      if (response.data.status === "success") {
        console.log(response)
        setSent(true)
      }else{
        setSent(false)
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }

  }

  const hendleMailChange = (e) => {
    setEmail(e.target.value)
  }
  const toggleShow = () =>{
     setSent(false);
     window.location.reload(false);
    }
  return (
    <div className="forgot-pass">
      {sent ? 
      <MDBModal show={sent} setShow={setSent} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <h3 style={{textAlign : 'center'}}>Email Sent to : {email} ✅ </h3>
            <p style={{textAlign : 'center'}}>Please check your email box.</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='danger' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> : null}
      <div className="container pt-5">
        <div className="row row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-header p-4">
                <h5 className="mb-0">
                  <strong>Forgot password ?
                  </strong>
                </h5>
              </div>
              <div className="card-body p-4">
                <p className="mb-4">Send an email to reset your password</p>
                <form onSubmit={sendEmailSubmit} className="mb-4">
                  <div className="form-outline">
                    <input
                      className="form-control mb-4"
                      type="email"
                      name="email"
                      onChange={hendleMailChange}
                      value={email}/>
                    <label className="form-label">Your email address</label>
                    <div className="form-notch">
                      <div className="form-notch-leading"></div>
                      <div
                        className="form-notch-middle"
                        style={{
                        width: '92px'
                      }}></div>
                      <div className="form-notch-trailing"></div>
                    </div>
                  </div>

                  {loading
                    ? <MDBBtn disabled>
                        <MDBSpinner grow size='sm' role='status' tag='span' className='me-2'/>
                        Sending...
                      </MDBBtn>
                    : <MDBBtn className='me-2'>
                      Send Email
                    </MDBBtn>
}
                </form>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <u>
                    <a href="">Back to Log In</a>
                  </u>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}