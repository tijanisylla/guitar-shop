import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from 'axios';

const Delete = ({guitar, data, setData}) => {
  const [openModal,
    setOpenModal] = useState(false);
  const open = () => {
    setOpenModal(true);
  }
  const close = () => {
    setOpenModal(false);
  }
  async function deleteUser(id) {
    const response = await axios.delete(`http://localhost:8000/guitarsAll/${id}`)
    if (response.status === 200) {
      console.log('user got delete ' + response.data);
      // Getting rid of the user with out re-freshing the page
      setData(data.filter(todo => todo.id !== id));
    } else {
      console.log('Operation failed!')
    };
  };
  const {id} = guitar;

  return (
    <div>
      <Button  variant="danger" onClick={open}>
        Delete
      </Button>
     
               
      {openModal

        ? 
       
        <Modal 
        style={{padding : '20px'}}
        id={id} show={open} onHide={close} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>
                Are you sure want to take this action?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{ textAlign : 'center'}}>
              <Button 
              style={{margin: '20px', width : '100px'}}
              onClick={() => deleteUser(id)} variant="success">
                Confirm
              </Button>
              
              <Button 
              style={{margin : '10px', width : '100px'}}
              onClick={close} variant="danger">
                Cancel
              </Button>
              </div>
            </Modal.Body>
          </Modal>
         
        : null}

    </div>
  )
};

export default Delete;
