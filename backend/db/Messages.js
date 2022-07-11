const {
    client
} = require('./index');

async function createConversation({sender_id,receiver_id,message}) {
    try{
        const {
            rows :[created]
        } = await client.query(`
         INSERT INTO conversation
         (sender_id, receiver_id, message)
         VALUES ($1, $2, $3)
         RETURNING *
        `, [sender_id,receiver_id,message]);
    
        return created;
    }catch(error){
        throw error
    }
 
}

// Get msg
async function getConversations() {
    try{
        const {
            rows
        } = await client.query(`
           SELECT * FROM conversation;
          `);
        return rows;
    }catch(error){
        throw error
    }
  
}

// join Msg and Conversation
async function getConversationById(message_id){
    try{
        const { rows } = await client.query(`
         SELECT * FROM conversation
         WHERE sender_id=${message_id}
         ;
        `)
        return rows
    }catch(error){
     throw error
    }

}
// join Msg and Conversation
async function getAllConversations(){
    try{
        const { rows } = await client.query(`
        SELECT * FROM conversation
        JOIN users ON 
        conversation.sender_id = users.id;
        `)
        return rows
    }catch(error){
     throw error
    }

}

module.exports = {
    createConversation,
    getConversations,
    getAllConversations,
    getConversationById
}