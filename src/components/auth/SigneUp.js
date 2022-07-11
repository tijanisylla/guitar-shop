import React, {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';
const Signe_up = ({ loggedIn, setLoggedIn}) => {

  const [userName,  setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [errorMsg,setErrorMsg] = useState("")
  const history = useNavigate();

      // Checks if a user is logged in and redirect
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
  
  const btnstyle = {
    margin: '8px 0',
    backgroundColor: '#000'
  }
  const paperStyle = {
  padding: 15,
  height: '73vh',
  width: 300,
  margin: "0 auto"}
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#000' }
  const marginTop = { marginTop: 5 }
  const dontMatch =  <p style={{color: 'red'}}>Passwords dont match!</p>
  const success = <p style={{color: 'green'}}>Success!</p>
  const alreadyExists = <p style={{color: 'red'}}> (401) Username already exists. Please try again</p>
  
  return (
    <div>
      <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h3 style={headerStyle}>Sign Up</h3>
                    <Typography variant='caption' gutterBottom><span>Please fill this form to create an account !</span></Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                  {/* User name */}
                    <TextField 
                     fullWidth 
                     label='User name'
                      placeholder="Enter your username"
                      required
                     type="text"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      />
                    {/* Password */}
                    <TextField fullWidth 
                    label='Password' 
                    placeholder="Enter your password"
                    type="password"
                   // minLength={8} required
                   required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    {/* Confirm Password */}
                    <TextField
                     fullWidth label='Confirm Password' 
                     placeholder="Confirm your password"
                     type="password"
                     required
                     value={confirmPassword}
                     onChange={e => setConfirmPassword(e.target.value)}
                     />
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
          <Button

          type='submit'
          color='primary'
          variant="contained"
          style={btnstyle}
          fullWidth>Sign up</Button>
          
                </form>
            </Paper>
        </Grid>
      {/* <div className="left-sign">
      
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

      </div> */}

    
    </div>
  )
}

export default Signe_up;