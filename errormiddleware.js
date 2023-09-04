
exports.globalerror=(err,req,res,next)=>{

    err.statuscode=err.statuscode || 500;
    err.status=err.status || 'error';
    if (process.env.NODE_ENV=='development')
    {
        senderrorfordev(err,res);
    }
    else
        senderrorforproductionmode(err,res);
}
const senderrorfordev=(err,res)=>{
    return res.status(err.statuscode).json({
        status:err.statuscode,
        message:err.message,
        Error:err,
        stack:err.stack
    })
}
const senderrorforproductionmode=(err,res)=>{
    return res.status(err.statuscode).json({
        status:err.statuscode,
        message:err.message,
    })
}