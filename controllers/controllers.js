const User = require('../models/user_model');
const Task = require('../models/task_model')
const bcrypt = require('bcrypt')

/// User managment

// Signs up a new user with hashed password, checking for existing email
exports.signup = async (req,res)=>{
    try{
        const user_model = new User({
            userName:req.body.name,
            userEmail:req.body.email,
            isAdmin:req.body.isAdmin,
            userPassword:bcrypt.hashSync(req.body.password, 8),
        });

        const existing_user = await User.findOne({userEmail:req.body.email});
            if(existing_user){
                res.render('signup_err')
            }else{
                const user_record = await user_model.save();
                res.render('signup')
            }
    }catch(err){
        res.send('Error' + err)
    }
};


/// Task managment

// Creates a new task with the provided information from the request body
exports.create_task = async (req,res)=>{
    const task_model = new Task ({
        "number": req.body.number,
        "name": req.body.name,
        "email": req.body.email,
        "type": req.body.type,
        "pcnumber": req.body.pcnumber,
        "model": req.body.model,
        "status": req.body.status,
        "owner": req.body.owner
    });

    try{
        const record = await task_model.save();
        res.render('create_task');
    }catch(err){
        res.send('Error ' + err)
    }
}

// Finds a task by ID or returns all tasks if no ID is provided
exports.find = (req,res)=> {
    if(req.query.id){
        const id = req.query.id;
        Task.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: "Task not found"})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message: "Error retrieving task"})
        })
    }else{
        Task.find()
        .then(task =>{
            res.send(task)
        })
        .catch(err =>{
            res.status(500).send({message: "Error in task data loading"})
        })
    }
}

// Updates a task by ID with the new information provided in the request body
exports.updateTask = async (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Update task can't be empty"})
    }

    const id = req.params.id;
    Task.findByIdAndUpdate(id, req.body)
    .then(data =>{
        if(!data){
        res.status(404).send({message : "Task unable to update"})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message : "Error upating task"})
    })
    }

// Deletes a task by ID

exports.deleteTask = async (req,res)=>{
    
        const id = req.params.id;
        Task.findByIdAndDelete(id, req.body)
        .then(data =>{
            if(!data){
            res.status(404).send({message : "Unable to delete task"})
            }else{
                res.send({
                    message : "Task is deleted"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({message : "Error deleting task"})
        })
        }
    