const Company=require('../models/Company')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser= require('../middleware/fetchUser')
const JWT_secret = "iamagoodb$oy"

const create=async(req,res)=>{
    let success = false;
    let user=await Company.findOne({email:req.body.email})
    try {
       if(user){
           res.send("user already exists")
       }
           const {name,email,mobile,address,openingTime,closingTime}=req.body
           var salt = await bcrypt.genSalt(10);
           let hashPassword = await bcrypt.hash(req.body.password, salt);
           user =await Company.create({
               name,
               email,
               password:hashPassword,
               mobile,
               address,
               openingTime,
               closingTime
           })
           user.save()
           const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_secret)
        success=true;
        res.json({success,authtoken})
        //    res.status(200).json(user)
   
    } catch (error) {
       console.log(error)
    }
}

const get=async(req,res)=>{
    let user=await Company.find({})
    if(user){
        res.json(user)
    }
    else{
        res.status(404).json("no user found")
    }
}
const getOne=async(req,res)=>{
    
   try {
    let user=await Company.findById(req.body.id)
    console.log(user)
    if(user){
        res.json(user)
    }
    else{
        res.status(404).json("no user found")
    }
   } catch (error) {
    console.log(error)
   }
}

const update=async(req,res)=>{
    const { name,mobile,address,password } = req.body;
    var salt = await bcrypt.genSalt(10);
    let hashPassword=await bcrypt.hash(req.body.password,salt)
    try {
      const newuser = {};
      if (name) { newuser.name = name };
      if(mobile)   { newuser.mobile=mobile};
      if(address) { newuser.address=address}
      if(password) { 
        newuser.password=hashPassword
    }
  
      //find the note to be updated and update it
      let user = await Company.findById(req.params.id)
      console.log(req.params.id)
      console.log(user)
      if (!user) { return res.status(404).send("Not Found") }
      user = await Company.findByIdAndUpdate(req.params.id, { $set: newuser }, { new: true })
      res.json({ user })
  } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error")
  }
}

const deleteCompany=async(req,res)=>{
    try {
        let user=await Company.deleteOne(req.params._id);
        res.json({user,msg:"account deleted successfully"})
     } catch (error) {
        console.log(error)
     }
}

const login = async(req, res, next) =>{
    const {email,password}=req.body;
    let success = false;
    try{
        let user =await Company.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({error:"please try to login with correct credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({error:"wrong password or email"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_secret);
        success=true;
        res.json({success,authtoken,data})
        // res.status(200).json({success:true,msg:"login successful"})

        
  
    }catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
  }

module.exports={
    create,
    get,
    update,
    deleteCompany,
    login,
    getOne
}