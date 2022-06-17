import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from 'axios';
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
const Delete = ({ user, data, setData}) => {
  const [openModal,   setOpenModal] = useState(false);
 

  const open = () => {
    setOpenModal(true);
  };
  const close = () => {
    setOpenModal(false);
  };

  async function deleteUser(id) {
    const response = await axios.delete(`http://localhost:8000/users/${id}`)
    if (response.status === 200) {
      console.log('user got delete ' + response.data);
      // Getting rid of the user with out re-freshing the page
      setData(data.filter(todo => todo.id !== id));
    } else {
      console.log('Operation failed!')
    };
  };

 const {id,username} = user;
 console.log(id)
  return (
    <div>
      <MDBBtn color="danger" onClick={open}>
        Delete
      </MDBBtn>

  {openModal ?
  <MDBModal show={openModal} setShow={setOpenModal} tabIndex='-1'>
    <MDBModalDialog size='sm'>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody style={{color : '#000'}} >
        <strong>Are you sure you want to delete: {username} ?</strong>
        </MDBModalBody>
        {/* Footer */}
        <MDBModalFooter>
            <MDBBtn color='danger' onClick={close}>
              Cancel
            </MDBBtn>
            <MDBBtn onClick={deleteUser(id)} color='success'>Confirm</MDBBtn>
          </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  :null}

    </div>
  )
};

export default Delete;
