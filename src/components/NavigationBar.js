import React, {useState} from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Toast
} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './Style/Navigation.css'

const NavigationBar = ({loggedIn, logOut}) => {
  const [filterInput,
    setFilterInput] = useState("");

  const handleFilterChange = e => {
    const value = e.target.value;
    setFilterInput(value);
  };

  const userName = localStorage.getItem('User');
  
  return (
    <header>
      <div className="nav-bar">
        {/* fixed="top" */}
        <Navbar bg="light" expand="md">
          <Container fluid>
            
          <Navbar.Brand href="#">
              {userName}
            </Navbar.Brand> 
            
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-3"
                style={{
                maxHeight: '100px'
              }}
                navbarScroll>
                <Nav.Link as={Link} to="/">
                  HOME</Nav.Link>
                <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
                <Nav.Link as={Link} to="/contact-us">CONTACT</Nav.Link>
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i>
                </Nav.Link>
              </Nav>

              <Navbar.Brand href="#">
                {!loggedIn
                  ? <Button variant="dark" as={Link} to="/login">
                      LOGIN/REGISTER
                      
                      </Button>
                  : null}

                
                {loggedIn ?
                
                   <Button 
                    variant="danger"
                    onClick={logOut}>
                    <i className="fa fa-right-from-bracket me-2"></i>
                    Log-out
              
                    </Button>
                   : null}
              </Navbar.Brand>

              <Form className="d-flex">
                <FormControl
                  type="search"
                  value={filterInput}
                  onChange={handleFilterChange}
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"/>
                <Button variant="outline-dark">Search...</Button>
              </Form>

            </Navbar.Collapse>

          </Container>
        </Navbar>
      </div>
    </header>
  )
}

export default NavigationBar