import express from 'express'
import {getCommentByUserId, getCommentByBlogId, createComment, getComment, getCommentById, deleteCommentById} from "../schema/comments"
import { getUserById } from '../schema/users';
import { getBlogById } from '../schema/blogs';

export const addComment = async (req: express.Request, res: express.Response) =>{
    try{
        const { blogId, content} = req.body;
        const userInfo = JSON.stringify(req.userInfo);
        const userInfoId = JSON.parse(userInfo)._id;

        if(!userInfo){
            return res.status(401).send({message:"Invalid token"});
        }
        if( !blogId || !content){
            return res.status(400).send({Comment: "All Fields are required"});
        }
        if(userInfoId){
            let existingUser = await getUserById(userInfoId);
            if(!existingUser){
                return res.status(404).send({message:"User Not Found"})
            }
        }
        if(blogId){
            let existingBlog = await getBlogById(blogId);
            if(!existingBlog){
                return res.status(404).send({message:"Blog Not Found"})
            }
        }
 
        const newComment = await createComment({userId:userInfoId, blogId, content})

        return res.status(200).send({Comment:"success", data:newComment})
    } catch(error){
        console.log('error', error);
        return res.status(400).send({message:"Error creating comment", error:error});
    }
}


export const getAllComments = async (req:express.Request, res:express.Response)=>{
    try{
        const Comments =await getComment();
        return res.status(200).json(Comments)
    } 
    catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const getCommentsByUserId = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        let blogComments:any = []
        const Comments =await getCommentByUserId(id);
        Comments.map((comment , index)=>{
            //  blogComments = getBlogById(toString(comment.blogId))
        })
        return res.status(200).send({Comment:"Comments by userId retrieved successfully",data:Comments, blogComments:blogComments})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({Comment:"Error Occured"});
    }
}

export const getCommentsByBlogId = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Comment =await getCommentByBlogId(id);
        return res.status(200).send({Comment:"Comment retrieved successfully",data:Comment})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({Comment:"Error Occured"});
    }
}

export const getOneCommentById = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Comment =await getCommentById(id);
        return res.status(200).send({Comment:"Comment retrieved successfully",data:Comment})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({Comment:"Error Occured"});
    }
}

export const deleteComment = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedComment = await deleteCommentById(id);

        return res.status(200).json(deletedComment)
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}


export const updateComment = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {content} = req.body;

        if(!content){
            return res.sendStatus(400)
        }

        const Comment = await getCommentById(id);

        Comment.content = content;
        await Comment.save();
        // return res.sendStatus(200).json(Comment).end();
        return res.sendStatus(200);
    }catch(error){
        console.log(error)
        return res.sendStatus(400); 
    }
}
 