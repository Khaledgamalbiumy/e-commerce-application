//modules
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbconnection = require("./config/database");
const categoryroute = require("./routes/categoryroute");
const subcategoryroute = require("./routes/subcategoryroute");
const APIERROR = require("./utils/apierror");
const { globalerror } = require("./Middlewares/errormiddleware");

//connect with DB
dbconnection();
//express app
const app = express();
//middlewares
app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode :  ${process.env.NODE_ENV}`);
}
dotenv.config({ path: "config.env" }); // const path = require('path');

//mount routes

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/subcategories", subcategoryroute);
app.use("/api/v1/categories", categoryroute);
app.all("*", (req, res, next) => {
  //create error and send it to error handling
  // next(err.message)//send error to next midlleware
  next(new APIERROR(`can not find this route:${req.originalUrl}`, 400));
});
//error handling(if error occur in app.use("/api/v1/categories",categoryroute )
//Global error handling midlleware for express errors (error come from express catched with exptress error handler)
app.use(globalerror);

// (handling other error(rejections) outside express) Events => list => callback error
process.on("unhandledRejection", (err) => {
  console.error(`un handled rejection:
    =>error name :${err.name} 
    =>error message : ${err.message}`);
  server.close(() => {
    console.error("Appliction is shutting down.....");
    process.exit(1); //after close server exite the application
  });
});

const port = process.env.PORT || 5000;
console.log(`port:${port}`);
const server = app.listen(port, () => {
  console.log("server is listenning ");
});
