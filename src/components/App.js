import React from 'react';
import NavigationBar from './NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Router, Route, Routes} from "react-router-dom";
import Home from './Home';
import About from './About';
import Services from './Service';
import Contact from './Contact';
import Signe_up from './Signe_up';
import NotFound from './NotFound'
import '../Style/App.css'
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <NavigationBar/>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/about'exact element={<About/>}/>
            <Route path='/service'exact element={<Services/>}/>
            <Route path='/contact-us' element={<Contact/>}/>
            <Route path='/sign-up' exact element={<Signe_up/>}/>
            <Route path='*'  element={<NotFound/>}/>
          </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
