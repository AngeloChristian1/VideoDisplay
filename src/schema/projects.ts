import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    images: {type: Array, required:true},
    name: {type: String, required:true},
    category: {type: String, required:true},
    duration: {type: String},
    problemStatement: {type: String, required:true},
    solution: {type: String, required:true},
    impact: {type: String, required:true},
    technologies: {type: Array},

})

export const ProjectModel = mongoose.model('Project', ProjectSchema)

export const getProject = () => ProjectModel.find();
export const getProjectByName = (name:string) => ProjectModel.findOne({name:name});

export const getProjectById = (id:string) => ProjectModel.findById(id);

export const createProject = (values:Record<string, any>) => new ProjectModel(values).save()
.then((Project)=>Project.toObject());

export const deleteProjectById = (id:string)=> ProjectModel.findOneAndDelete({_id:id});

export const updateProjectById = (id:string, values: Record<string, any>) => ProjectModel.findByIdAndUpdate(id, values);