const express=require('express')
const {categoryValidatorMiddleware} =require('../Middlewares/validatormiddleware')
const {deleteCategoryValidator,updateCategoryValidator,createCategoryValidaor,getCategoryValidator}=require('../utils/CategoryValidator')
//we use it in validate requests before going to erver 
const {deletecategory,updateCategory,getonecategory,getcategory,getcategories,createcategory}=require("../services/categoryservice")
const router =express.Router();

router.route("/")
.get(getcategories)
.post(createCategoryValidaor,categoryValidatorMiddleware,createcategory);
router.route("/search")
.get(getcategory)
router.route("/:id")
    .get(getCategoryValidator,categoryValidatorMiddleware ,getonecategory)

    .put(updateCategoryValidator,categoryValidatorMiddleware,updateCategory) 
    
    .delete(deleteCategoryValidator,categoryValidatorMiddleware,deletecategory);
module.exports=router;