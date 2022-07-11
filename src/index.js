import ReactDOM from 'react-dom';
import React, {useState, useEffect,Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home, Contact, NavigationBar, NotFound} from './components/Layout/'

import ViewGuitarDetails from './components/guitarsFolder/ViewGuitarDetails'
import Guitars from './components/guitarsFolder/FetchData'
import Footer from './components/Footer/Footer'
import Profile from './components/profile/Profile'
import UpdatGguitar from './components/admin/guitars-admin/UpdatGguitar'
import {Auth, Login, SigneUp} from './components/auth'
import Cart from './components/Cart/Cart'
import Test from './components/Sidebar/Test'
import Test2 from './components/Sidebar/Test2'
import ForgotPassword from './components/auth/ForgotPass';
import ResetPass from './components/auth/ResetPass'
// Admin
import Admin from './components/admin/users-admin/Admin'
import GuitarsAdmin from './components/admin/guitars-admin/Guitars'
import User from './components/admin/users-admin/Users'
// import Chat from  './components/Live-chat/Chat'
// ==== RDDUX ====
import {Provider} from 'react-redux';
import store from './components/redux/store'
import Room from './components/room/Room'

function checkLocalLoggedIn(setLoggedIn) {
  if (localStorage.getItem('User') && localStorage.getItem('Token')) {
    return setLoggedIn(true);
  };
};

const App = () => {
  // States
  const [loggedIn,
    setLoggedIn] = useState(false);
  // Check if the user is stored locally on page load
  useEffect(() => {
    checkLocalLoggedIn(setLoggedIn);
  }, []);



  // checkUserRole() Initialize user state and log out locally
  function logOut(event) {
    event.preventDefault();
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('User');
    localStorage.removeItem('Token');
    localStorage.removeItem('date');

    window
      .location
      .assign('/auth');
  };

  return (
    <BrowserRouter>
      <div className="app">
      <Suspense fallback="Loading...">
          <NavigationBar loggedIn={loggedIn} logOut={logOut}/>
          <Routes>
            <Route
              path='/'
              exact
              element={< Home loggedIn = {
              loggedIn
            } />}/>
          
            <Route path='/cart' exact element={< Cart />}/>
            {/* Test */}  

            <Route path='/test'  exact element={< Test />}/>
            <Route path='/test2'  exact element={< Test2 />}/>
            <Route path='/room'  exact element={< Room />}/>
            <Route path='/forgot'exact element={< ForgotPassword />}/>
            <Route path='/resetpassword' exact element={< ResetPass />}/> {/* Auth */}
            <Route>
              <Route
                path='/auth'
                exact
                element={< Auth loggedIn = {
                loggedIn
              }
              setLoggedIn = {
                setLoggedIn
              } />}/>
            </Route>
            <Route
              path='/profile'
              exact
              element={< Profile loggedIn = {
              loggedIn
            }
            setLoggedIn = {
              setLoggedIn
            } />}/> {/* <Route path='/sign' exact element={< SigneUp />}/> */}
            <Route path='/contact-us' element={< Contact />}/> {/* Protected Route */}
            <Route>
              {/* Admin */}
              <Route path='/a-guitars' element={< GuitarsAdmin />}/>
              <Route path='/a-users' element={< User />}/>
              <Route path='/admin' element={< Admin />}/>
            </Route>
            <Route path='/guitars' exact element={< Guitars />}/>
            <Route path="/guitars/:id" exact element={< ViewGuitarDetails />}/>;
            <Route path="/guitars/:id/update" exact element={< UpdatGguitar />}/>;
            <Route path='*' element={< NotFound />}/>
            
          </Routes>
          <Footer/>
          </Suspense>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <App/>, document.getElementById('root'));