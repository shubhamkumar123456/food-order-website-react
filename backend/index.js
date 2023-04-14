const express=  require('express');
const cors = require('cors')
const app = express();
const port =8080;
const connectToMongo= require('./db');
const customers=require('../backend/routes/customer')
const company=require('../backend/routes/company')
const product=require('../backend/routes/companyProduct')
const cart=require('../backend/routes/cart')
const multer  = require('multer')
const path = require('path')

connectToMongo()

app.use(cors());
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"public/images")));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage})
app.post('/api/upload', upload.single("file"),(req, res, next)=> {
    try {
        return res.status(200).json("file uploaded successfully")
    } catch (error) {
        console.log(error)    
    }
  })

// Route
app.use('/api/customer',customers)
app.use('/api/company',company)
app.use('/api/foodItem',product)
app.use('/api/cart',cart)

app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})