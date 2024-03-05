import express from 'express'

import { getAllTodos, addTodo, deleteTodo, updateTodo, getOneTodoById } from '../controllers/todos'

export default(router: express.Router)=>{
    router.post('/todos/add', addTodo)
    router.get('/todos', getAllTodos)
    router.get('/todos/:id', getOneTodoById)
    router.delete('/todos/delete/:id',deleteTodo )
    router.patch('/todos/update/:id',updateTodo )
}
  