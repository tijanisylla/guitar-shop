import React from 'react'

 const FooterInput = ({message,setMessage,addMessage,}) => {
  return (
    <>
      <div className="card-footer">
      <div className="input-group">
        <div className="input-group-append">
          <span className="input-group-text attach_btn"><i className="fas fa-paperclip"/></span>
        </div>
        {/* form */}

        <textarea
          name="message"
          className="form-control type_msg"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? addMessage(e) : null}
          />
          
        <div className="input-group-append">
          <span className="input-group-text send_btn" onClick={() => addMessage()}><i className="fas fa-location-arrow" /></span>

        </div>
        {/* <button onClick={() => addMessage()} className="btn btn-primary">Send Message</button> */}

      </div>
    </div>
    </>
  )
}
export default FooterInput
