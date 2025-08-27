const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://harshsingh6103:Harsh999@bbxbot.yya0c.mongodb.net/"
  );
}

module.exports = connectDB;