import express from 'express'

import { getAllTodos, addTodo, deleteTodo, updateTodo, getOneTodoById, completeTodo, getTodosByUserId } from '../controllers/todos'
import {  checkOwnership, checkAdminship, isLoggedIn } from '../middlewares'
import { extractToken } from '../middlewares/jwt_config'
import { changeUserPassword } from '../controllers/authentication'

export default(router: express.Router)=>{
    router.post('/todos/add', addTodo)
    router.get('/todos', getAllTodos)
    // router.get('/todos/:id', getOneTodoById)
    router.get('/todos/users/:id',getTodosByUserId) 
    router.get('/todos/:id',getTodosByUserId) 
    router.delete('/todos/delete/:id',deleteTodo )
    router.patch('/todos/update/:id', updateTodo )
    router.patch('/todos/complete/:id', completeTodo )
}
  