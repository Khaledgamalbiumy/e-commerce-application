const SubCategoryModel = require("../models/subCategoryModel");
const slugify = require("slugify");
const async_handler = require("express-async-handler");
const ApiError = require("../utils/apierror");
const subCategoryModel = require("../models/subCategoryModel");
const CategoryModel = require("../models/categorymodel");

//desc create subcategory
//route post   /api/v1/categories
//access    private
exports.createSubcategory = async_handler(async (req, res) => {
  const { name } = req.body;
  const { category } = req.body;
  let parentcategoryname

  await CategoryModel.findById(category)
  .then((data)=>{
    parentcategoryname=data.name;
  })
  .catch((err)=>{
    console.log(`error in getting parentcategoryname  :${err}`)
  })

  
    console.log("parentcategoryname:",parentcategoryname)
  const subcategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category: category,
    parentcategory: parentcategoryname,
  });

  res.status(201).json({ subcategory });
});

exports.getSubcategories=async_handler(async (req,res)=>{
    const page =req.query.page*1||1;
    const limit=req.query.limit*1|| 5;
    const skip=(page-1)*limit
    const subCategories=await subCategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({results: subCategories.length, page ,data:subCategories})
})

exports.getOneSubCategory=async_handler(async (req,res)=>{
    const id=req.params.id;
    const subCategory=await SubCategoryModel.findById({_id:id});
    res.status(200).json({subCategory})
})