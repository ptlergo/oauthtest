const mongoose=require('mongoose');

//database Schema
const userSchema=mongoose.Schema({

  local:{
    username: String,
    password: String
  },

  facebook:{
    id: String,
    token: String,
    email: String,
    name: String
  }

});

module.exports=mongoose.model('User', userSchema);
