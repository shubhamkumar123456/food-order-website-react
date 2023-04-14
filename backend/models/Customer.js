const mongoose =require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    cart:{
        type:Array,
        default:[]
    },
    price:{
        type:Array,
        default:[]
    }

    
});
const User= mongoose.model('users',UserSchema);
module.exports= User;