const express = require("express");
const {getOneSubCategory,getSubcategories ,createSubcategory } = require("../services/subCategoryService");
const {categoryValidatorMiddleware} =require('../Middlewares/validatormiddleware')
const {createSubCategoryValidaor}=require("../utils/sunbCategoryValidator")
const router = express.Router();

router.route("/")
.post(createSubCategoryValidaor,categoryValidatorMiddleware,createSubcategory)
.get(getSubcategories);
router.route("/:id").get(getOneSubCategory)
module.exports = router;
