const projects = require('../models/projectModel')

// add project

exports.addProjectController = async(req,res)=>{
    console.log("Inside addProjectController");
        const userId = req.userId
        // console.log(userId);
        // console.log(req.body);
        // console.log(req.file);
        
        const {title,languages,overview,github,website} = req.body
        const projectImage = req.file.filename
        try{
            const existingProject = await projects.findOne({github})
            if(existingProject){
                res.status(406).json("Projects Already exists..Please upload another")
            }else{
                const newProject = new projects({
                    title,languages,overview,github,website,projectImage,userId
                })
                await newProject.save()
                res.status(200).json(newProject)
            }
        }catch(err){
            res.status(401).json(err)
        }
}


// get home projects - guest user
exports.getHomeProjectsController = async (req,res)=>{
    console.log("Inside getHomeProjectsController");
    try{
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// user project
exports.getUserProjectsController = async (req,res)=>{
    console.log("Inside getUserProjectsController");
    const userId = req.userId
    try{
        const allUserProjects = await projects.find({userId})
        res.status(200).json(allUserProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all projects
exports.getAllProjectsController = async(req,res)=>{
    console.log("Inside getAllProjectsController");
    const searchKey = req.query.search
    
    try{
        const allProjects = await projects.find({
            languages:{
                $regex:searchKey,$options:"i"
            }
        
    })
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// edit project
exports.editProjectController = async(req,res)=>{
    console.log("Inside editProjectController");
    // get project id from request params
    const {id} = req.params
    // req.body - contains only text type data
    const {title,languages,overview,github,website,projectImage} = req.body
    // to get file data
    const reUploadImageFile = req.file?req.file.filename:projectImage
    // to get userId - use jwtmiddleware
    const userId= req.userId
    console.log(id,title,languages,overview,github,website,reUploadImageFile,userId);
    try{
        const updatedProject = await projects.findByIdAndUpdate({_id:id},{
            title,languages,overview,github,website,reUploadImageFile,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.removeProjectController = async(req,res)=>{
    console.log("Inside removeProjectController");
    // get id of the project to be deleted from req params
    const {id} = req.params
    // delete project with given id
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(err)
    }
    
}