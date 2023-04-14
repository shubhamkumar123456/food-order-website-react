const mongoose = require('mongoose');
const {Schema}= mongoose;
const CartSchema= new Schema({
    productId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('cart',CartSchema);