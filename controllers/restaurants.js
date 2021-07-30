const Restaurant = require('../Models/Restaurant');

//@desc   get all restaurents
//@routes GET api/v1/restaurents
//@access No Signin required
exports.getrestaurants=async(req,res,next)=>{
    try {
        const restaurant=await Restaurant.find(); 
        res.status(200).json({success:true,msg:"show all restaurents",count:restaurant.length,data:restaurant});
    } catch (error) {
        res.status(400).json({success:false,msg:"can't create new restaurents!"});
    }
    
}

//@desc   get a restaurent
//@routes GET api/v1/restaurent/:id
//@access No Signin required
exports.getrestaurant=async (req,res,next)=>{
    try {
        const restaurant=await Restaurant.findById(req.params.id); 
        if(!restaurant){
            return res.status(400).json({success:false,msg:"id not correctly formatted"});    
        }
        res.status(200).json({success:true,msg:"show the restaurent",data:restaurant});
    } catch (error) {
        res.status(400).json({success:false,msg:`can't Get restaurent ${req.params.id}`});
    }
    
}
//@desc   create new restaurents
//@routes POST api/v1/restaurents
//@access Signin required
exports.createrestaurant=async (req,res,next)=>{
    try {
        const restaurant=await Restaurant.create(req.body);
        res.status(201).json({success:true,msg:"create new restaurents",data: restaurant});
    } catch (error) {
        res.status(400).json({success:false,msg:"can't create new restaurents!"});
    }
    
}

//@desc   update restaurents
//@routes PUT api/v1/restaurents/:id
//@access  Signin required
exports.updaterestaurant=async(req,res,next)=>{
    try {
        const restaurant=await Restaurant.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true  
        });
        if(!restaurant){
            return res.status(400).json({success:false,msg:"id not correctly formatted"});    
        }
        res.status(200).json({success:true,msg:"show the updated restaurent",data:restaurant});
    } catch (error) {
        res.status(400).json({success:false,msg:`can't update restaurent with ${req.params.id}`});
    }
}

//@desc   delete restaurent
//@routes DELETE api/v1/restaurents/:id
//@access Signin required
exports.deleterestaurant=async(req,res,next)=>{
    try {
        const restaurant=await Restaurant.findByIdAndDelete(req.params.id)
        if(!restaurant){
            return res.status(400).json({success:false,msg:"id not correctly formatted"});    
        }
        res.status(200).json({success:true,msg:" restaurent deleted"});
    } catch (error) {
        res.status(400).json({success:false,msg:`can't Get restaurent ${req.params.id}`});
    }
    
}