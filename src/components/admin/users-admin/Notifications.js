import React from "react";
import { MDBBadge, MDBContainer, MDBBtn,MDBIcon } from "mdbreact";

const Notifications = () => {
  return (
    <MDBContainer>
      <MDBBtn color="primary">
      <MDBBadge color="orange">
        <MDBIcon fab icon="btc" size="2x" />
      </MDBBadge>
       <MDBBadge color="danger" className="ml-2">9</MDBBadge>
        <span className="sr-only">unread messages</span>
      </MDBBtn>
    </MDBContainer>
  );
};

export default Notifications;
