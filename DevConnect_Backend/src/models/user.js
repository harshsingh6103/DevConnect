const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
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
        throw new Error("Weak password: "+ value);
      }
    }
  },
  age: {
    type: Number,
    min:18,
  },
  gender:{
    type: String,
        enum:{             // instead of validate
          values:["male","female","others"],
          message: `{VALUE} is not a valid gender type`
        }
    // validate(value){
    //   if(!["male","female","others"].includes(value)){
    //     throw new Error("Gender data is not valid")
    //   }
    // }

  },
  location: {
    type: String,
    required: false,
  },
  skills: {
    type: [String], // Array of skills (e.g., ["JavaScript", "React", "Node"])
    required: false,
  },
  bio: {
    type: String,
    required: false,
    maxlength: 500, // Optional: restrict bio length
  },
  profilePic: {
    type: String, // URL or file path to profile image  
    default:"https://cheems.pet/static/header-img2-h5.17269aed.png",
    
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid photo URL "+ value);
      }
    }
  },
},{
  timestamps:true
});


userSchema.methods.getJWT = async function(){ //this doesnt works with arrow functions and this points out the specified user at that instance 
  const user  = this;
  const token = await jwt.sign({ _id: user._id }, "Harsh#999",{expiresIn:"7d"}); //jwt.sign({username:'name'},password,{expiresIn});
      return token
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash); // returns boolean i.e true or false

  return isPasswordValid;

}

const User = mongoose.model("User", userSchema);

module.exports = User;

