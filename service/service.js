// Importing necessary modules and models
const User = require('../models/user_model');
const Task = require('../models/task_model');
const bcrypt = require('bcrypt');
const axios = require('axios')


// Render the signup page
exports.main = (req,res)=>{
    res.render('signup');
}
// Render the signin page
exports.login = (req,res)=>{
    res.render('signin')
}
// Render the user home page
exports.user_home = (req,res)=>{
    res.render('user_home')
}
// Render the admin home page
exports.admin_home = (req,res)=>{
    res.render('admin_home')
}
// Render the page for creating a new task
exports.new_task = (req,res)=>{
    res.render('create_task')
}
// Render the sign-in error page
exports.signinErr = (req,res)=>{
    res.render('signin_err')
}
// Render the sign-up error page
exports.signupErr = (req,res)=>{
    res.render('signup_err')
}    
// Authenticate user credentials and render the appropriate home page or error
exports.userAuthenticate = async (req,res)=>{
    try{   
        const user = await User.findOne({userEmail:req.body.email});
        const tasks = await Task.find({});
            if(user) {
                const validPassword = bcrypt.compareSync(req.body.password, user.userPassword);
                
                if(validPassword){
                    const isAdministrator = (user.isAdmin)
                    if(!isAdministrator){
                        res.render('user_home',{user,tasks});
    
                    }else{
                        res.render('admin_home',{user,tasks});
                    }                
                }else{
                    res.render('signin_err');
                }
            }else{
                res.render('signin_err');
            }
    } catch(err) {
        res.send('Error' + err)
    }
}

// Retrieve and render a task for updating by its ID
exports.taskUpdate = (req, res) =>{
    axios.get('http://localhost:3000/api/task',{ params:{id:req.query.id}})
           .then(function(response){
                
               res.render('update_task', { task : response.data });
           })
           .catch(err =>{
               res.send(err);
           })
   }
// Make a request to delete a task by its ID and send a response
exports.taskDelete = (req, res) =>{
    axios.get('http://localhost:3000/api/task/delete',{ params:{id:req.query.id}})
           .then(function(response){
                
               res.send("Task deleted");
           })
           .catch(err =>{
               res.send(err);
           })
   }