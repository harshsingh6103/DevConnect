const express = require("express");

const app = express();

// Middleware / Generally we use 'use' request so that it could pass all get post put patch req

const { adminAuth, userAuth } = require("./middlewares/auth");

app.get("/user/login", (req, res) => {
  res.send("Welocome Back : Enter login credentials");
});

app.use("/user", userAuth);
app.get("/user/getData", (req, res) => {
  res.send("Data Sent");
});

app.get("/admin/getData", adminAuth, (req, res) => {
  res.send("Data Sent");
});

app.listen(3000, () => {
  console.log("Server is successfully listening at 3000");
});



// APIS

// GETTING USER DATA BASED ON EMAIL
app.get("/user", async (req, res) => {
  const emailId = req.body.email;

  console.log(emailId);
  try {
    const userData = await User.findOne({ email: emailId }); // it will give an array if soent matches returns array of size 0
    if (userData.length === 0) {
      res.send("User Not Found");
    } else {
      res.send(userData);
    }
  } catch (err) {
    res.status(404).send("Something Went Wrong");
  }
});

// GETTING ALL USERS DATA
app.get("/feed", async (req, res) => {
  try {
    const userData = await User.find({}); // if no parameters passed then it will return all the data

    res.send(userData);
  } catch (err) {
    res.status(404).send("Something Went Wrong" + err.message);
  }
});

// DELETE DATA API

app.delete("/delete/:id", async (req, res) => {
  const id = req.params?.id;
  try {
    await User.findByIdAndDelete({ _id: id }); // ({schema:us/fetched})
    res.send("Deleted Successfully");
  } catch (err) {
    res.status(404).send("Something Went Wrong" + err.message);
  }
});

// Updating User data
// To update your data you must enter the current password
app.patch("/user/:id", async (req, res) => {
  const id = req.params?.id; // Extract ID from params
  const { password, ...data } = req.body; // Here password is seperated explicitly whereas the data is still in json object format with the help of ...
  console.log(data.password);

  try {
    // Fetch the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Allowed fields for updates
    const ALLOWED_UPDATES = [
      "profilePic",
      "bio",
      "skills",
      "gender",
      "age",
      "location",
      "password",
    ];

    // Ensure only allowed fields are being updated
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      return res.status(400).send("You can't change your name and email");
    }

    // Ensure 'skills' array has a maximum length of 10
    if (data.skills && data.skills.length > 10) {
      return res.status(400).send("You can add only up to 10 skills");
    }

    // Authenticate with the current password
    const isPasswordValid = await bcrypt.compare(password, user.password); // compare function takes to argumests(plainPassword,hashedPassword)
    if (!isPasswordValid) {
      return res.status(400).send("Wrong password");
    }

    // Update the user document
    await User.findByIdAndUpdate(id, { $set: data }); //here $set:data is used to set specific thing that i want to use
    res.status(200).send("Updated Successfully");
  } catch (err) {
    res.status(500).send("Something Went Wrong: " + err.message);
  }
});
