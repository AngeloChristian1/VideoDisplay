import express from 'express'
import {getTodoByTitle, createTodo, getTodo, getTodoById, deleteTodoById, getTodoByUserId} from "../schema/todos"
import { getUserById } from '../schema/users';

export const addTodo = async (req: express.Request, res: express.Response) =>{
    try{
        
        const {title, content, isDone, date, userId} = req.body;
        let userInfo = JSON.stringify(req.userInfo)||null;
        let userInfoId = JSON.parse(userInfo)?._id;

        if(userId != null || userId !== undefined || userId !=""){
            userInfoId = userId
        }

        if(!title){
            return res.status(400).json({message:"Invalid, fill in all fields"});
        }
        if(!userInfoId){
            return res.status(404).send({message:"No user Id provided"})
        }

        if(userInfoId){
            let existingUser = await getUserById(userInfoId);
            if(!existingUser){
                return res.status(404).send({message:"User Not Found"})
            } 
        }

        const todo = await createTodo({title, content, isDone, date, userId: userInfoId})

        return res.status(200).json(todo).end()
    } catch(error){
        console.log('error', error);
        return res.sendStatus(400);
    }
}


export const getAllTodos = async (req:express.Request, res:express.Response)=>{
    try{
        const todos =await getTodo();
        return res.status(200).json(todos)
    } 
    catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const getTodosByUserId = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Todos =await getTodoByUserId(id);
        return res.status(200).send({Todos:"Todos retrieved successfully",data:Todos})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({Like:"Error Occured"});
    }
}

export const deleteTodo = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedTodo = await deleteTodoById(id);

        return res.json(deletedTodo)
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}

export const getOneTodoById = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Todo =await getTodoById(id);
        return res.status(200).send({message:"Todo retrieved successfully",data:Todo})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}

export const completeTodo = async (req:express.Request, res:express.Response)=>{
    try{
        console.log("mybody", req.body)
        const {id} = req.params;
        let {title,content, isDone, priority} = req.body;
        

        if(!title && !content && !isDone && !priority){
            return res.status(400).send({message:"Fill All fields"});
        }

        if(isDone =="true"){
            isDone= true
            console.log("isdone is true", typeof isDone, isDone);
        }
        if(isDone =="false"){
            isDone = false
            console.log("isdone is false", typeof isDone, isDone);

        }
        const todo = await getTodoById(id);

        todo.title = title || todo.title;
        todo.content = content || todo.content;
        todo.isDone = isDone? true : false;
        todo.priority = priority || todo.priority; 
        await todo.save(); 
        // return res.sendStatus(200).json(todo).end();
        return res.status(200).send({message:"success", data:todo});
    }catch(error){
        // console.log(error)
        return res.status(400).send({message:"error", error:error}); 
    }
}

export const updateTodo = async (req:express.Request, res:express.Response)=>{
    try{
        console.log("mybody", req.body)
        const {id} = req.params;
        let {title,content, isDone, priority} = req.body;
        

        if(!title && !content && !isDone && !priority){
            return res.status(400).send({message:"Fill All fields"});
        }

        const todo = await getTodoById(id);

        todo.title = title || todo.title;
        todo.content = content || todo.content;
        todo.isDone = isDone || todo.isDone;
        todo.priority = priority || todo.priority; 
        await todo.save(); 
        // return res.sendStatus(200).json(todo).end();
        return res.status(200).send({message:"success", data:todo});
    }catch(error){
        // console.log(error)
        return res.status(400).send({message:"error", error:error}); 
    }
}
 