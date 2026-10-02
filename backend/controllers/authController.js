const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

function token(u){return jwt.sign({id:u._id},process.env.JWT_SECRET,{expiresIn:'7d'});}
exports.register=async(req,res)=>{
 try{
  const {name,email,password}=req.body;
  if(!name||!email||!password) return res.status(400).json({message:'Name, email and password are required'});
  if(await User.findOne({email:email.toLowerCase()})) return res.status(409).json({message:'Email already registered'});
  const admins=(process.env.ADMIN_EMAILS||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);
  const u=await User.create({name,email:email.toLowerCase(),password:await bcrypt.hash(password,10),
    isAdmin:admins.includes(email.toLowerCase()),isOnline:true,lastLogin:new Date(),lastActivity:new Date()});
  res.json({token:token(u),user:{id:u._id,name:u.name,email:u.email,isAdmin:u.isAdmin}});
 }catch(e){res.status(500).json({message:e.message});}
};
exports.login=async(req,res)=>{
 try{
  const {email,password}=req.body; const u=await User.findOne({email:email.toLowerCase()});
  if(!u || !(await bcrypt.compare(password,u.password))) return res.status(401).json({message:'Invalid email or password'});
  u.isOnline=true;u.lastLogin=new Date();u.lastActivity=new Date();await u.save();
  res.json({token:token(u),user:{id:u._id,name:u.name,email:u.email,isAdmin:u.isAdmin}});
 }catch(e){res.status(500).json({message:e.message});}
};
exports.logout=async(req,res)=>{
 const u=await User.findById(req.userId); if(u){u.isOnline=false;u.lastLogout=new Date();await u.save();}
 res.json({message:'Logged out'});
};
exports.heartbeat=async(req,res)=>{await User.findByIdAndUpdate(req.userId,{isOnline:true,lastActivity:new Date()});res.json({ok:true});};
exports.me=async(req,res)=>{const u=await User.findById(req.userId).select('-password');res.json(u);};
