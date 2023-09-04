const {validationResult}=require("express-validator")


exports.categoryValidatorMiddleware=(req,res,next)=>{
    //find the validation error in this request and wraps them in an object with handy function
        const errors= validationResult(req);
        if ( !errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
         }
         else
            next();
    }
