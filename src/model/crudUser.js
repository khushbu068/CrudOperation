const mongoose=require("mongoose");
const {Schema} = mongoose

const userSchema= new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
    },
    age:{
        type: Number,
        min: 18,
    },
    password :{
        type: String,
        required: true
    },
    

});

userSchema.set("strict", "throw");
const CrudUser=mongoose.model("CrudUser", userSchema)
module.exports=CrudUser;