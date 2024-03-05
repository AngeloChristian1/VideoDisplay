import express from 'express'
import {getUserByEmail, createUser, getUserById} from "../schema/users"
import {random, authentication} from "../helpers"
import messages from '../routes/messages';
import { validateUser } from '../helpers/validate_schema';
import { loginSchema, signUpSchema} from '../helpers/validate_schema';
import { result } from 'lodash';
import { hashPassword, comparePassword } from '../helpers/hashPassword';
import { generateToken } from '../middlewares/jwt_config';

export const login = async (req: express.Request, res: express.Response)=>{
    let pass:string  | any
    try{
        let {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({message:"Fill in all form fields", status:"fail"});
        }
        const result = await loginSchema.validateAsync(req.body)
        email = result.email
        password = result.password

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user){
            return res.status(400).send({message:"User Doesn't exists",status: "fail"});
        }

        const expectedHash = authentication(user.authentication.salt, password);
                let hash = await hashPassword(password)
        let comparedPassword = await comparePassword(password, user.authentication.password)

        if (!comparedPassword) {
            return res.status(401).json({
              message: "Wrong password",
            });
          }
          
          let token = generateToken({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
          if(!token) {
            return res.status(401).json({error: "Invalid token"})
          }
          req.headers.authorization = token;
        // if(user.authentication.salt !== expectedHash){
        //     return res.sendStatus(403);
        // }

        // pass = token
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        // await user.save();

        res.cookie("USER-AUTH",user.authentication.sessionToken, {domain: 'localhost'|| "my-brand", path:'/'} );
        return res.status(200).send({message:"User Login Successful",status: "success",data:user, bearerToken: token ||"token"});

    }catch(error){
        console.log('error', error);
        return res.status(400).send({message:"User Login Failed", status:"fail", password:pass});
    } 
}

export const register = async (req: express.Request, res: express.Response) =>{
    try{
        let {email,phone, password, name, role} = req.body;
        if(role==null || role   === undefined || role.length ==0){
            role = "user"
        }
        const result = await signUpSchema.validateAsync({email,phone, password, name, role})
        console.log(result)
        email = result.email
        password = result.password
        name = result.name
        role = result.role
        phone = result.phone
        password = await hashPassword(password)
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
        if(error.isJoi == true) error.status=422
        return res.status(400).send({message:"User creation fail", error: error?.details});

    }
}


export const changeUserPassword = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {oldPassword, newPassword} = req.body;
        const userInfo = JSON.stringify(req.userInfo)
        console.log("decoded from passord change",userInfo);
        if(!oldPassword || !newPassword){
            return res.status(400).json({message:"Fill in all fields"})
        }
        const user = await getUserById(id).select('+authentication.salt +authentication.password');
        let comparedPassword = await comparePassword(oldPassword, user.authentication.password)

        if (!comparedPassword) {
            return res.status(401).json({
              message: "Wrong password",
            });
          }
        let  newHashPassword = await hashPassword(newPassword)
        user.authentication.password = newHashPassword
        await user.save();
        return res.status(200).send({message:"  password changed successfully", data: user});
    }catch(error){
        console.log(error)
        return res.status(400).send({error: error.message});
    }
}
