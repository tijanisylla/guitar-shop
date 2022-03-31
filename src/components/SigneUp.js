import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const Signe_up = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // const history = useNavigate();

    const onSingUpClick = async () => {
    alert('Logi not implemented yet')
    };
  
  return (
    <div className="login">
      <h1>Sign-up</h1>
      {errorMsg &&
       <div className="fail">
           {errorMsg}
       </div>
       }
      <input type="email"
       placeholder="Example@gmail.com"
       value={email}
       onChange={e => setEmail(e.target.value)}
       />

      <input type="password"
       placeholder="Password"
       value={password}
       onChange={e => setPassword(e.target.value)}
       />

      <input type="password"
       placeholder="Confirm password"
       value={confirmPassword}
       onChange={e => setConfirmPassword(e.target.value)}
       />


      <button
       onClick={onSingUpClick}
       disabled={!email || !password || password !== confirmPassword} // If there's no email or password the btn is disabled.
      >Sign Up</button>

    </div>
  )
}

export default Signe_up;