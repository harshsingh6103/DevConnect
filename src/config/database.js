const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://harshsingh6103:BOJIx6ERzsDRqzWv@bbxbot.yya0c.mongodb.net/?retryWrites=true&w=majority&appName=BBxBoT"
  );
}

module.exports = connectDB;
