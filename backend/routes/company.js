const express = require('express');
const router=express.Router()
const {create,get,update,deleteCompany,login,getOne}=require('../controllers/company');
const fetchuser = require('../middleware/fetchUser');

router.post('/', create)
router.post('/login', login)
router.post('/getone',fetchuser, getOne)
router.get('/',fetchuser, get)
router.put('/:id',fetchuser, update)
router.delete('/:id', fetchuser,deleteCompany)



module.exports=router