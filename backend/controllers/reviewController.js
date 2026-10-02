const Review=require('../models/Review'),Book=require('../models/Book');
async function refresh(bookId){
 const rows=await Review.find({bookId}); const avg=rows.length?rows.reduce((a,r)=>a+r.rating,0)/rows.length:4.2;
 await Book.findByIdAndUpdate(bookId,{averageRating:Math.round(avg*10)/10});
}
exports.list=async(req,res)=>res.json(await Review.find({bookId:req.params.bookId}).populate('userId','name').sort({createdAt:-1}));
exports.mine=async(req,res)=>{const r=await Review.findOne({userId:req.userId,bookId:req.params.bookId});res.json(r||null);};
exports.upsert=async(req,res)=>{
 const rating=Number(req.body.rating); if(rating<1||rating>5)return res.status(400).json({message:'Rating must be 1-5'});
 const r=await Review.findOneAndUpdate({userId:req.userId,bookId:req.params.bookId},{rating,review:req.body.review||''},{upsert:true,new:true,setDefaultsOnInsert:true});
 await refresh(req.params.bookId);res.json(r);
};
exports.remove=async(req,res)=>{await Review.deleteOne({_id:req.params.id,userId:req.userId});await refresh(req.params.bookId);res.json({ok:true});};
