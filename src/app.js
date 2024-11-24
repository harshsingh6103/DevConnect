const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());


// SIGNING UP API
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send("User created successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

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
    res.status(404).send("Something Went Wrong"+err.message);
  }
});

// DELETE DATA API

app.delete("/delete",async(req,res)=>{
    const id = req.body._id;
    try{
        await User.findByIdAndDelete({_id:id})          // ({schema:us/fetched})
        res.send("Deleted Successfully");
    }
    catch(err){
        res.status(404).send("Something Went Wrong"+err.message);
    }
})

// Updating User data

app.patch("/user/:id", async (req, res) => {
  const id = req.params?.id; // Extract ID from the body
  const data = req.body; // Retrieve the whole body

  try {
    const ALLOWED_UPDATES = ["profilePic", "bio", "skills"];
        
        // Ensure only allowed fields are being updated
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );

        if (!isUpdateAllowed) {
            throw new Error("You can only change your ProfilePic, Bio, and Skills");
        }

      // Ensuring the 'skills' array has a length of 10 or less
      if (data?.skills && data.skills.length > 10) {
          throw new Error("You can add only up to 10 skills");
      }

      // Updating the user document
      await User.findByIdAndUpdate({ _id: id }, data);
      res.send("Updated Successfully");
  } catch (err) {
      res.status(404).send("Something Went Wrong: " + err.message);
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
