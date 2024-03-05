import Joi from "joi"

const blogSchema = Joi.object({
    poster: Joi.string(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    category: Joi.string().required(),
    content: Joi.string().required(),
    timeToRead: Joi.string(),
    // date: Joi.date().default(new Date()),
    // time: Joi.date().default(new Date().getTime()),
  });

  export const validateBlog = (blogData:Object)=>{
    return blogSchema.validate(blogData)
  }

  
const commentSchema = Joi.object({
    blogId:Joi.string().required(),
    userId:Joi.string().required(),
    content:Joi.string().required(),
})

export const validateComment = (commentData:Object)=>{
    return commentSchema.validate(commentData)
  }

  
const likesSchema = Joi.object({
    blogId:Joi.string().required(),
    userId:Joi.string().required(),
    isLiked:Joi.boolean().required(),
})

export const validatelikes = (likesData:Object)=>{
    return likesSchema.validate(likesData)
  }

  
const messageSchema = Joi.object({
    name:Joi.string().required().min(3),
    phone:Joi.string().required(),
    email:Joi.string().required().email(),
    message:Joi.string().required().min(5)
})

export const validatemessage = (messageData:Object)=>{
    return messageSchema.validate(messageData)
  }

  
const projectSchema = Joi.object({
    images:Joi.array().required(),
    name:Joi.string().required(),
    category:Joi.string().required(),
    duration:Joi.string(),
    problemStatement:Joi.string().required(),
    solution:Joi.string().required(),
    impact:Joi.string().required(),
    technologies:Joi.string()
})

export const validateproject = (projectData:Object)=>{
    return projectSchema.validate(projectData)
  }

  
const userSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required().lowercase().email(),
    phone:Joi.string().required().min(10).max(10),
    role:Joi.string().required(),
})

export const validateUser = (userData:Object)=>{
    return userSchema.validate(userData)
  }

const signUpSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required().lowercase().email(),
    phone:Joi.string().required().min(10).max(10),
    password:Joi.string().required(),
    role:Joi.string().required(),
})

export const validateSignUp = (signUpData:Object)=>{
    return signUpSchema.validate(signUpData)
  }
  
const loginSchema = Joi.object({
    email:Joi.string().required().lowercase().email(),
    password:Joi.string().required().min(6),
})

export const validateLogin = (loginData:Object)=>{
    return loginSchema.validate(loginData)
  }

export {userSchema,blogSchema, messageSchema, commentSchema, likesSchema, projectSchema, loginSchema, signUpSchema}