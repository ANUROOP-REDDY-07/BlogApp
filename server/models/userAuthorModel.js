const mongoose=require('mongoose');

// create schema for user and author

const userAuthorSchema=new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImageUrl:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{"strict":"throw"})



//create model for user and  author

const userauthor=mongoose.model('userauthor',userAuthorSchema)

//export model
module.exports=userauthor;
