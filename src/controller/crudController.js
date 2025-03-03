const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CrudUser = require("../model/crudUser");

exports.createOps = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new Error("All fields are require");
      }
      const existingUser = await CrudUser.findOne({ email });
      if (existingUser) {
        throw new Error("Email is already in use! Please login" );
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new CrudUser({ name, email, password: passwordHash });
      console.log(newUser);
      await newUser.save();
      res.status(201).json({ message: "user created successfully", newUser });
    } catch (err) {
      res
        .status(500)
        .json({ error: "error creating user", details: err.message });
    }
  };

  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
        throw new Error("Email and password both are required.")
    }
    try {
      const user = await CrudUser.findOne({ email });
      if (!user) {
       throw new Error("Invalid email or password.");
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials! Please enter correct email and password" );
      }
  
    const token = jwt.sign({ email: user.email }, "secret", { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
      res.status(200).json({message: "Login successful"});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error in logging", details: err.message });
    }
  };

  exports.readOps= async (req, res) => {
    try {
     
    
      const user = await CrudUser.findOne({ email: req.user.email }).select("-password");
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Error fetching user", details: err.message });
    }
  };

  exports.updateOps=async(req,res)=>{
    try{
        const option={new:true};
        
        const {name,email,phone, age,password}=req.body;
        const user=await CrudUser.findOneAndUpdate({ email:req.user.email },req.body,{
            returnDocument:"after"
        })
        if(!user){
            throw new Error("User not found");
        }
        user.save()
        res.status(200).json({message:"User profile updated successfully",user})
    }catch(err){
        console.error(err);
        res.status(500).json({error:"internal server error"});
    }
  }