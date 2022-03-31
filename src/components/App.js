import React from 'react';
import NavigationBar from './NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Home';
import About from './About';
import Contact from './Contact';
import SigneUp from './SigneUp';
import NotFound from './NotFound'
import Login from './Login'
import ForgotPass from './ForgotPass'
import Guitars from './Guitars'
import ViewGuitarDetails from './ViewGuitarDetails'
import '../Style/App.css'
const App = () => {
 
  return (
    <BrowserRouter>
      <div className="app">
        <NavigationBar/>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/about'exact element={<About/>}/>
            <Route path='/contact-us' element={<Contact/>}/>
            <Route path='/signup' exact element={<SigneUp/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/guitars' exact element={<Guitars/>}/>
            <Route path='/forgotpass' exact element={<ForgotPass/>}/>
            <Route path="/guitars/:id" exact element={< ViewGuitarDetails />}/>;
            <Route path='*'  element={<NotFound/>}/>
          </Routes>

      </div>
    </BrowserRouter>
  );
};


export default App;
