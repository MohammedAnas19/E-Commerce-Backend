const {check,validationResult}=require('express-validator');

exports.validateSignUpRequest=[
    check('firstName')
    .notEmpty()
    .withMessage('First Name is REQUIRED'),
    check('lastName')
    .notEmpty()
    .withMessage('Last Name is REQUIRED'),
    check('email')
    .isEmail()
    .withMessage('Email is REQUIRED'),
    check('password')
    .isLength({min:8})
    .withMessage('Password must be atleast 8 character long'),
];

exports.validateSignInRequest=[
    check('email')
    .isEmail()
    .withMessage('Email is REQUIRED'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be atleast 6 character long'),
];

exports.isRequestValidated =(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0)
        return res.status(400).json({error:errors.array()[0].msg});
    next();
}