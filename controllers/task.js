import ErrorHandler from '../middlewares/error.js';
import Task from '../models/task.js'

export const  newTask = async(req,res,next)=>{
    try{
        const {title,description}=req.body;
     await Task.create({
        title,
        description,
        user:req.user,
          
     })

     res.status(201).json({
        success:"true",
        message:"Task Added Successfully"
     })

    }
    catch(error){
        next(error);
    }
     
     

}

export const getMyTask = async(req,res,next)=>{
    try {
        const user=req.user;
    const task=await Task.find({user:user._id});
    res.status(200).json({
        sucess:true, 
        task,
    })
        
    } catch (error) {
        next(error);
    }
    
}

export const deleteTask = async(req,res,next) =>{
    try {
        const {id}=req.params;
    const task=await Task.findById(id);
    if(!task) return next(new ErrorHandler("Invalid Task",404))
    await task.deleteOne(); 
    res.status(200).json({
        success:true,
        message:"Task Deleted"
    })
        
    } catch (error) {
        next(error);
    }
    
}
export const updateTask = async(req,res,next) =>{
    try{
        const {id}=req.params;
    const task=await Task.findById(id);
    if(!task) return next(new ErrorHandler("Invalid Task",404))

    task.isCompleted=!task.isCompleted;
    await task.save();
    res.status(200).json({
        success:true,
        message:"Task Updated"
    })

    }
    catch(error){
        next(error);
    }
    
}