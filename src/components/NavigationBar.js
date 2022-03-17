import React from 'react';
import {Navbar, Nav ,Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
const NavigationBar = () => {
  const styled = {
    backgroundImage: "url(" + "https://www.desktopbackground.org/p/2010/05/01/10629_guitar-acoustic-wallpaper-black-and-brown-acoustic-guitars-wallpaper-guitar-acoustic-wallpapers-hd-desktop-203-wallpaper-download-beautiful-jpg_1280x800_h.jpg" + ")",
    height: '300px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
	  color: 'white',
	  fontSize: '15px',
    backgroundRepeat: 'no-repeat',
 
 
  

  }
  
  return (
    <div className="nav-bar">
      <Navbar variant={"dark"} expand="lg" style={styled}>
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
              <Nav.Link  as={Link} to="/sign-up">SIGN-UP</Nav.Link>
              <Nav.Link  as={Link} to="/contact-us">CONTACT</Nav.Link>
              <Nav.Link  as={Link} to="/service">SERVICES</Nav.Link>  
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
  )
}

export default NavigationBar