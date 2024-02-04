const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({

    number: {
        type: String,
        required: true
    },
    name:{
        type:String,
         required:true
        },
    email:{type:String,
         required:true},
    
    type:{
        type:String,
        required:true
    },
    pcnumber:{type:String,
        required:true
    },
    model:{type:String, 
        required:true
    },
    status:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        default:'None'
    },
    
},{timestamps:true});

module.exports = mongoose.model('Task',taskSchema);