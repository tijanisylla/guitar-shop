import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
const HeaderBody = ({isOpen, toggle, data, selected}) => {
  const [x, setX] = useState([])

  return (
    <React.Fragment>
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
              src=""
              className="rounded-circle user_img"/>
            <span className="online_icon"/>
          </div>
          <div className="user_info">
            <span>Chat with  : User</span>
            <p>1767 Messages</p>
          </div>
        </div>
        <span id="action_menu_btn" onClick={toggle}>
          <i className="fas fa-ellipsis-v"/>
        </span>

        {isOpen
          ? <div className="action_menu">
              <ul>
                <li><i className="fas fa-user-circle"/>
                  View profile</li>
                <li><i className="fas fa-users"/>
                  Add to close friends</li>
                <li><i className="fas fa-plus"/>
                  Add to group</li>
                <li><i className="fas fa-ban"/>
                  Block</li>
              </ul>
            </div>
          : null}

      </div>
    </React.Fragment>
  )
}

export default HeaderBody