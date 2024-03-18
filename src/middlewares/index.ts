import express from 'express'
import {get, merge} from 'lodash'
import { getUserById } from '../schema/users'

import {getUserBySessionToken} from '../schema/users'
 
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{
        const sessionToken = req.cookies['USER-AUTH'];
        
        if(!sessionToken){
            return res.status(403).send({message: "You are not logged in."});
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser){
            return res.status(403).send({message: "You are not logged in."});
        }
        
        merge(req, {identity: existingUser})
        return next()

    }catch(error){
        console.log(error)
        return res.status(400).send({message:"Error authenticating user"});
    }
}

export const isOwner =  async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{

        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        const thisUser =await getUserById(id)
        if(!currentUserId ){
            return res.status(403).send({message:"You don't have access to this resource beacuase there is no id"});
        }

        if (currentUserId.toString() !== id){
            return res.status(403).send({message:"You don't have access to this resource because id are different from the current user"});
        }

        next();
    }catch(error){
        console.log(error)
        return res.status(400).send({message:"Error occured"});
    }
}

export const isAdmin =  async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{

        const sessionToken = req.cookies['USER-AUTH'];

        if(!sessionToken){
            return res.status(403).send({message:"You don't have access to this resource"});
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser || existingUser.role!=='admin'){
            return res.status(403).send({message:"You don't have access to this resource", existingUser: existingUser, sessionToken: sessionToken});
        }else{
            next()
        }
    }catch(error){
        console.log(error)
        return res.status(400).send({message:"Error occured"});
    }
}

export const checkOwnership =  async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{
        const {id} = req.params;
        const userInfo = JSON.stringify(req.userInfo)
        
        const currentUserId = get(req, 'identity') ;

        if(!userInfo){
            return res.status(403).send({message:"You don't have access to this resource beacuse no token"});
        }
        let userInfoId = JSON.parse(userInfo)._id
        const existingUser = await getUserById(userInfoId)

        if(!existingUser){
            return res.status(403).send({message:"You don't have access to this resource , token not registered", existingUser: existingUser, currentUserId: currentUserId});
        }
        if(existingUser._id.toString() != id){
            return res.status(401).send({message:"You don't have access to this resource , id don't match"})
        }else{
            next()
        }
    }catch(error){
        console.log(error)
        return res.status(400).send({message:"Error occured"});
    }
}

export const checkAdminship =  async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{
        
        const userInfo = JSON.stringify(req.userInfo)
        
        const currentUserId = get(req, 'identity') ;

        if(!userInfo){
            return res.status(403).send({message:"You don't have access to this resource beacuse no token"});
        }
        let userInfoId = JSON.parse(userInfo)._id
        const existingUser = await getUserById(userInfoId)

        if(!existingUser){
            return res.status(403).send({message:"You don't have access to this resource", existingUser: existingUser, currentUserId: currentUserId});
        }
        if(existingUser.role != "admin"){
            return res.status(403).send({message:"You don't have access to this resource"})
        }else{
            next()
        }
    }catch(error){
        console.log(error)
        return res.status(400).send({message:"Error occured"});
    }
}

export const isLoggedIn =  async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{
        
        const userInfo = JSON.stringify(req.userInfo)
        
        if(!userInfo){
            return res.status(403).send({message:"You don't have access to this resource"});
        }
        let userInfoId = JSON.parse(userInfo)._id
        const existingUser = await getUserById(userInfoId)

        if(!existingUser){
            return res.status(403).send({message:"You don't have access to this resource"});
        }
            next()
    }catch(error){
        console.log(error)
        return res.status(400).send({message:"Error occured"});
    }
}