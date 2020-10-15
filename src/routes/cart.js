const express = require('express');
const { addItemToCart } = require('../controllers/cart');
const { requireSignIn, userMiddleware } = require('../common-middlewire');
const router = express.Router();

router.post('/user/cart/addtocart',requireSignIn,userMiddleware,addItemToCart);
//router.get('/category/getcategory',getCategories);

module.exports=router;