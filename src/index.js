const express=require('express');
const userRouter = require('./route/userRoute');
require("./config/db");
const app=express();
var cookieParser = require('cookie-parser')




// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api",userRouter)
app.listen(5000,()=>{
  console.log("server is running on port 5000");
})