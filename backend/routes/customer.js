const express = require('express')
const router=express.Router();
const {createUser,updateUser,deleteUser,getUser,login,getOne} = require('../controllers/customer')
var fetchuser= require('../middleware/fetchUser')

router.post('/', createUser)
router.put('/:id',fetchuser, updateUser)
router.post('/getone',fetchuser, getOne)
router.delete('/:id',fetchuser, deleteUser)
router.get('/', getUser)
router.post('/login', login)


module.exports =router