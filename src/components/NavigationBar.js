import React from 'react';
import {Navbar, Nav ,Container, Form, FormControl, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import '../Style/Navigation.css'
const NavigationBar = () => {
  
  return (
    <header>
    <div className="nav-bar">
      <Navbar variant={"dark"} expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{
              maxHeight: '100px',
              
            }}
              navbarScroll>
              <Nav.Link as={Link} to="/"> HOME</Nav.Link>
              <Nav.Link  as={Link} to="/about">ABOUT</Nav.Link>
              <Nav.Link  as={Link} to="/contact-us">CONTACT</Nav.Link>
              <Nav.Link  as={Link} to="/login">LOGIN</Nav.Link>
              <Nav.Link  as={Link} to="/signup">SIGN-UP</Nav.Link> 
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"/>
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    </header>
  )
}

export default NavigationBar