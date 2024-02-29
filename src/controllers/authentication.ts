import express from 'express'
import {getUserByEmail, createUser} from "../schema/users"
import {random, authentication} from "../helpers"
import messages from 'routes/messages';

export const login = async (req: express.Request, res: express.Response)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({message:"Fill in all form fields", status:"fail"});
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        const user2 = await getUserByEmail(email)
        if(!user){
            return res.status(400).send({message:"User Doesn't exists",status: "fail"});
        }

        const expectedHash = authentication(user.authentication.salt, password);
        
        // if(user.authentication.salt !== expectedHash){
        //     return res.sendStatus(403);
        // }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save();

        res.cookie("USER-AUTH",user.authentication.sessionToken, {domain: 'localhost', path:'/'} );
        return res.status(200).send({message:"User Login Seccessful",status: "success",data:user2, sessionToken:user.authentication.sessionToken});

    }catch(error){
        console.log('error', error);
        return res.status(400).send({message:"User Login Failed", status:"fail"});
    } 
}

export const register = async (req: express.Request, res: express.Response) =>{
    try{
        const {email,phone, password, name, role} = req.body;
        if(!email || !password || !name || !role || !phone || !password){
            return res.status(400).send({message:"Fill in all form fields"});

        }

        const existingUser = await getUserByEmail(email)

        if(existingUser){
            return res.status(400).send({message:"User already exists"});
        }

        const salt = random();
        const user = await createUser({
            email,phone, name,role, authentication:{
                salt, password
            }
        })

        return res.status(200).send({message:"User created successfuly", data: user})
    } catch(error){
        console.log('error', error);
        return res.status(400).send({message:"User creation fail"});

    }
}