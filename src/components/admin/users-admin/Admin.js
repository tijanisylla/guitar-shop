import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Outlet } from "react-router-dom";
import "../Style/Admin.css";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaGuitar,
  FaTimes,
  FaShoppingBag
} from "react-icons/fa";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
//=========================================
import Guitars from "../guitars-admin/Guitars";
import Users from "./Users";
import Home from "../Chart/Home";
import LiveChat from '../Live-chat-admin/LiveChat'



const Admin = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      name: "Users",
      icon: <FaUserAlt />,
    },{
      name: 'Guitars',
      icon : <FaGuitar/>
    },
    {
      name : 'Orders',
      icon : <FaShoppingBag/>
    },
    {
      name : 'Messages',
      icon : <i className="fa-brands fa-rocketchat"></i>
    },
    {
      name : 'Logout',
      icon :  <span 
      style={{backGround : 'red'}}
      className="fa fa-sign-out"></span>
    }
  ];

    
const isAdmin = localStorage.getItem("role");

  return (
    <>
      {isAdmin === "admin" ? <Outlet /> : <Navigate to="*" />}
      <div className="container-test">
        <div style={{  width: isOpen ? "200px" : "50px", }}className="sidebar" >
          <div className="top_section">
            <h1   style={{display: isOpen ? "block" : "none"}}  className="logo" >
           
              
              {/* Avatar */}
              <Stack direction="row" spacing={2}>
                <Avatar alt={"Shad"} src=""spacing={{ xs: 1, sm: 2, md: 4 }} />         
              </Stack>
            </h1>
            <div style={{marginLeft: isOpen ? "50px" : "0px", }}className="bars" >
            {!isOpen ? <FaBars onClick={toggle}/> : <FaTimes onClick={toggle}/> }
             
            </div>
          </div>

          {/* Condition */}
           
          {
                   menuItem.map((item, index)=>(
                       <div key={index} id="link" className={activeTab === item.name ? "active-div" : ""}  onClick={()=> setActiveTab(item.name)}>
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}}
                            className="link_text">{item.name}</div>
                             {/* {item.name === "Logout" ? 'ok' : null} */}
                       </div>
                      
                   ))
               }
            
          </div>
          
{/* Content */}
<main>
          <div className="outlet">
            {activeTab === "Dashboard" ? <Home /> : null}
            {activeTab === "Users" ? <Users /> : null}
            {activeTab === "Guitars" ? <Guitars /> : null}
            {activeTab === "Messages" ? <LiveChat /> : null}
          </div>
        </main>
      </div>
  
        </>
  );
};

export default Admin;

