const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const mongoUri ="mongodb://0.0.0.0:27017/FoodApp"
const connectToMongo= async()=>{
   await mongoose.connect(mongoUri)
        console.log("connected to mongoose successfully")
    }
    
module.exports= connectToMongo;