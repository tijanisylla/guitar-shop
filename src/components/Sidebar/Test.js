import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cart from '../Cart/Cart'
function Test() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
      cart
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement='end' responsive='md' style={{width : 90 + '%'}} >
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <Cart/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default Test