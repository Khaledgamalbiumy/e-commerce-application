const slugify=require("slugify")
const async_handler =require("express-async-handler")
const CategoryModel=require("../models/categorymodel")
const ApiError=require("../utils/apierror")
//types of handeling errors
//1-then() and catch()
//2-try() and catch()
//3-express_async_handler (catch the error and send it express)
//logic 
//desc get list of categories
//route get /api/v1/categories
//access public
exports.getcategories=async_handler( async (req,res)=>{
    const page =req.query.page*1||1;
    const limit=req.query.limit*1|| 5;
    const skip=(page-1)*limit
    const categories=await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({results: categories.length, page ,data:categories})
});
//desc get specific category 
//route GET /api/v1/categories
//1-using query    /?SEARCH=KHALED
exports.getcategory=async_handler(
    async (req,res)=>{
        const searchname =req.query.searchname;
        const category=await CategoryModel.findOne({name:searchname})
        res.status(200).json({data:category})
    }
)
//2-using req.params     /:id
exports.getonecategory=async_handler(
    async (req,res,next)=>{
        const {id}=req.params;
        const category=await CategoryModel.findById({_id:id});
        if(!category)
        {
            // res.status(404).json({msg:"sorry No category with this id"});
            return next(new ApiError("sorry No category with this id",404));
        }
        else        
            res.status(200).json({data:category});

    }
)
//desc create category
//route post   /api/v1/categories
//access    private
exports.createcategory=async_handler( async (req,res)=>{
    const name =req.body.name;
    //async await 
    const category=await CategoryModel.create({name,slug: slugify(name)});
    res.status(201).json({data: category}) 
});

//desc  update specific category
//route   PUT /:id
//access private
exports.updateCategory=async_handler(
    async (req,res,next)=>{
        const {id} =req.params;
        const {name}=req.body;
        const category= await CategoryModel.findOneAndUpdate(
            {_id: id},//search
            {name, slug:slugify(name)},//update
            {new: true}//get category after update
        )
        if(!category)
        {
            return next(new ApiError("sorry No category with this id to update",404));
        }
        else        
            res.status(200).json({data:category});
        
    }
);
//desc  delete specific category
//route   delete /:id
//access private
exports.deletecategory=async_handler(
    async (req,res,next)=>{
        const {id} =req.params;
        const category=await CategoryModel.findOneAndDelete({_id:id})
        if(!category)
        {
            return next(new ApiError("sorry No category with this id to delete",404));

        }
        else        
            res.status(200).json({data:category});
         
    }
)