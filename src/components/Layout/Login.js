import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye,faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import manguitar from './img/man-guitar.jpg'
import './Style/Login.css'


const Login = ({loggedIn, setLoggedIn}) => {
  const [userName,
    setUserName] = useState("");
  const [password,
    setPassword] = useState("");
  const [errorMsg,
    setErrorMsg] = useState("");
  const [passwordShown,
    setPasswordShown] = useState(false);
  const [isLoading,
    setLoading] = useState(false);
const [admin, setAdmin] = useState(false);

    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown
        ? false
        : true);
    };
    


  // ======= HANDLE SUBMITTING ========
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios({
          method: 'POST',
          url: `http://localhost:8000/users/login`,
          data: {
            username: `${userName}`,
            password: `${password}`
          }
        });
        const {token} = response.data
        const {user} = response.data

        if (response.status === 200 || response.ok) {

          localStorage.setItem('Token', token);
          localStorage.setItem('User', user.username);
          localStorage.setItem('role', user.role);

          console.log(response);
          setLoggedIn(true)
          window
            .location
            .assign('/');
        }
        setLoading(false)
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 500) {
          setErrorMsg(error.response.status);
        } else {
          console.log('Something went wrong')
        }

      };
    };
  
    // ======= VALIDATION ========
    const usernameRequired = <p style={{ color: 'red'  }}>  Username is required.</p>
    const passwordRequired = <p style={{ color: 'red'  }}> Password is required. </p>
    const success = <p style={{ color: 'green'  }}>Looks good!</p>
    const usernameOrPassword = <p style={{ color:'red'}}>Username or password were incorrect</p>
    const eye = <FontAwesomeIcon icon={faEye}/>;
    const loginIcon = <FontAwesomeIcon icon={faArrowRightToBracket}/>
    const im = "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1649231888~exp=1649232488~hmac=bfcf814b748954730e56a5542a743c608a507a19d2b8651fca3686839712eccb&w=740"
    return (
      <div className="login-container">
        <div className="left-login">
  
        <div className="form">
        <form id="log-in" onSubmit={(e) => handleSubmit(e)}>
        {errorMsg ? usernameOrPassword  : null}
        <label htmlFor="username">Username:</label>
 
        <input
          type="text"
          placeholder="Username..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}/>
          {!userName ?  usernameRequired : null }
        <label htmlFor="password">Password:</label>
       
        <i className="eye" onClick={togglePasswordVisiblity}>{eye}</i>
        <input
          type={passwordShown ? "text" : "password"}
          placeholder="Password..."
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          
          />
         {!password ? passwordRequired : null }
         { userName && password ? success : null}
         
         <button 
          className="btn-login"
          type="submit" 
          disabled={!userName || !password} >
            Login
          </button>
  

         <p className="sign-up" >Don't have an account?
         <Link className="lg" to="/signup">Sign up!</Link>
      
         </p>
       
      </form>
    </div>
</div>
        {/* ==============Right Side==============  */}
        <div className="right-login">
          <img
            className="login-image"
            src={manguitar}
            alt="man-guitar"
            style={{
            border: "none"
          }}/>
        </div>

      </div>
    )
  }
  export default Login;


 