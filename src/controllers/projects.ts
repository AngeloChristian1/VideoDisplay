import express from 'express'
import {getProjectByName, createProject, getProject, getProjectById, deleteProjectById} from "../schema/projects"

export const addProject = async (req: express.Request, res: express.Response) =>{
    try{
        const {images, name, category, duration, problemStatement, solution, impact, technologies } = req.body;

        if(!images || !name || !category || !problemStatement || !solution || !impact){
            return res.status(400).send({message:"Error Occured"});
        }

        const existingProject = await getProjectByName(name)

        if(existingProject){
            return res.status(400).send({message:"Project Already exists"});
        }

        const Project = await createProject({images, name, category, duration, problemStatement, solution, impact, technologies })

        return res.status(200).send({status:"success", data:Project})
    } catch(error){
        console.log('error', error);
        return res.status(400).send({message:"Error Occured"});
    }
}


export const getAllProjects = async (req:express.Request, res:express.Response)=>{
    try{
        const Projects =await getProject();
        return res.status(200).send({message:"Projects retrieved successfully",data:Projects})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}
export const getOneProjectById = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const Project =await getProjectById(id);
        return res.status(200).send({message:"Projects retrieved successfully",data:Project})
    } 
    catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}

export const deleteProject = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedProject = await deleteProjectById(id);

        return res.send({message:"Project deleted successfully",data:deletedProject})
    }catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}


export const updateProject = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {images, name, category, duration, problemStatement, solution, impact, technologies } = req.body;

        if(!images || !name || !category || !problemStatement || !solution || !impact){
            return res.status(400).send({message:"Error Occured"});
        }

        let Project = await getProjectById(id);

        if (!Project) {
            return res.status(400).send({message:"Error Occured"});
        }

        Project.images = images;
        Project.name = name;
        Project.category = category;
        Project.problemStatement = problemStatement;
        Project.duration = duration;
        Project.solution = solution;
        Project.impact = impact;
        Project.technologies = technologies;

        const updatedProject = await Project.save();
        // return res.sendStatus(200).json(Project).end();
        return res.status(200).send({status:"success", data: updatedProject});

    }catch(error){
        console.log(error)
        return res.status(400).send({message:"Error Occured"});
    }
}
 