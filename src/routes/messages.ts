import express from 'express'

import { getAllMessages, addMessage, deleteMessage, updateMessage, getOneMessageById } from '../controllers/messages'

export default(router: express.Router)=>{
    router.post('/messages/add', addMessage)
    router.get('/messages', getAllMessages)
    router.get('/messages/:id',getOneMessageById )  
    router.delete('/messages/delete/:id',deleteMessage )
    router.patch('/messages/update/:id',updateMessage )
}
  