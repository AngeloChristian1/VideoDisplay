import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    name: {type: String, required:true},
    phone: {type: String, required:true},
    email: {type: String, required:true},
    message: {type: String, required:true},
}, {
    timestamps:true,
})

export const MessageModel = mongoose.model('Message', MessageSchema)

export const getMessage = () => MessageModel.find();

export const getMessageByEmail = (email:string) => MessageModel.findOne({email:email});

export const getMessageByPhone = (phone:string) => MessageModel.findOne({phone:phone});

export const getMessageById = (id:string) => MessageModel.findById(id);

export const createMessage = (values:Record<string, any>) => new MessageModel(values).save()
.then((Message)=>Message.toObject());

export const deleteMessageById = (id:string)=> MessageModel.findOneAndDelete({_id:id});

export const updateMessageById = (id:string, values: Record<string, any>) => MessageModel.findByIdAndUpdate(id, values);