const exp=require('express');
const userApp=exp.Router();
const userauthor=require('../models/userAuthorModel');
const expressAsyncHandler=require('express-async-handler');
const createUserOrAuthor=require('./createUserOrAuthor'); 
const  Article=require('../models/articleModel');    


//API

userApp.post("/user",expressAsyncHandler(createUserOrAuthor));


//add comment
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    //get comment obj
    const commentObj=req.body;
    //add commentObj to comment array of article
    const articleWithComment=await Article.findOneAndUpdate(
        {articleId:req.params.articleId},
        {$push:{comments:commentObj}},
        {returnOriginal:false}
    )

    res.status(200).send({message :"Comment added successfully",payload:articleWithComment});
    
}));



module.exports=userApp;