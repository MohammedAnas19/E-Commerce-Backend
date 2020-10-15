const express = require('express');
const User= require('../models/user');
const jwt=require('jsonwebtoken');

exports.signup=(req, res) => {

    User.findOne({ email:req.body.email })
    .exec((error,user)=>{
      //console.log(req.body.email);
      if(user) return res.status(400).json({message:"User Already EXIST"});
      if(error) return res.status(400).json({message:error});
  
      const {firstName,lastName,email,password}=req.body;
      const _user=new User({firstName,lastName,email,password,username:Math.random().toString()});
      
      _user.save((error,data)=>{
        if(error){return res.status(400).json({message:"Something went WRONG",error:error});
        }
  
        if(data){return res.status(201).json({message:"User Created SUCCESSFULLY"});
        }
      });
    });  
}

exports.signin=(req, res) => {
    User.findOne({ email:req.body.email })
    .exec((error,user)=>{
        if(error) return res.status(400).json({message:error});
        if(user) {
            if(user.authenticate(req.body.password)){
                const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
                const {_id,fullName,firstName,lastName,email,role}=user;
                res.status(200).json({token,user:{_id,fullName,firstName,lastName,email,role}});
            }
            else{
                return res.status(400).json({message:"INCORRECT Username/Password"});
            }
        }
        else{
            return res.status(400).json({message:"Something Went WRONG!"});
        }
    });
}
