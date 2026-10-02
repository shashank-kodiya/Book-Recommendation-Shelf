const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
  const h=req.headers.authorization||'';
  if(!h.startsWith('Bearer ')) return res.status(401).json({message:'Login required'});
  try{ const p=jwt.verify(h.slice(7),process.env.JWT_SECRET); req.userId=p.id; next(); }
  catch(e){ return res.status(401).json({message:'Invalid or expired token'}); }
};
