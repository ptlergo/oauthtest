const mongoose=require('mongoose');

//database Schema
const userSchema=mongoose.Schema({

  local:{
    username: String,
    password: String
  }
  
});

module.exports=mongoose.model('User', userSchema);
