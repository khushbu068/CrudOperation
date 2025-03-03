const express=require("express");
const { createOps, loginUser, readOps, updateOps, deleteUser } = require("../controller/crudController");
const { userMiddleware } = require("../middleware/authmiddleware");
const userRouter=express.Router();

 userRouter.post("/createUser", createOps);
 userRouter.post("/loginUser",loginUser);
 userRouter.get("/readUserData",userMiddleware,readOps);
 userRouter.put("/updateUserData",userMiddleware, updateOps);
 userRouter.delete("/deleteUser",userMiddleware,deleteUser);


module.exports=userRouter;