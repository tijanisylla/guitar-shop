import React from 'react'
import { Navigate } from "react-router-dom";

function CardBody({activeTab, data, setActiveTab, setSelected,selected}) {

  return (
    <React.Fragment>

      <div className="card-body contacts_body">
        {data.map((i, idx) => (
          <ui className="contacts" key={idx}>
            <li
              className={activeTab === i.username
              ? 'active'
              : null}
              onClick={() => setActiveTab(i.username) && console.log('SELECTED', setSelected(i.id)) }>
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img src={i.image} className="rounded-circle user_img"/>
                  <span className="online_icon"/>
                </div>
                <div className="user_info">
                  <span>{i.username}</span>
                  <p>{i.username}{" "}is online</p>
                </div>
              </div>
            </li>
          </ui>
        ))}
      </div>
    </React.Fragment>
  )
}

export default CardBody