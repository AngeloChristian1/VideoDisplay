import express from 'express'

import {deleteUser, getAllUsers, updateUser} from "../controllers/users"
import { isAuthenticated, isOwner } from '../middlewares'

export default(router: express.Router)=>{
    // router.get('/users',isAuthenticated, getAllUsers)
    router.get('/users', getAllUsers)
    router.patch('/users/update/:id',isAuthenticated, isOwner, updateUser)
    router.delete('/users/delete/:id', isAuthenticated, isOwner, deleteUser )
} 
  
