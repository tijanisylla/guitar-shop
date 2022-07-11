import React, { useState } from 'react';
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function App() {
  const [bottomModal, setBottomModal] = useState(false);

  const toggleShow = () => setBottomModal(!bottomModal);

  return (
    <>
      <MDBBtn onClick={toggleShow}>Launch frame modal</MDBBtn>

      <MDBModal
        animationDirection='bottom'
        show={bottomModal}
        tabIndex='-1'
        setShow={setBottomModal}
      >
        <MDBModalDialog position='bottom' frame>
          <MDBModalContent>
            <MDBModalBody className='py-1'>
              <div className='d-flex justify-content-center align-items-center my-3'>
                <p className='mb-0'>We use cookies to improve your website experience</p>
                <MDBBtn color='success' size='sm' className='ms-2' onClick={toggleShow}>
                  Ok, thanks
                </MDBBtn>

              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}