const slugify  = require('slugify');
const Product = require('../models/product');
const shortid =require('shortid');

exports.createProduct=(req,res)=>{
    
   //res.status(201).json({file:req.files,body:req.body});
   const {name, price,description,offer,category,quantity}=req.body;
   let productPictures=[];
   if(req.files.length >0){
        productPictures=req.files.map(file=>{return{img:file.filename}})
   }
    const product=new Product({
        name:name,
        slug:slugify(name), 
        price,
        description,
        offer,
        productPictures,
        category,
        createdBy:req.user._id,
        quantity
    });
    product.save((error,product)=>{
        if(error){
            res.status(400).json({message:"Something Went Wrong in Product Adding",error:error});
        }
        if(product){
            res.status(201).json({product});
        }
    });
}
