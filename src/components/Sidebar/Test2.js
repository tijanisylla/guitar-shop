import React, { useState, useEffect } from "react";
import "./Sidebar2.css";
import Content from "./content";
import Socket from '../Live-chat/Socket'
import CardBody from "./CardBody";
import axios from "axios";
import  HeaderBody from "./HeaderBody";
const Test2 = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  const [conversationId, setConversationId] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined)
  const [messages, setMessages] = useState([
    {
      message,
    },
  ]);

  Socket.on("chat", (message) => setMessages([...messages, message]));

  const addMessage = () => {
    const send = { message };
    setMessages([...messages, send]);
    Socket.emit("chat", send);
    setMessage("");
  };

  useEffect(async () => {
 if(!localStorage.getItem('User')){
  console.log('User')
 }else{
  setCurrentUser(await localStorage.getItem('User'))
 }
  },[])
  // const name = "admin";
  // let isSentByCurrentUser = false;
  // const trimmedName = name.trim().toLowerCase();
  // if (name === trimmedName) {
  //   isSentByCurrentUser = true;
  // }
  // USERS
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    };
    getUsers();
  }, []);
// MESSAGE ID
  useEffect(() => {
    const getConversationById = async (id) => {
      const response = await axios.get(`http://localhost:8000/users/${id}}`);
      setConversationId(response.data);
      getConversationById();
    };
  }, []);
// ALL MESSAGES
  useEffect(() => {
    const getConversation = async () => {
      const response = await axios.get(`http://localhost:8000/messages`);
      console.log(response.data)
      setConversations(response.data);
    };
    getConversation()
  }, []);
console.log('ALL MESSAGES',conversations)

  return(
    <div className="test2">
      {/* Chat container */}

      <div className="container-fluid h-100">
        <div className="row justify-content-center h-100">
          <div className="col-md- col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
              <div className="card-header">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search..."
                    name
                    className="form-control search"
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text search_btn">
                      <i className="fas fa-search" />
                    </span>
                  </div>
                </div>
              </div>
              {/* Card body */}
              {/* <CardBody
               activeTab={activeTab}
               data={users}
               selected={selected}
               setSelected={setSelected}
              setActiveTab={setActiveTab}/> */}
              <div className="card-body contacts_body">
                {users.map((i, idx) =>   (
                  <>
                  <ui className="contacts" key={idx}>
                    <li
                      className={activeTab === i.username ? "active" : null}
                      onClick={() =>
                      setActiveTab(i.username)
                    
                      }
                    >
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img
                            src={i.image}
                            className="rounded-circle user_img"
                          />
                  
                          <span className="online_icon" />
                        </div>
                        <div className="user_info">
                          <span>{i.username}</span>
                          <p>{i.username} is online</p>
                        </div>
                      </div>
                    </li>
                  </ui>
                  </>
                ))}
              </div>
            </div>
          </div>
          {/* Messages */}
          {/* <Content
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            toggle={toggle}
            data={users}
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}/> */}
           <div className="col-md-8 col-xl-6 chat">
            <div className="card">
              {/* Header body */}
  {/* <HeaderBody
 data={users}
 isOpen={isOpen}
 toggle={toggle}
 setSelected={setSelected}
          /> */}
           <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img
                      src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                      className="rounded-circle user_img"
                    />
                    <span className="online_icon" />
                  </div>
                  <div className="user_info">
                    <span>Chat with User</span>
                    <p>1767 Messages</p>
                  </div>
                </div>
                <span id="action_menu_btn" onClick={toggle}>
                  <i className="fas fa-ellipsis-v" />
                </span>

                {isOpen ? (
                  <div className="action_menu">
                    <ul>
                      <li>
                        <i className="fas fa-user-circle" />
                        View profile
                      </li>
                      <li>
                        <i className="fas fa-users" />
                        Add to close friends
                      </li>
                      <li>
                        <i className="fas fa-plus" />
                        Add to group
                      </li>
                      <li>
                        <i className="fas fa-ban" />
                        Block
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
              {/*================ Message container ================*/}
              {/* <Conversation
   message={message}
   messages={messages}
   isSentByCurrentUser={isSentByCurrentUser}
   selected={selected}
   setSelected={setSelected}
   /> */}

              <div className="card-body msg_card_body">
                {/* Check if your are the current user ? justify-content-start : justify-content-end */}

                 {
                   messages.map((item, idx) => (
                    <>
                      <div
                        className="d-flex justify-content-start mb-4"
                        key={idx}
                      >
                        <div className="img_cont_msg">
                          <img
                            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                            className="rounded-circle user_img_msg"
                          />
                        </div>
                        <div className="msg_cotainer">
                          {item.message}
                          <span className="msg_time">8:40 AM, Today</span>
                        </div>
                      </div>
           
                      <div
                        className="d-flex justify-content-end mb-4"
                        key={idx}
                      >
                        <div className="msg_cotainer_send">
                          {item.message}
                          <span className="msg_time_send">8:55 AM, Today</span>
                        </div>
                        <div className="img_cont_msg">
                          <img
                            src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"
                            className="rounded-circle user_img_msg"
                          />
                        </div>
                      </div>
                      </>
                      ))}
              </div>

              {/* Footer */}
              {/* <FooterInput
   message={message}
   addMessage={addMessage}
   setMessage={setMessage}
   selected={selected}
   setSelected={setSelected}
   /> */}
              <div className="card-footer">
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text attach_btn">
                      <i className="fas fa-paperclip" />
                    </span>
                  </div>
                  {/* form */}

                  <textarea
                    name="message"
                    className="form-control type_msg"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" ? addMessage(e) : null
                    }
                  />

                  <div className="input-group-append">
                    <span
                      className="input-group-text send_btn"
                      onClick={() => addMessage()}
                    >
                      <i className="fas fa-location-arrow" />
                    </span>
                  </div>
                  {/* <button onClick={() => addMessage()} className="btn btn-primary">Send Message</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test2;
