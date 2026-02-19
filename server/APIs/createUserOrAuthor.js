const userAuthor = require('../models/userAuthorModel');

async function createUserOrAuthor(req, res) {
  //business logic here
  //get user or author object
  const newuserauthor = req.body;
  //find user by email id
  const userInDb = await userAuthor.findOne({ email: newuserauthor.email })

  if (userInDb !== null) {
    if (newuserauthor.role === userInDb.role) {
      res.status(200).send({ message: newuserauthor.role + " already exists", payload: userInDb });
    }
    else if (userInDb.role === 'author' && newuserauthor.role === 'user') {
      // Allow author to login as user (reader)
      res.status(200).send({ message: "user already exists", payload: userInDb });
    }
    else {
      res.status(200).send({ message: "Invalid role" });
    }
  } else {
    //create new user or author
    let newUser = new userAuthor(newuserauthor);
    let newuserauthorDoc = await newUser.save();
    res.status(201).send({ message: newuserauthor.role, payload: newuserauthorDoc });

  }



}


module.exports = createUserOrAuthor;