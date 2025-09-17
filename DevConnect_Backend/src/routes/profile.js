const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateSignUpData, validateEditProfileData } = require("../utils/validators");

//Getting cookies and profile

profileRouter.get("/userProfile", userAuth, async (req, res) => {
  try {
    const userData = req.user;

    res.send(userData);
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});


profileRouter.patch("/updateProfile", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res.status(400).send("Invalid fields in update request.");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save(); 
    res.status(200).send("Profile updated successfully.");
  } catch (err) {
    res.status(400).send("Error updating profile: " + err.message);
  }
});



module.exports = profileRouter;




//  middlewear auth.js is sending as a user object attached to req so that we can se it here





    // const { firstName, lastName, age, skills, bio, profilePic,email } = req.body;

    // if (firstName) user.firstName = firstName;
    // if (lastName) user.lastName = lastName;
    // if (age) user.age = age;
    // if (skills) user.skills = skills;
    // if (bio) user.bio = bio;
    // if (profilePic) user.profilePic = profilePic;
    //  if (email) user.email = email;
