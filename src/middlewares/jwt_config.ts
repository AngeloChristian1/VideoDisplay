import { UserModel } from './../schema/users';
import { authentication } from './../helpers/index';
import Jwt from "jsonwebtoken";
import jwt from "jsonwebtoken";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      userInfo?: object|string;
    }
  }
}

export const generateToken = (data:object) => {
  let token = Jwt.sign(data, "USER-AUTH", {
    expiresIn: 30000,
  });
  // console.log("token generated", token);
  return token
};


export  const extractToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const NAMESPACE = 'USER-AUTH'
  try{
  let token = req.headers.authorization?.split(" ")[1]  || "";
 
  if (!token) {
    return res.status(401).json({
      message: "no access token found",
    });
  }

   jwt.verify(token, NAMESPACE, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }  
    res.locals.decoded = decoded
    // req.body.decoded = decoded
    req.userInfo = decoded;
    // req. 
        // req.id = Verify._id; 
    // console.log("user id: ", req.userId);
    // console.log("decoded",decoded);
    next();
  });
  }catch(error){
    console.log("Error Occured in extract token", error.message)
    res.status(500).json({message:"Internal server down"})
  }
  
}