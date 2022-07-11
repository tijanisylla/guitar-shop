import axios from 'axios';


export const getUsers = async () => {
const response = await axios.get('http://localhost:8000/users')
return {
    response
}
}
export const getConversationById = async (id) => {
const response = await axios.get(`http://localhost:8000/messages/${id}`)
}
export const createConversation = async () => {
const response = await axios.post(`http://localhost:8000/messages/`)
}
