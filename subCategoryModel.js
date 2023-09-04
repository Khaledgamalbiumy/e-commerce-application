const mongoose = require("mongoose");

//1-create schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name is unique"],
      minlenght: [3, "too short category name"],
      maxlenght: [32, ["too long category name"]],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId, //refere to the category that it is belong to
      ref: "category",
      required: [true, "sub categoey must be belong to parent category"],
    },
    parentcategory:{
        type:String,
        required:[true,"parent category name is required"]  
    }
  },
  { timestamps: true }
);

//2-create model (convert schema to model )

const subCategoryModel = new mongoose.model("subCategory", subCategorySchema);
module.exports = subCategoryModel;
