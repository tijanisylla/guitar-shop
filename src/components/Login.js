import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const history = useNavigate();

    const onLoginClick = async () => {
    alert('Logi not implemented yet')
    };
    
  return (
    <div className="login">
      <h1>Login in!</h1>
      {errorMsg &&
       <div className="fail">
           {errorMsg}
       </div>
       }
      <input type="text"
       placeholder="Example@gmail.com"
       value={email}
       onChange={e => setEmail(e.target.value)}
       />

      <input type="password"
       placeholder="Password"
       value={password}
       onChange={e => setPassword(e.target.value)}
       />

      <button
       onClick={onLoginClick}
       disabled={!email || !password} // If there's no email or password the btn is disabled.
      >Login in</button>

      <button
       onClick={()=>  history("/forgotpass")}
      >Forgot your password ?
       </button> 

      <button
      onClick={()=> history("/signup")}
      > Don't have an account yet? Sign Up.</button>  
    </div>
  )
}

export default Login;