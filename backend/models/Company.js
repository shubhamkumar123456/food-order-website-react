const mongoose=require('mongoose');
const companyschema=new mongoose.Schema({
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
    openingTime:{
        type:String,
        default:""
    },
    closingTime:{
        type:String,
        default:""
    },
    Fooditems:{
        type:Array,
        default:[]
    }

})

module.exports = mongoose.model("company",companyschema)