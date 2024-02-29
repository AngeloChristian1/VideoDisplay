import express from 'express'

import { getAllBlogs, addBlog, deleteBlog, updateBlog, getOneBlogById } from '../controllers/blogs'

export default(router: express.Router)=>{
    router.post('/blogs/add', addBlog)
    router.get('/blogs', getAllBlogs)
    router.get('/blogs/:id',getOneBlogById )            
    router.delete('/blogs/delete/:id',deleteBlog )            
    router.patch('/blogs/update/:id',updateBlog )
}
  