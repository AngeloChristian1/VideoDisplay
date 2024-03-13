import express from 'express'
import {deleteUserById, getUserById, getUserBySessionToken, getUsers} from '../schema/users'
import { cloudinary } from '../helpers/cloudinary'
import { Multer } from 'multer';
import {promises as fs} from 'fs'
import {join} from 'path'
import sharp from 'sharp'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'


interface CloudinaryFile extends Express.Multer.File {
    buffer: Buffer;
  }

interface MulterRequest extends Request {
    file: Express.Multer.File;
  }


export const getAllUsers = async (req:express.Request, res:express.Response)=>{
    try{
        const users =await getUsers().select(' +authentication.password +authentication.sessionTokon');
        return res.status(200).json(users)
    }
    catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
} 

export const getOneUserById = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const User = await getUserById(id);
        if(!User){
            return res.status(404).json({message:"user not Found"})
        }
        return res.status(200).send({message:"User retrieved successfully",data:User})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}
export const getOneUserByToken = async (req:express.Request, res:express.Response)=>{
    try{
        const {Token} = req.params;
        const User =await getUserBySessionToken(Token);
        return res.status(200).send({message:"User retrieved successfully",data:User})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}
export const deleteUser = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser)
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    } 
} 

export const updateUser = async (req:express.Request, res:express.Response)=>{

    try{
        console.log("update my body:", req.body)
        console.log("update my files", req.files)
        const {id} = req.params;
        const {name, phone, email} = req.body;
        const {role} = req.body;

        if(role){
            return res.status(400).send({message:"Invalid, can not change"})
        }

        if(!name && !phone && !email){
            return res.status(400).json({message:"Invalid, can not change with empty body"})
        }

        const user = await getUserById(id);

        
    if(!user){
        return res.status(404).send({message: "User not found"});
    }

    if(req.files){
        const files: CloudinaryFile[] = req.files as CloudinaryFile[];
  if (!files || files.length == 0 || files==null) {
    return res.status(400).send({message: "Please provide Image"});
  }

  const cloudinaryUrls: string[] = [];

  for (const file of files) {
    const resizedBuffer: Buffer = await sharp(file.buffer)
      .resize({ width: 1000, height: 800 })
      .toBuffer();

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'my-blog',
      } as any,
      (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (err) {
          console.error('Cloudinary upload error:', err);
          return res.send({error:err})
        }
        if (!result) {
          console.error('Cloudinary upload error: Result is undefined');
          return res.send(new Error('Cloudinary upload result is undefined'));
        }
        cloudinaryUrls.push(result.secure_url);

        if (cloudinaryUrls.length === files.length) {
          //All files processed now get your images here
          req.body.profile = cloudinaryUrls[0] || null;
          
          user.profile = cloudinaryUrls[0] || user.profile
          user.name = name || user.name;
          user.email = email || user.email;
          user.phone = phone || user.phone;

          const updatedUser =  user.save();
          return res.status(200).send({message:"  updated user", data: user});
        }
      }
    );
    uploadStream.end(resizedBuffer);
  }
  }


    }catch(error){
        console.log(error)
        return res.status(400).send({error: error.message});
    }
}
