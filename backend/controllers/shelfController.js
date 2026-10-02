const Shelf=require('../models/Shelf'), Book=require('../models/Book'), History=require('../models/ReadingHistory');

function view(s){
 const b=s.bookId; if(!b)return null;
 const total=b.totalPages||b.pages.length||20; const last=Math.max(0,Math.min(s.lastPage,total));
 return {...s.toObject(),book:b,pagesCompleted:last,pagesRemaining:total-last,progressPercent:Math.round(last/total*100)};
}
exports.list=async(req,res)=>{const rows=await Shelf.find({userId:req.userId}).populate('bookId');res.json(rows.filter(s=>s.bookId).map(view));};
exports.add=async(req,res)=>{
 const b=await Book.findById(req.params.bookId); if(!b)return res.status(404).json({message:'Book not found'});
 let s=await Shelf.findOne({userId:req.userId,bookId:b._id});
 if(!s)s=await Shelf.create({userId:req.userId,bookId:b._id,status:'Want to Read'});
 res.json(view(await s.populate('bookId')));
};
exports.update=async(req,res)=>{
 const s=await Shelf.findOne({userId:req.userId,_id:req.params.id}).populate('bookId');
 if(!s||!s.bookId)return res.status(404).json({message:'Shelf item not found'});
 if(req.body.status && ['Want to Read','Reading','Completed'].includes(req.body.status)) s.status=req.body.status;
 if(req.body.page!==undefined){
   const total=s.bookId.totalPages||20; const page=Math.max(0,Math.min(Number(req.body.page),total));
   const old=s.lastPage;s.lastPage=page;
   if(page>0 && old===0) {s.status='Reading';await History.create({userId:req.userId,bookId:s.bookId._id,page,action:'started'});}
   else if(page>old) {s.status=page>=total?'Completed':'Reading';await History.create({userId:req.userId,bookId:s.bookId._id,page,action:page>=total?'completed':'progress'});}
 }
 if(req.body.note!==undefined)s.note=String(req.body.note);
 if(req.body.bookmarkedPage!==undefined)s.bookmarkedPage=Number(req.body.bookmarkedPage)||0;
 await s.save();res.json(view(s));
};
exports.remove=async(req,res)=>{await Shelf.deleteOne({_id:req.params.id,userId:req.userId});res.json({ok:true});};
exports.one=async(req,res)=>{const s=await Shelf.findOne({userId:req.userId,bookId:req.params.bookId}).populate('bookId');res.json(s?view(s):null);};
