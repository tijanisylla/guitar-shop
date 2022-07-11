import React, {useState, useRef, useEffect} from 'react'
import Socket from '../Live-chat/Socket'
import Conversation from './Conversation'
import FooterInput from './FooterInput'
import HeaderBody from './HeaderBody'
function content({data,toggle, isOpen, activeTab, setActiveTab,selected,setSelected}) {
  const [message,setMessage] = useState("");
  const [messages, setMessages] = useState([{ message  }]);
  
  Socket.on("chat", (message) => setMessages([
    ...messages,
    message
  ]));

  const addMessage = () => {
    const send = {
      message
    };
    setMessages([ ...messages,  send ]);
    Socket.emit("chat", send);
    setMessage("");
  };

    const name = "admin"
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if(name === trimmedName) {
      isSentByCurrentUser = true;
    }

  return ( 
  <React.Fragment>
   {/* Messages */}
 
  <div className = "col-md-8 col-xl-6 chat">
  <div className="card">
{/* Header body */}
 <HeaderBody
 data={data}
 isOpen={isOpen}
 toggle={toggle}
 setSelected={setSelected}
  />
  {/*================ Message container ================*/}
  <Conversation
   message={message} 
   messages={messages} 
   isSentByCurrentUser={isSentByCurrentUser}
   selected={selected}
   setSelected={setSelected}
   />

    {/* Footer */}
  <FooterInput 
   message={message} 
   addMessage={addMessage}
   setMessage={setMessage}
   selected={selected}
   setSelected={setSelected}
   />
  </div> 
  
  </div>
     </React.Fragment>)
}

export default content