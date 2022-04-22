import {useState} from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Toast,
  Modal
} from 'react-bootstrap';
import Cart from '../Cart/Cart';
import {Link} from 'react-router-dom';
import './Style/Navigation.css';
import axios from 'axios';
const NavigationBar = ({loggedIn, logOut}) => {
  const userName = localStorage.getItem('User');
  const [openModal, setOpenModal] = useState(false);
   
  return (
    <header>
      <div className="nav-bar">
        {openModal
          ? <Modal
              show={() => setOpenModal(true)}
              onHide={() => setOpenModal(false)}
              backdrop="static"
              keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Cart :
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
        {/* Component */}
                <Cart/>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger"
                onClick={() =>
                setOpenModal(false)}>
                  Close
                </Button>
                <Button variant="success">
                  Check-out
                </Button>
              </Modal.Footer>
            </Modal>
          : null}
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
                  HOME
                </Nav.Link>
                <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
                <Nav.Link as={Link} to="/contact-us">CONTACT</Nav.Link>
                <div className="cart-container-icon">
                  <span className="cart-icon">
                    <i className="fa-solid fa-cart-shopping" onClick={() => setOpenModal(true)}></i>
                  </span>
                  {/* Length */}
                  <span>10</span>
                </div>
              </Nav>
              <Navbar.Brand href="#">
                {!loggedIn
                  ? <Button variant="dark" as={Link} to="/login">
                      LOGIN/REGISTER
                    </Button>
                  : null}

                {loggedIn
                  ? <Button variant="danger" onClick={logOut}>
                      <i className="fa fa-right-from-bracket me-2"></i>
                      Log-out

                    </Button>
                  : null}
              </Navbar.Brand>
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </div>
    </header>
  )
}

export default NavigationBar