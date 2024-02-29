import express from 'express'
import {getUserById, getUsers} from '../schema/users'

export const getAllUsers = async (req:express.Request, res:express.Response)=>{
    try{
        const users =await getUsers();
        return res.status(200).json(users)
    }
    catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedUser = await getUserById(id);

        return res.json(deletedUser)
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}

export const updateUser = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {name} = req.body;

        if(!name){
            return res.sendStatus(400)
        }

        const user = await getUserById(id);

        user.name = name;
        await user.save();
        return res.sendStatus(200);
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}
