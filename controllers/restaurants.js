const Restaurant = require('../Models/Restaurant');

//@desc   get all restaurents
//@routes GET api/v1/restaurents
//@access No Signin required
exports.getrestaurants=(req,res,next)=>{
    res.status(404).json({success:true,msg:"show all restaurents"});
}

//@desc   get a restaurent
//@routes GET api/v1/restaurent/:id
//@access No Signin required
exports.getrestaurant=(req,res,next)=>{
    res.status(404).json({success:true,msg:`Get restaurent ${req.params.id}`});
}
//@desc   create new restaurents
//@routes POST api/v1/restaurents
//@access Signin required
exports.createrestaurant=async (req,res,next)=>{
    try {
        const restaurent=await Restaurant.create(req.body);
        res.status(201).json({success:true,msg:"create new restaurents",data: restaurent});
    } catch (error) {
        res.status(400).json({success:false,msg:"can't create new restaurents!"});
    }
    
}

//@desc   update restaurents
//@routes PUT api/v1/restaurents/:id
//@access  Signin required
exports.updaterestaurant=(req,res,next)=>{
    res.status(404).json({success:true,msg:`Update restaurent ${req.params.id}`});
}

//@desc   delete restaurent
//@routes DELETE api/v1/restaurents/:id
//@access Signin required
exports.deleterestaurant=(req,res,next)=>{
    res.status(404).json({success:true,msg:`Delete restaurent ${req.params.id}`});
}