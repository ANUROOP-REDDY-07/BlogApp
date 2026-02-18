const exp = require('express');
const authorApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require('./createUserOrAuthor'); 
const Article = require('../models/articleModel')
const {requireAuth}=require('@clerk/express')

require('dotenv').config();

authorApp.use(exp.json());


// API

authorApp.post("/author", expressAsyncHandler(createUserOrAuthor));

// create new article
authorApp.post("/article", expressAsyncHandler(async (req, res) => {
    // get article obj from req body
    const newArticleObj = req.body;
    const newArticle = new Article(newArticleObj);
    const articleObj = await newArticle.save();
    res.status(200).send({ message: "Article created successfully", payload: articleObj });
}));

// modify article using article id
authorApp.put('/article/:articleId', expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    const dbRes = await Article.findByIdAndUpdate(
        modifiedArticle._id,
        { ...modifiedArticle },
        { returnOriginal: false }
    );
    res.status(200).send({ message: "Article modified successfully", payload: dbRes });
}));

// delete article by article id (soft delete)
authorApp.put('/articles/:articleId', expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    const latestArticle = await Article.findByIdAndUpdate(
        modifiedArticle._id,
        { ...modifiedArticle },
        { returnOriginal: false }
    );
    res.status(200).send({ message: "Article Deleted", payload: latestArticle });
}));

// read all articles
authorApp.get('/articles',expressAsyncHandler(async (req, res) => {
    const listofarticles = await Article.find({ isArticleActive: true });
    res.status(200).send({ message: "list of articles", payload: listofarticles });
}));


authorApp.get('/unauthorized',(req,res)=>{
    res.status(401).send({message:"unauthorized access"})
}
);

// ✅ read single article by articleId
authorApp.get('/article/:articleId', expressAsyncHandler(async (req, res) => {
    const { articleId } = req.params;

    const article = await Article.findOne({ articleId: articleId, isArticleActive: true });

    if (!article) {
        return res.status(404).send({ message: "article not found" });
    }

    res.status(200).send({ message: "article", payload: article });
}));

module.exports = authorApp;
