import React, {useState,useEffect} from 'react';
import {useNavigate,Link} from "react-router-dom";
import getUsername from '../guitarsFolder/Helper';
import axios from "axios";
import './Style/SignUp.css'
import manguitar from'./img/man-guitar-dark.jpg'
const Signe_up = ({ loggedIn, setLoggedIn}) => {

  const [userName,  setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [errorMsg,setErrorMsg] = useState("")
  const history = useNavigate();

      // Checks if a user is logged in and redirects
      useEffect(() => {
        if (loggedIn) {
         history('/');
        };
    }, []);

  async function handleSubmit(e) {
    e.preventDefault();
      try {
        const response = await axios({
          method: 'POST',
          url: `http://localhost:8000/users/register`,
          data : {
              username: `${userName}`,
              password: `${password}`
          }
      });
      const {token} =  response.data;
      const {username} = response.data.newUser;
      const {role} = response.data.newUser;
      localStorage.setItem('Token', token);
      localStorage.setItem('User',username);
      localStorage.setItem('role',role);
     
          setLoggedIn(true);
          console.log(token);
          console.log(username);
          console.log(response);
          history('/');
          
      } catch (error) {
        if(error.response.status === 401 || error.response.status === 400) {
          setErrorMsg(error.response.status);
        }else{
          console.log('Something went wrong');
        };
      };
  };
  
    


  const dontMatch =  <p style={{color: 'red'}}>Passwords dont match!</p>
  const success = <p style={{color: 'green'}}>Success!</p>
  const alreadyExists = <p style={{color: 'red'}}> (401) Username already exists. Please try again</p>
  
  return (
    <div className="sign-up-container">
      <div className="left-sign">
      
      <div className="sign-form">
        <form id="log-in" onSubmit={handleSubmit}>
       
      <div className="legend-rg">Register</div>
          <label 
            className="label-sign"
          htmlFor="username">Username:</label>
          {errorMsg ? alreadyExists :  null}
          <input
            type="text"
            className="input-sign"
            placeholder="Username..."
            value={userName}
            onChange={e => setUserName(e.target.value)}/>
          
          <label 
          className="label-sign"
          htmlFor="password">Password:</label>
          <input
           className="input-sign"
            type="password"
            // minLength={8} required
            placeholder="Password..."
            value={password}
            onChange={e => setPassword(e.target.value)}/> 

          <label 
          className="label-sign"
          htmlFor="password">Confirm Password:</label>
          <input
            className="input-sign"
            type="password"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}/> 
         
          {password !== confirmPassword ?  dontMatch : null} 
          <br/>
          <button 
          className="btn-sign"
          type="submit" disabled={!userName || !password || !confirmPassword} >
           Register
          </button>
          <p className="txt-back">Back to <Link className="rg" to="/login">Log-In</Link></p>
  
        </form>
       
</div>

</div>
        <div className="right-sign">
          <img
            className="sign-image"
            src={manguitar}
            alt="man-guitar-dark"
            style={{
            border: "none"
          }}/>
          
    <div className="quote-container">
      <article>
            <p className="quote">"Imagination is more important than knowledge. Knowledge is limited. Imagination encircles
                the world."
                <br/>
                <p>- Albert Einstein.</p>
            </p>

        </article>

      </div>

      </div>

    
    </div>
  )
}

export default Signe_up;