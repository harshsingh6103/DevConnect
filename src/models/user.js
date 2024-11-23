const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
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
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
