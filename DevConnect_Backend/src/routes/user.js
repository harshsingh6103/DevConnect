const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const { connection } = require("mongoose");
const User = require("../models/user");

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
    { fromUserId: loggedInUser._id, status: "accepted" },
    { toUserId: loggedInUser._id, status: "accepted" },
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


userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    let limit = parseInt(req.query.limit) || 10;
    limit  = limit > 50 ? 50 : limit; // Cap limit to 50
    const skip = (page - 1) * limit;

    // find all requests where loggedInUser is sender or receiver
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ]
    }).select("fromUserId toUserId status")

    // collect all connected userIds
    const hideUserIds = new Set();
    connectionRequests.forEach(req => {
      hideUserIds.add(req.fromUserId.toString());
      hideUserIds.add(req.toUserId.toString());
    });

    // find all users except loggedInUser and connected ones
    const users = await User.find({
      _id: { $nin: Array.from(hideUserIds).concat(loggedInUser._id) }
    }).skip(skip).limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});





module.exports = userRouter;