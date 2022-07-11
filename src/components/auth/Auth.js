import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './Login'
import SigneUp from './SigneUp'
import manguitar from '../Layout/img/man-guitar.jpg'
import './Style/Login.css'
import {useNavigate,Outlet,Navigate} from "react-router-dom";
const Auth = ({loggedIn, setLoggedIn}) => {
  const [value, setValue] = useState(0)
  const history = useNavigate();
 // Checks if a user is logged in and redirects
 useEffect(() => {
  if (loggedIn) {
    setLoggedIn(true);
   history('/');
  };
}, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const paperStyle = {
    width: 300,
    margin: "30px auto"
  }
  function TabPanel(
    {children,
    value,
    index,}) {
   
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        >
        {value === index && (
          <>
            <Typography>{children}</Typography>
          </>
        )}
      </div>
    );
  }

  return (
  
    <div className="login-container">
       {!loggedIn ? <Outlet/> : <Navigate to="/"/> } 
      {/* Left side  */}
      <div className="left-login">
        <Paper elevation={20} style={paperStyle}>

          <Tabs
           style={{textAlign : 'center',  color: '#000'}}
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example">
            {/* TAB LABEL  */}
            <Tab 
            label="Sign In"/>
            <Tab label="Sign Up"/>
          </Tabs>

          {/* LOO */}
          <TabPanel 
          value={value} index={0}>
            <Login loggedIn={loggedIn} setLoggedIn = {setLoggedIn} handleChange={handleChange} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            {/* SIN */}
            <SigneUp loggedIn={loggedIn} setLoggedIn ={setLoggedIn} handleChange={handleChange} />
          </TabPanel>
        </Paper>
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

export default Auth;