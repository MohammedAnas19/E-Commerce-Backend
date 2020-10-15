const express = require('express');
const router = express.Router();
const { signup, signin } = require('../../controllers/admin/auth');
const { validateSignInRequest,isRequestValidated, validateSignUpRequest } = require('../../validators/auth');

router.post('/admin/signin',validateSignInRequest,isRequestValidated,signin);

router.post('/admin/signup',validateSignUpRequest,isRequestValidated, signup);


module.exports=router;