const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
    userId: {   // the user who is being followed
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
    },  
    followerId: {  // the user who follows
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
},
{
    timestamps: true, // Automatically manage createdAt and updatedAt fields
}
);


const FollowerModel = mongoose.model("Follower", followerSchema);

module.exports = FollowerModel;

