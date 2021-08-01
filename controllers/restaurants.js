const Restaurant = require('../Models/Restaurant');
const ErrorResponse=require('../utility/ErrorResponse');
const asyncHandler=require('../middleware/asyncErrorHandler');

//@desc   get all restaurents
//@routes GET api/v1/restaurents
//@access No Signin required
exports.getrestaurants=asyncHandler(async(req,res,next)=>{
    
        const restaurant=await Restaurant.find(); 
        res.status(200).json({success:true,msg:"show all restaurents",count:restaurant.length,data:restaurant});
    
});

//@desc   get a restaurent
//@routes GET api/v1/restaurent/:id
//@access No Signin required
exports.getrestaurant=asyncHandler(async (req,res,next)=>{
        const restaurant=await Restaurant.findById(req.params.id); 
        if(!restaurant){
            return next(new ErrorResponse(`Restaurant not found with ${req.params.id}`,404));   
        }
        res.status(200).json({success:true,msg:"show the restaurent",data:restaurant});
    
    
});
//@desc   create new restaurents
//@routes POST api/v1/restaurents
//@access Signin required
exports.createrestaurant=asyncHandler(async (req,res,next)=>{
        const restaurant=await Restaurant.create(req.body);
        res.status(201).json({success:true,msg:"create new restaurents",data: restaurant});
    
});

//@desc   update restaurents
//@routes PUT api/v1/restaurents/:id
//@access  Signin required
exports.updaterestaurant=asyncHandler(async(req,res,next)=>{
        const restaurant=await Restaurant.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true  
        });
        if(!restaurant){
            return next(new ErrorResponse(`Restaurant not found with ${req.params.id}`,404));      
        }
        res.status(200).json({success:true,msg:"show the updated restaurent",data:restaurant});
    
});

//@desc   delete restaurent
//@routes DELETE api/v1/restaurents/:id
//@access Signin required
exports.deleterestaurant=asyncHandler(async(req,res,next)=>{
        const restaurant=await Restaurant.findByIdAndDelete(req.params.id)
        if(!restaurant){
            return next(new ErrorResponse(`Restaurant not found with ${req.params.id}`,404));      
        }
        res.status(200).json({success:true,msg:" restaurent deleted"});
    
});