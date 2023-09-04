const mongoose=require("mongoose");

//1-creat schema
const categoryschema=new mongoose.Schema({
    name: { 
         type: String,
         trim:true,//remove spaces before and after sentenses
         required: [true, 'category required'] ,
         unique:[true,"category must be unique"],
         minlenght:[2,'too short category name'],
         maxlenght:[32,['too long category name']] 
    },
    //A and B => shoop ing.com/a-and-b
    slug:{
        type:String,
        lowercase: true,

    },
    img:String,
},{ timestamps: true});
//2-create model (convert schema to model)
const categorymodel=new mongoose.model("category",categoryschema);

module.exports=categorymodel;