const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config({path: "config.env"})
const dbConnection=()=>{
    mongoose.connect(process.env.db_url)
    .then((conn)=>{
        console.log(`data base connected and connection host is :${conn.connection.host}`);
    })

    // .catch((err)=>{
    //     console.log(`database error:: ${err}`);
    //     process.exit(1);
    // });
};

module.exports=dbConnection;