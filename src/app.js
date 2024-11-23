const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Abhishek",
    lastName: "Yadav",
    email: "abhishekyadav@gmail.com",
    password: "Abhishek#999",
    age: 22,
    location: "Noida, India",
    skills: ["Electrical","Engineer"],
    bio: "Engineer",
    profilePic:
      "https://i.pinimg.com/originals/f4/c1/e6/f4c1e63f314695110c9c57ddf71643c2.jpg",
  });


try {
  await user.save();
  res.status(201).send("User created successfully.");
} catch (err) {
  res.status(400).send(err.message);
}
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is successfully listening at 3000");
    });
    console.log("DataBase connected succesfully :)");
  })
  .catch((err) =>
    console.log("Was not able to connect to database :( =>" + err)
  );
