const User = require('../models/Customer')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_secret = "iamagoodb$oy"


// 1 create user
const createUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    try {
        if (user) {
            res.send("user already exists")
        }
        const { name, email, password, mobile, address } = req.body
        var salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name,
            email,
            password: hashPassword,
            mobile,
            address
        })
        user.save()
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret)
        success = true;
        res.json({ success, authtoken, data })
        // res.status(200).json(user)

    } catch (error) {
        console.log(error)
    }
}

// 2. Get user information
const getUser = async (req, res) => {
    let user = await User.find({})
    if (user) {
        res.json(user)
    }
    else {
        res.status(404).json("no user found")
    }
}

// 3 Delete User
const deleteUser = async (req, res) => {
    try {
        let user = await User.deleteOne(req.params._id);
        res.json({ user, msg: "user deleted successfully" })
    } catch (error) {
        console.log(error)
    }
}

// 4 update user information
const updateUser = async (req, res) => {
    const { name, mobile, address, password } = req.body;
    try {
        const newuser = {};
        if (name) { newuser.name = name };
        if (mobile) { newuser.mobile = mobile };
        if (address) { newuser.address = address }
        if (password) { newuser.password = password }

        //find the note to be updated and update it
        let user = await User.findById(req.params.id)
        console.log(req.params.id)
        console.log(user)
        if (!user) { return res.status(404).send("Not Found") }
        user = await User.findByIdAndUpdate(req.params.id, { $set: newuser }, { new: true })
        res.json({ user })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
}

// login user
const login = async (req, res, next) => {
    const { email, password } = req.body;
    let success = false;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "wrong password or email" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        success = true;
       
        res.status(200).json({ success, authtoken, data})
        // res.status(200).json({success:true,msg:"login successful"})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
}
const getOne=async(req,res)=>{
    
    try {
     let user=await User.findById(req.body.id)
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

module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser,
    login,
    getOne
}