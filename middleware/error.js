const ErrorResponse = require("../utility/ErrorResponse");

const errorHandler= (err,req,res,next) => {
    let error={...err}; //use of spread operator
    error.message=err.message;
    //log to console for dev
   console.log(err);

   //Mongoose Bad ObjectId
   if(err.name === 'CastError'){
        const message=`Requested Resource not found with id ${err.value} `;
        console.log(err.name);
        error=new ErrorResponse(message, 404);
   }

   //Mongoose Duplicate Key
   if(err.code === 11000){
        const message=`Duplicate Key value entered with id ${err.keyValue.name} `;
        console.log(err.name);
        error=new ErrorResponse(message, 400);
    }
    //Mongoose Validation Error
    if(err.name==='ValidationError'){
        const message=Object.values(err.errors).map(val=>val.message);
        console.log(err.name);
        error=new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Server Error!'
    });
};

module.exports=errorHandler;