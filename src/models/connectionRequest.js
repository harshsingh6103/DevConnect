    const mongoose = require('mongoose');


    const connectionRequestSchema = new mongoose.Schema({
        
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',   // to refer user model
            required:true,
        },
        toUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',   // to refer user model
            required:true,
        },
        status: {
            type: String,
            required:true,
            enum:{             // to restrict with some values
                values: ["ignored","interested","accepted","rejected"],
                message: `{VALUE} is not supported`   //to send msg if enum fails
            }                         
        },
    },
    {
        timestamps:true,
    }
    )

    //compound index

    connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 } );


        // Always keep first letter of model name in capital letters
    const ConnectionRequestModel = mongoose .model( "ConnectionRequest",connectionRequestSchema);

    module.exports = ConnectionRequestModel;