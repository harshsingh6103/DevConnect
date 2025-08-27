const express = require("express");
const { userAuth } = require("../middlewares/auth");


const requestRouter = express.Router();

requestRouter.use("/sendRequest" ,userAuth ,async (req,res) => {
    const user = req.user;
    console.log("Sending connection request");

    res.send(user.firstName+"sent the connection request");

});


module.exports = requestRouter;