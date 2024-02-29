import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    poster: {type: String, required:true},
    title: {type: String, required:true},
    subtitle: {type: String, required:true},
    category: {type: String, required:true},
    content: {type: String, required:true},
    timeToRead: {type: String},
    date: {type: String},
    time: {type: String},
    editor:{type: Array},
    views:{type: Array},
    likes:{type: Array},
    comments:{type: Array}
})

export const BlogModel = mongoose.model('Blog', BlogSchema)

export const getBlog = () => BlogModel.find();

export const getBlogByTitle = (title:string) => BlogModel.findOne({titlel:title});

export const getBlogById = (id:string) => BlogModel.findById(id);

export const createBlog = (values:Record<string, any>) => new BlogModel(values).save()
.then((Blog)=>Blog.toObject());

export const deleteBlogById = (id:string)=> BlogModel.findOneAndDelete({_id:id});

export const updateBlogById = (id:string, values: Record<string, any>) => BlogModel.findByIdAndUpdate(id, values);