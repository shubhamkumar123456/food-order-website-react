const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    companyId:{
        type:String,
        required:true
    },
    productName:{
       type:String,
     required:true
    },
    quantity:{
        type:String,
        required:true
    },
    price:{
       type: String,
       required:true
    },
    desc:{
        type:String,
        default:""
    },
    img:{
        type:String,
        default:""
    },
    category:{
        type:String,
        default:""
    }

})

module.exports=mongoose.model('Product',productSchema)