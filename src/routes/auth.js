const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validators");
const User = require("../models/user");
const bcrypt = require("bcrypt");


// SIGNING UP API
authRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    await user.save();
    res.status(201).send("User created successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});


// LOGIN API -> BY PROVIDING EMAIL AND PASSWORD
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials!!!");
    }
    const authenticate = user.validatePassword(password);
    if (!authenticate) {
      throw new Error("Invalid Credentials!!!");
    } else {
      // Creating JWT login
      const token = await user.getJWT();   // modal/user.js

      res.cookie("token", token); //res.cookie takes 2 arguments i.e  name and value and it is used to send cookie on to the server and one object in which you can add multiple things like when on what protocol it should work {httpOnly:true}or expires in and etc

      res.status(200).send("Login Successfully :)");
    }
  } catch (err) {
    res.send("Server Error" + err);
  }
});


// Logout API
authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,     
      sameSite: "strict"
    });
    res.status(200).send("Logged out successfully");
  } catch (err) {
    res.status(500).send("Error while logging out");
  }
});











module.exports = authRouter;