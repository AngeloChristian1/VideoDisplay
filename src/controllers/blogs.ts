import express from 'express'
import {getBlogByTitle, createBlog, getBlog, getBlogById, deleteBlogById} from "../schema/blogs"

export const addBlog = async (req: express.Request, res: express.Response) =>{
    try{
        const {poster,title,subtitle, category, content, timeToRead, date, time, editor, views, likes, comments } = req.body;

        if(!poster || !title || !content || !subtitle || !category || !content){
            return res.sendStatus(400);
        }

        const existingBlog = await getBlogByTitle(title)

        if(existingBlog){
            return res.sendStatus(400);
        }

        const Blog = await createBlog({poster,title,subtitle, category, content, timeToRead, date, time, editor, views, likes, comments })

        return res.status(200).send({status:"success", data:Blog})
    } catch(error){
        console.log('error', error);
        return res.sendStatus(400);
    }
}


export const getAllBlogs = async (req:express.Request, res:express.Response)=>{
    try{
        const Blogs =await getBlog();
        return res.status(200).json(Blogs)
    } 
    catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const getOneBlogById = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Blog =await getBlogById(id);
        return res.status(200).send({message:"Blog retrieved successfully",data:Blog})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}

export const deleteBlog = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedBlog = await deleteBlogById(id);

        return res.json(deletedBlog)
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}


export const updateBlog = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {poster,title,subtitle, category, content, timeToRead, date, time, editor, views, likes, comments } = req.body;

        if(!poster || !title || !content || !subtitle || !category || !content){
            return res.sendStatus(400);
        }

        let Blog = await getBlogById(id);

        if (!Blog) {
            return res.sendStatus(404);
        }

        Blog.poster = poster;
        Blog.title = title;
        Blog.category = category;
        Blog.content = content;
        Blog.timeToRead = timeToRead;
        Blog.views = views;
        Blog.likes = likes;
        Blog.comments = comments;
        Blog.subtitle= subtitle;

        const updatedBlog = await Blog.save();
        // return res.sendStatus(200).json(Blog).end();
        return res.status(200).send({status:"success", data: updatedBlog});

    }catch(error){
        console.log(error)
        return res.sendStatus(400); 
    }
}
 