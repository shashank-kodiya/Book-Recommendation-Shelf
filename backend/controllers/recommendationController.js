const Shelf=require('../models/Shelf'),Review=require('../models/Review'),Book=require('../models/Book');
exports.get=async(req,res)=>{
 const shelves=await Shelf.find({userId:req.userId}).populate('bookId');
 const reviews=await Review.find({userId:req.userId}).populate('bookId');
 const validShelves=shelves.filter(s=>s.bookId), validReviews=reviews.filter(r=>r.bookId);
 const owned=new Set(validShelves.map(s=>String(s.bookId._id)));
 const counts={};
 [...validShelves.filter(s=>['Reading','Completed'].includes(s.status)).map(s=>s.bookId.genre),...validReviews.map(r=>r.bookId.genre)].forEach(g=>counts[g]=(counts[g]||0)+1);
 const fav=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0]);
 let books=await Book.find({_id:{$nin:[...owned]},...(fav.length?{genre:{$in:fav}}:{})}).sort({averageRating:-1}).limit(8);
 res.json(books.map(b=>({book:b,reason:fav.length?`Because you have shown interest in ${b.genre}.`:'Top-rated picks to get your shelf started.'})));
};
