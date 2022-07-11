import React from 'react'
const Conversation = ({isSentByCurrentUser, name, message, messages}) => {

  return (
  
    <div className="card-body msg_card_body">
      {/* Check if your are the current user ? justify-content-start : justify-content-end */}
      {isSentByCurrentUser
        ? messages.map((item, idx) => (
          <div className="d-flex justify-content-start mb-4" key={idx}>
            <div className="img_cont_msg">
              <img
                src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                className="rounded-circle user_img_msg"/>
            </div>
            <div className="msg_cotainer">
              {item.message}
              <span className="msg_time">8:40 AM, Today</span>
            </div>
          </div>

        ))
        : messages.map((item, idx) => (

          <div className="d-flex justify-content-end mb-4" key={idx}>
            <div className="msg_cotainer_send">
              {item.message}
              <span className="msg_time_send">8:55 AM, Today</span>
            </div>
            <div className="img_cont_msg">
              <img
                src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"
                className="rounded-circle user_img_msg"/>
            </div>
          </div>
        ))
}
    </div>
  )
}
export default Conversation