const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

    userName:{
        type:String,
        require:true
    },
    userEmail:{
        type:String,
        require:true
    },
    userPassword:{
        type:String,
        require:true
    },
    isAdmin:{type:Boolean,
    default:false
    },

},{timestamps:true});

module.exports = mongoose.model('User',userSchema);