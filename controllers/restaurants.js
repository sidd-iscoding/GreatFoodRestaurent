const Restaurant = require('../Models/Restaurant');
const ErrorResponse=require('../utility/ErrorResponse');
const asyncHandler=require('../middleware/asyncErrorHandler');
const geocoder=require('../utility/geocoder');

//@desc   get all restaurents
//@routes GET api/v1/restaurents
//@access No Signin required
exports.getrestaurants=asyncHandler(async(req,res,next)=>{
        const reqQuery = {...req.query};        //use of spread opertor to copy req.query
        //Arrays of fields to exclude for filtering
        const removeFields = ['select','sort','page','limit'];

        //Loop over removeFields  and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        let query = Restaurant.find(JSON.parse(queryStr));  //we can also pass req.query directly with [$lt]

        //select fields
        if(req.query.select){
                const fields = req.query.select.split(',').join(' ');  //conver to array using split() and convert back to string seperated by space
                query = query.select(fields);
        }

        //sort
        if(req.query.sort){
                const sortBy = req.query.sort.split(',').join(' ');  
                query = query.sort(sortBy);
        }else{
                query = query.sort('-createdAt');
        }

        //pagination
        const page = parseInt(req.query.page,10) || 1;
        const limit = parseInt(req.query.limit,10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit; 
        query = query.skip(startIndex).limit(limit);
        const total = await Restaurant.countDocuments({});

        //Executing query
        const restaurant=await query; 

        //pagination result
        const pagination = {};
        if(endIndex < total){
                pagination.next = {
                        page: page + 1,
                        limit
                }
        }
        if(startIndex > 0 && startIndex < total ){
                pagination.prev = {
                        page: page - 1,
                        limit
                }
        }

        res.status(200).json({success:true,msg:"show all restaurents",count:restaurant.length,pagination,data:restaurant});
    
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

//@desc   Get restaurents within a radius
//@routes Get api/v1/restaurents/radius/:zipcode/:distance
//@access Signin required
exports.getRestaurantInRadius=asyncHandler(async(req,res,next)=>{
        const {zipcode,distance}=req.params;

        //Get lat/lng from geocoder
        const loc=await geocoder.geocode(zipcode);
        const  lat = loc[0].latitude;
        const lng = loc[0].longitude;

        //Calculate radiud using radians
        //To convert: distance to radians: divide the distance by the radius of the sphere (e.g. the Earth) in 
        //the same units as the distance measurement. The equatorial radius of the Earth is
        // approximately 3,963.2 miles or 6,378.1 kilometers.
        const radius = distance / 6378.1;
        
        const restaurants = await Restaurant.find({
                location: {$geoWithin: { $centerSphere: [ [ lng , lat ], radius ]}}
        });
        res.status(200).json({
                success:true,
                count: restaurants.length,
                data: restaurants
        });
    
});