import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
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
      isLiked:{ type: Boolean, required: true }
},
{
    timestamps: true,
  })

export const LikeModel = mongoose.model('Like', LikeSchema)

export const getLike = () => LikeModel.find();

export const getLikeByUserId = (id:string) => LikeModel.find({userId:id});

export const getLikeByBlogId = (id:string) => LikeModel.find({blogId:id});

export const getLikeById = (id:string) => LikeModel.findById(id);

export const createLike = (values:Record<string, any>) => new LikeModel(values).save()
.then((Like)=>Like.toObject());

export const deleteLikeById = (id:string)=> LikeModel.findOneAndDelete({_id:id});

export const updateLikeById = (id:string, values: Record<string, any>) => LikeModel.findByIdAndUpdate(id, values);