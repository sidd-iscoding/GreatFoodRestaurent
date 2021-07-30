const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.status(404).json({success:true,msg:"create new restaurents"});
});
router.get('/:id',(req,res)=>{
    res.status(404).json({success:true,msg:`Get restaurent ${req.params.id}`});
});
router.post('/',(req,res)=>{
    res.status(404).json({success:true,msg:"create new restaurents"});
});
router.put('/:id',(req,res)=>{
    res.status(404).json({success:true,msg:`Update restaurent ${req.params.id}`});
});
router.delete('/:id',(req,res)=>{
    res.status(404).json({success:true,msg:`Delete restaurent ${req.params.id}`});
});

module.exports= router;