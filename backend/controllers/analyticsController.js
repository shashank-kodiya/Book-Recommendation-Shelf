const Shelf=require('../models/Shelf'),Book=require('../models/Book');
exports.get=async(req,res)=>{
 const shelves=await Shelf.find({userId:req.userId}).populate('bookId');
 const validShelves=shelves.filter(s=>s.bookId);
 const genre={}; validShelves.forEach(s=>genre[s.bookId.genre]=(genre[s.bookId.genre]||0)+1);
 const pages=validShelves.reduce((a,s)=>a+s.lastPage,0);
 res.json({genre,books:validShelves.length,pages,completed:validShelves.filter(s=>s.status==='Completed').length});
};
