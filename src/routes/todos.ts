import express from 'express'

import { getAllTodos, addTodo, deleteTodo, updateTodo } from '../controllers/todos'

export default(router: express.Router)=>{
    router.post('/todos/add', addTodo)
    router.get('/todos', getAllTodos)
    router.delete('/todos/delete/:id',deleteTodo )
    router.patch('/todos/update/:id',updateTodo )
}
  