import React,{useState, useEffect} from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import Socket from './Socket'
const Chat = () => {

    
  const handleNewUserMessage = (message) => {
    Socket.emit("chat", {message});
  };
    useEffect(() => {
      Socket.on("chat", (message) => (
        addResponseMessage({...message})
      ));
      }, []);
    
//  const handleNewUserMessage = (newMessage) => {
//     socket.emit('chat', newMessage )
   
//   }
const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSeZc32CwtZTEtOUeBQrO92-Xo6F6gNLfr0w&usqp=CAU"
    return (

      <div className="">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={logo}
          title="My new awesome title"
          subtitle="And my cool subtitle"/>
      </div>
    ); 
}

export default Chat;

