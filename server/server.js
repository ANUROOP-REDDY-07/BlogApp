//impoets
const userApp=require('../server/APIs/userApi');
const authorApp=require('../server/APIs/authorApi');
const adminApp=require('../server/APIs/adminApi');
const cors=require('cors')
const {clerkMiddleware}=require('@clerk/express')

//creating express server

const exp=require('express');
const app=exp();
require('dotenv').config();  //process.env

const port=process.env.PORT || 4000;

//cors
app.use(cors(
    {origin:['http://localhost:5173','http://localhost:3000'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}
))

//Clerk middleware
app.use(clerkMiddleware())

//db connection

const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db")
        app.listen(port,()=>console.log(`server listening on port ${port}`))
    })
    .catch((err)=>{
        console.log("error in db connection",err);
    })

    

app.use(exp.json())
//connect Api routes

app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)


//error handling middleware
app.use((err,req,res,next)=>{
    console.log("error handling middleware",err);
    res.send({message:"something went wrong",error:err.message})
})


