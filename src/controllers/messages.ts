import express from 'express'
import {getMessageByEmail, createMessage, getMessage, getMessageById, deleteMessageById} from "../schema/message"

export const addMessage = async (req: express.Request, res: express.Response) =>{
    try{
        const {name, email, message, phone} = req.body;

        if(!email || !message || !message || !phone){
            return res.status(400).send({message: "All Fields are required"});
        }

        const existingMessage = await getMessageByEmail(email)

        const newMessage = await createMessage({email, name, message, phone})

        return res.status(200).send({message:"success", data:newMessage})
    } catch(error){
        console.log('error', error);
        return res.sendStatus(400);
    }
}


export const getAllMessages = async (req:express.Request, res:express.Response)=>{
    try{
        const Messages =await getMessage();
        return res.status(200).json(Messages)
    } 
    catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const getOneMessageById = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Message =await getMessageById(id);
        return res.status(200).send({message:"Message retrieved successfully",data:Message})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}

export const deleteMessage = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedMessage = await deleteMessageById(id);

        return res.status(200).json(deletedMessage)
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}


export const updateMessage = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {email,message} = req.body;

        if(!email || !message){
            return res.sendStatus(400)
        }

        const Message = await getMessageById(id);

        Message.email = email;
        Message.message = message;
        await Message.save();
        // return res.sendStatus(200).json(Message).end();
        return res.sendStatus(200);
    }catch(error){
        console.log(error)
        return res.sendStatus(400); 
    }
}
 