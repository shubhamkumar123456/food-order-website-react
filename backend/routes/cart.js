const express = require('express');
const { addToCart, delToCart } = require('../controllers/cart');
const router = express.Router();

router.post('/', addToCart)
router.delete('/delone',delToCart)


module.exports = router
