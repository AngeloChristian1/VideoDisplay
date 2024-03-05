import express from 'express'
import {getLikeByUserId, getLikeByBlogId, createLike, getLike, getLikeById, deleteLikeById} from "../schema/likes"
import { getUserById } from '../schema/users';
import { getBlogById } from '../schema/blogs';

export const addLike = async (req: express.Request, res: express.Response) =>{
    try{
        const {userId, blogId, isLiked} = req.body;

        if(!userId || !blogId || isLiked == null){
            return res.status(400).send({Like: "All Fields are required"});
        }
        if(userId){
            let existingUser = await getUserById(userId);
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

        let blogLikedByUser = await getLikeByBlogId(blogId) ;
        
            let isThisBlogLiked =  blogLikedByUser.filter((com) => com.userId == userId)
            if(isThisBlogLiked.length > 0){
                let id = isThisBlogLiked.map((item)=> item._id)[0].toString()
                // let id = isThisBlogLiked._id.toString()
                 let deletedLike = await deleteLikeById(id);
                return res.status(400).send({message:"Like deleted", length:isThisBlogLiked.length})
            }
        
 
        const newLike = await createLike({userId, blogId, isLiked})

        return res.status(200).send({Message:"Like Added", like : newLike})
    } catch(error){
        console.log('error', error);
        return res.sendStatus(400);
    }
}


export const getAllLikes = async (req:express.Request, res:express.Response)=>{
    try{
        const Likes =await getLike();
        return res.status(200).json(Likes) 
    } 
    catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const getLikesByUserId = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Like =await getLikeByUserId(id);
        return res.status(200).send({Like:"Like retrieved successfully",data:Like})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({Like:"Error Occured"});
    }
}

export const getLikesByBlogId = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Like =await getLikeByBlogId(id);
        return res.status(200).send({Like:"Like retrieved successfully",data:Like})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({Like:"Error Occured"});
    }
}

export const getOneLikeById = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Like =await getLikeById(id);
        return res.status(200).send({Like:"Like retrieved successfully",data:Like})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({Like:"Error Occured"});
    }
}

export const deleteLike = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedLike = await deleteLikeById(id);

        return res.status(200).json(deletedLike)
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}


export const updateLike = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {isLiked} = req.body;

        if(isLiked == null){
            return res.sendStatus(400)
        }

        const Like = await getLikeById(id);

        Like.isLiked = isLiked;
        await Like.save();
        // return res.sendStatus(200).json(Like).end();
        return res.sendStatus(200);
    }catch(error){
        console.log(error)
        return res.sendStatus(400); 
    }
}
 