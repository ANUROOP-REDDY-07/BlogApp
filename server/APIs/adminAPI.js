const exp=require('express');
adminApp=exp.Router();

//API

adminApp.get("/",(req,res)=>{
    res.send({message:"Admin Api"})
})







module.exports=adminApp;