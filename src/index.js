
import ReactDOM from 'react-dom';
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import NavigationBar from './components/NavigationBar'
import NotFound from './components/NotFound'
import ViewGuitarDetails from './components/ViewGuitarDetails'
import Guitars from './components/Guitars'
import SigneUp from './components/SigneUp'
import Login from './components/Login'
import Admin from './components/admin/Admin'
import Footer from './components/Footer/Footer'

function checkLocalLoggedIn(setLoggedIn) {
  if (localStorage.getItem('User') && localStorage.getItem('Token')) {
      return setLoggedIn(true);
  };
};


const App = () => {
     // States
     const [ loggedIn, setLoggedIn ] = useState(false);
     // Check if the user is stored locally on page load
     useEffect(() => {
         checkLocalLoggedIn(setLoggedIn);
     }, []);


    // checkUserRole()
     // Initialize user state and log out locally
     function logOut(event) {
         event.preventDefault(); 
         localStorage.removeItem('role');
         localStorage.removeItem('User');
         localStorage.removeItem('Token');
         window.location.assign('/login');
     };

    

  
     
  return (
    <BrowserRouter>
      <div className="app">
        <NavigationBar loggedIn={loggedIn} logOut={logOut} />
          <Routes>
            <Route path='/' exact element={<Home loggedIn={loggedIn} />}/>
            <Route path='/about'exact element={<About/>}/>
            <Route path='/contact-us' element={<Contact/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/signup' exact element={<SigneUp  loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
            <Route path='/login' exact element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/guitars' exact element={<Guitars/>}/>
            <Route path="/guitars/:id" exact element={< ViewGuitarDetails />}/>;
            <Route path='*' element={<NotFound/>}/>
          </Routes>
         <Footer/>
      </div>
    </BrowserRouter>
  );
};


ReactDOM.render( <App/>, document.getElementById('root'));