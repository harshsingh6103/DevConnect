const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const { connection } = require("mongoose");

userRouter.get("/requests/recieved", userAuth, async (req, res) => {
  try {

    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested"
    }).populate("fromUserId", "firstName lastName email headline profileImage");
    res.json({ data: connectionRequests });




    } catch (err) {
    res.status(400).json({ error: err.message });
  }
});   

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequestModel.find({
  $or: [
    { fromUserId: loggedInUser._id, status: "accept" },
    { toUserId: loggedInUser._id, status: "accept" },
  ],
}).populate("fromUserId", "firstName lastName email")
  .populate("toUserId", "firstName lastName email");

const data = connections.map((row) => {
  if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
    return row.toUserId;  // now it's populated
  } else {
    return row.fromUserId;
  }
});

res.json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// const connections = await ConnectionRequestModel.find({
//   $or: [
//     { fromUserId: loggedInUser._id, status: "accept" },
//     { toUserId: loggedInUser._id, status: "accept" },
//   ],
// }).populate("fromUserId", "firstName lastName email")
//   .populate("toUserId", "firstName lastName email");

// const data = connections.map((row) => {
//   if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
//     return row.toUserId;  // now it's populated
//   } else {
//     return row.fromUserId;
//   }
// });

// res.json({ data });




module.exports = userRouter;