const User=require('../models/User');
module.exports=async(req,res,next)=>{
  const u=await User.findById(req.userId);
  if(!u || !u.isAdmin) return res.status(403).json({message:'Admin access required'});
  req.user=u; next();
};
