import React, {useState} from 'react'
import {Button, Card, Modal} from "react-bootstrap";
import StarsRating from '../../guitarsFolder/StarsRating';

const View = ({guitar}) => {
  const [openModal,
    setOpenModal] = useState(false);
  function open() {
    setOpenModal(true);
  }
  function close() {
    setOpenModal(false);
  }

  const {
    id,
    brand_name,
    price,
    rating,
    image_url,
    description
  } = guitar

  return (
    <div>
      <Button id={id} onClick={open} variant="info">
        View
      </Button>

      {openModal
        ? <Modal id={id} show={open} onHide={close} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>
                View Guitar
              </Modal.Title>

            </Modal.Header>
            <Modal.Body>
              {/* input */}
              <Card>
                <Card.Img
                  variant="top"
                  src={image_url}
                  style={{
                  width: '200px',
                  margin: '0 auto'
                }}/>
                <Card.Body>
                  <Card.Title>{brand_name}</Card.Title>
                  <Card.Text>
                    {`${description.substring(0, 500)}...`}
                  </Card.Text>
                  <Card.Text>
                    <StarsRating numberOfStars={rating}/>
                  </Card.Text>
                  <Card.Text>
                    ${Math.round(price)}
                  </Card.Text>
                </Card.Body>
              </Card>

              <Modal.Footer>
                <Button variant="danger" onClick={close}>
                  Close
                </Button>

              </Modal.Footer>
            </Modal.Body>

          </Modal>
        : null}
    </div>
  )
}

export default View

// {openModal   ? <Modal       show={() => setOpenModal(true)}       onHide={()
// => setOpenModal(false)}       backdrop="static"       keyboard={false}>
// <Modal.Header closeButton>         <Modal.Title>           Guitar details
// </Modal.Title>       </Modal.Header>       <Modal.Body>         {/* Component
// */}         <getGuitarDetails/> <Modal.Footer></Modal.Footer> </Modal.Body>
// </Modal>   : null}