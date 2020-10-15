const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middlewire');
const router = express.Router();
const { createProduct } = require('../controllers/product');
const multer =require('multer');
const shortid =require('shortid');
const path=require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, req.body.name+"-"+shortid.generate()+".jpg")
    }
  })
   
  const upload=multer({storage});

router.post('/product/create',requireSignIn,adminMiddleware,upload.array('productPicture'),createProduct);

module.exports=router;