import express from 'express'
import {getTodoByTitle, createTodo, getTodo, getTodoById, deleteTodoById} from "../schema/todos"

export const addTodo = async (req: express.Request, res: express.Response) =>{
    try{
        const {title, content, isDone, date} = req.body;

        if(!title || !content || isDone== null){
            return res.sendStatus(400);
        }

        const existingTodo = await getTodoByTitle(title)

        if(existingTodo){
            return res.sendStatus(400);
        }

        const todo = await createTodo({title, content, isDone, date})

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

export const updateTodo = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {title,content, isDone} = req.body;

        if(!title || !content){
            return res.status(400).send({message:"Fill All fields"});
        }

        const todo = await getTodoById(id);

        todo.title = title;
        todo.content = content;
        todo.isDone = isDone;
        await todo.save();
        // return res.sendStatus(200).json(todo).end();
        return res.status(200).send({message:"success", data:todo});
    }catch(error){
        // console.log(error)
        return res.status(400).send({message:"error", error:error}); 
    }
}
 