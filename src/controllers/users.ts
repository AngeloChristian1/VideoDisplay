import express from 'express'
import {deleteUserById, getUserById, getUserBySessionToken, getUsers} from '../schema/users'

export const getAllUsers = async (req:express.Request, res:express.Response)=>{
    try{
        const users =await getUsers().select(' +authentication.password +authentication.sessionTokon');
        return res.status(200).json(users)
    }
    catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const getOneUserById = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const User =await getUserById(id);
        return res.status(200).send({message:"User retrieved successfully",data:User})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}
export const getOneUserByToken = async (req:express.Request, res:express.Response)=>{
    try{
        const {Token} = req.params;
        const User =await getUserBySessionToken(Token);
        return res.status(200).send({message:"User retrieved successfully",data:User})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}
export const deleteUser = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser)
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}

export const updateUser = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {name, phone, email} = req.body;
        const {role} = req.body;

        if(role){
            return res.status(400).send({message:"Invalid, can not change"})
        }

        if(!name && !phone && !email){
            return res.status(400).json({message:"Invalid, can not change with empty body"})
        }

        const user = await getUserById(id);

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        await user.save();
        return res.status(200).send({message:"  updated user", data: user});
    }catch(error){
        console.log(error)
        return res.status(400).send({error: error.message});
    }
}
