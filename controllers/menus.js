const Menus = require('../Models/Menus');
const ErrorResponse=require('../utility/ErrorResponse');
const asyncHandler=require('../middleware/asyncErrorHandler');

//@desc   get all menus
//@routes GET api/v1/menus
//@routes GET api/v1/restaurants/:resturId/menus
//@access No Signin required
exports.getmenus=asyncHandler(async(req,res,next)=>{
    let query;
    if(req.params.resturId){
        query = Menus.find({resturant: req.params.resturId});
    }else{
        query = Menus.find().populate({    //just using populate('resturant') will populate the resturant 
                                            // attribute in Menus.js with all the fields of resturant to avoid that
            path: 'resturant',
            select: 'name description'
        });
    }

    const menus = await query;

    res.status(200).json({success:true,msg:"show the menus",count: menus.length,data:menus});
});