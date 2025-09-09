const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];

    // check valid status
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type: " + status });
    }
    // check if toUser exists
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // prevent self-request
    if (fromUserId.toString() === toUserId) {
      return res.status(400).json({ message: "You cannot send a request to yourself" });
    }

    // check if request already exists
    const existingConnections = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnections) {
      return res.status(400).json({ message: "Connection request already exists" });
    }

    // create new request
    const connectionRequest = new ConnectionRequestModel({
      fromUserId: fromUserId,
      toUserId: toUserId,
      status: status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: `${req.user.firstName} sent the connection request successfully`,
      data: data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {

      const loggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status; 

      const allowedStatus = ["accept", "reject"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({ message: "Invalid status type: " + status });
      }

      
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status:"interested" // can only review if status is interested
      })

      if(!connectionRequest) {
        return res.status(404).json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: `Connection request ${status} successfully`,
        data: data,
      });



  } catch (err) {
    res.status(400).json({ error: err.message }); // better error response
  }
});


module.exports = requestRouter;
