const express = require("express");
const cookieParser = require("cookie-parser");    // middlewear to read cookies
const app = express();
const connectDB = require("./config/database");
const jwt = require("jsonwebtoken");

app.use(express.json()); //To get respose from body in json format
app.use(cookieParser()); //To read cookies


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");


app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);




connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is successfully listening at 3000");
    });
    console.log("DataBase connected succesfully :)");
  })
  .catch((err) => {
    console.log("DB connection failed :(", err);
  });



  
