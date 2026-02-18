const mongoose=require('mongoose')


//create user comment schema
const usercommentSchema=new mongoose.Schema({
    nameOfUser:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    }
},{"strict":"throw"})


//create author schema

const authorDataSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
    }

},{"strict":"throw"})

//create article schema
const articleSchema=new mongoose.Schema({
      authorData: authorDataSchema,
      
      articleId:{
        type:String,
        required:true,
      },
      title:{
        type:String,
        required:true,
      },
      category:{
        type:String,
        required:true,
      },
      content:{
        type:String,
        required:true,
      },
      dateOfCreation:{
        type:String,
        required:true,
      },
      dateOfModification:{
        type:String,
        required:true,
      },
      comments:[usercommentSchema],

      isArticleActive:{
        type:Boolean,
        required:true,
      }

},{"strict":"throw"})

//create model
const Article=mongoose.model('article',articleSchema)

//remove unique indexes if they exist
Article.collection.dropIndex("articleId_1").catch(() => {});

//export model

module.exports=Article