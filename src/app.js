const express = require("express")

const app = express();

app.use("/home",(req,res)=>{
    res.send("Home Page");
})

app.listen(3000,()=>{
    console.log("Server is successfully listening at 3000")
});


app.use((req,res)=>{
    res.send("Connection established successfully");
})



