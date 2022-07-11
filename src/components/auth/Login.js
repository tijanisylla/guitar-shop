import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import './Style/Login.css'
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NavigationBar from '../Layout/NavigationBar'

const Login = ({loggedIn, setLoggedIn, handleChange}) => {
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


   const date = new Date();
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
      const response = await axios('http://localhost:8000/users/login',{
        method: 'POST',
        data: {
          username: `${userName}`,
          password: `${password}`,
          date : `${date}`
        }
      });
      const {token} = response.data
      const {user} = response.data

      if (response.status === 200 || response.ok) {
        localStorage.setItem('id', user.id);
        localStorage.setItem('Token', token);
        localStorage.setItem('User', user.username);
        localStorage.setItem('role', user.role);
        localStorage.setItem('date', user.date);
        console.log(response.status +  'Good response');
        setLoggedIn(true)
        window
          .location
          .assign('/');
      }
      setLoading(false)
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        setErrorMsg(error.response.status);
        console.log('Something went wrong', error.response.status)
      } else {
        console.log('Good response', error.response.status)
      }

    };
  };
  



  const paperStyle = {
    padding: 15,
    height: '73vh',
    width: 100 + '%',
    margin: "0 auto"
  }
  const avatarStyle = {
    backgroundColor: '#000'
  }
  const btnstyle = {
    margin: '8px 0',
    backgroundColor: '#000'
  }
  const headerStyle = { margin: 0 }
  // ======= VALIDATION ========
  // const usernameRequired = <p style={{
  //   color: 'red'
  // }}>
  //   Username is required.</p>
  // const passwordRequired = <p style={{
  //   color: 'red'
  // }}>
  //   Password is required.
  // </p>
  // const success = <p style={{
  //   color: 'green'
  // }}>Looks good!</p>
  // const usernameOrPassword = <p style={{
  //   color: 'red'
  // }}>Username or password were incorrect</p>
  // const eye = <FontAwesomeIcon icon={faEye}/>;
  // const loginIcon = <FontAwesomeIcon icon={faArrowRightToBracket}/>
  return (
    <div>{/* className="login-container" */}

      <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h3 style={headerStyle}>Sign In</h3>
        </Grid>
         {/* Username */}
         <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
         type="text"
         placeholder="Enter your username..."
         value={userName}
         label='Username'
         fullWidth required
         onChange={(e) => setUserName(e.target.value)}
         />
          {/* Password */}
        <TextField
          label='Password'
          placeholder='Enter password'
          fullWidth required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={passwordShown
            ? "text"
            : "password"}/>
           
        <FormControlLabel
          control={< Checkbox name = "checkedB" color = "primary" />}
          label="Remember me"/>
        <Button
          type='submit'
          color='primary'
          variant="contained"
          style={btnstyle}
          fullWidth>Sign in</Button>
        </form>
        <Typography>
      
          <Link to="/forgot">
            Forgot password ?
          </Link>
        </Typography>
        <Typography >
          Do you have an account ?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
   
        {/* <div className="form">
          <Form  onSubmit={(e) => handleSubmit(e)}>
            {errorMsg
              ? usernameOrPassword
              : null}
          
            <Form.Group>
            <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}/>
            </Form.Group>
            
            {!userName
              ? usernameRequired
              : null}
            {/* Password */}
            
            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
              <InputGroup hasValidation>

                <Form.Control
                  type={passwordShown
                  ? "text"
                  : "password"}
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
                  <InputGroup.Text>
                  <i className="eye" onClick={togglePasswordVisiblity}>{eye}</i>
                  </InputGroup.Text>
                  </InputGroup>
              </Form.Group>
              

            {!password
              ? passwordRequired
              : null}
            {userName && password
              ? success
              : null}

            <Button className="btn-login" type="submit" disabled={!userName || !password}> */}
              {/* Login
            </Button>

            <p className="sign-up">Don't have an account?
              <Link className="lg" to="/signup">Sign up!</Link>

            </p>

          </Form>
        </div>
      </div>
      
   */} 
   {/* </div> */}
     

    </div>
  )
}
export default Login;
