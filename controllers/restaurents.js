//@desc   get all restaurents
//@routes GET api/v1/restaurents
//@access No Signin required
exports.getrestaurents=(req,res,next)=>{
    res.status(404).json({success:true,msg:"show all restaurents"});
}

//@desc   get a restaurent
//@routes GET api/v1/restaurent/:id
//@access No Signin required
exports.getrestaurent=(req,res,next)=>{
    res.status(404).json({success:true,msg:`Get restaurent ${req.params.id}`});
}
//@desc   create new restaurents
//@routes POST api/v1/restaurents
//@access Signin required
exports.createrestaurent=(req,res,next)=>{
    res.status(404).json({success:true,msg:"create new restaurents"});
}

//@desc   update restaurents
//@routes PUT api/v1/restaurents/:id
//@access  Signin required
exports.updaterestaurent=(req,res,next)=>{
    res.status(404).json({success:true,msg:`Update restaurent ${req.params.id}`});
}

//@desc   delete restaurent
//@routes DELETE api/v1/restaurents/:id
//@access Signin required
exports.deleterestaurent=(req,res,next)=>{
    res.status(404).json({success:true,msg:`Delete restaurent ${req.params.id}`});
}