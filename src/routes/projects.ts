import express from 'express'

import { getAllProjects, addProject, deleteProject, updateProject, getOneProjectById } from '../controllers/projects'

export default(router: express.Router)=>{
    router.post('/projects/add', addProject)
    router.get('/projects', getAllProjects)
    router.get('/projects/:id',getOneProjectById)  
    router.delete('/projects/delete/:id',deleteProject )
    router.patch('/projects/update/:id',updateProject )
}
  