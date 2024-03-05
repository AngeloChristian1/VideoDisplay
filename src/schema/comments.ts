import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
      },
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content:{ type: String, required: true }
},
{
    timestamps: true,
  })

export const CommentModel = mongoose.model('Comment', CommentSchema)

export const getComment = () => CommentModel.find();
export const getCommentByUserId = (id:string) => CommentModel.find({userId:id});
export const getCommentByBlogId = (id:string) => CommentModel.find({blogId:id});

export const getCommentById = (id:string) => CommentModel.findById(id);

export const createComment = (values:Record<string, any>) => new CommentModel(values).save()
.then((Comment)=>Comment.toObject());

export const deleteCommentById = (id:string)=> CommentModel.findOneAndDelete({_id:id});

export const updateCommentById = (id:string, values: Record<string, any>) => CommentModel.findByIdAndUpdate(id, values);