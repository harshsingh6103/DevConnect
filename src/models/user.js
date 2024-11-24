const mongoose = require("mongoose");
const validator = require("validator")
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true, // Stores email in lowercase
    unique: true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address "+ value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Invalid email address "+ value);
      }
    }
  },
  age: {
    type: Number,
    min:18,
    required: true,
  },
  gender:{
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new error("Gender data is not valid")
      }
    }
  },
  location: {
    type: String,
    required: false,
  },
  skills: {
    type: [String], // Array of skills (e.g., ["JavaScript", "React", "Node"])
    required: true,
  },
  bio: {
    type: String,
    required: false,
    maxlength: 500, // Optional: restrict bio length
  },
  profilePic: {
    type: String, // URL or file path to profile image  
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrmzaAZR0EL7gYGfM6QvJGtOzmeDFfe7fb3A&s",
    
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid photo URL "+ value);
      }
    }
  },
},{
  timestamps:true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
