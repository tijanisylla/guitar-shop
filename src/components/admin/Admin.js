import React from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Route, Redirect} from 'react-router-dom';
import './Style/Admin.css'
import authProvider from './authProvider'
import Users from './Users'
const Admin = () => {
  return (
    <div className="admin-container">
      {/* <h1>AdminOnly</h1> */}
      <header
        style={{
        backgroundColor: '#000',
        textAlign: 'center',
        color: 'white'
      }}>
        <h3>Admin : </h3>
       
      </header>
      <Tabs>
        <TabList>
        <Tab>
            <p>
              <i className="fa fa-home me-2"></i>
              Home
            </p>
          </Tab>
          <Tab>
            <p>
              <i className="fa fa-user me-2"></i>
              Users
            </p>
          </Tab>
          <Tab>
            <p>
              <i className="fa fa-guitar me-2"></i>
              Guitars</p>
          </Tab>
          <Tab>
            <p>
              <i className="fa fa-money-check-dollar me-2"></i>
              Payments</p>
          </Tab>
          <Tab>
            <p>
              <i className="fa fa-bags-shopping me-2"></i>
              Orders</p>
          </Tab>
          <Tab>
            <p>
              <i className="fa fa-truck me-2"></i>
              Status
            </p>
          </Tab>
      
        </TabList>
        <TabPanel>
          <div className="panel-content">
            <h2>Home</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            {/* Users */}
            <Users/>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 2</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 3</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 4</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 5</h2>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default Admin;