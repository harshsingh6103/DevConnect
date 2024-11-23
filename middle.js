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
