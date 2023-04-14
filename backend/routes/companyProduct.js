const express = require('express');
const router= express.Router();
const {create,get,update,delProduct,singleget, getOne} = require('../controllers/companyProduct');
const fetchuser = require('../middleware/fetchUser');

router.post('/',create)
router.get('/', get)
router.post('/single',fetchuser, singleget)
router.post('/getone', getOne)
router.put('/:_id', fetchuser,update)
router.delete('/', fetchuser,delProduct)


module.exports =router