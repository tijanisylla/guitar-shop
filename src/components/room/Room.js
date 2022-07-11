import React from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList,Avatar, Message,MessageInput,Conversation } from '@chatscope/chat-ui-kit-react';


const  Room = () => { 

return(
<div style={{ position:"relative", height: "500px" }}>
  <MainContainer>
    <ChatContainer>       
      <MessageList>
      <Conversation lastSenderName="You" name="Emily" info="Yes, i can do it for you">
          <Avatar  name="Emily" status="available" />
        </Conversation>
        <Message model={{
                 message: "Hello my friend",
                 sentTime: "just now",
                 sender: "Joe"
                 }} />
    
        </MessageList>
      <MessageInput placeholder="Type message here" />        
    </ChatContainer>
  </MainContainer>
</div>
)
                }
export default Room   
