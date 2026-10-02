const Shelf=require('../models/Shelf'),Book=require('../models/Book'),Review=require('../models/Review');
exports.get=async(req,res)=>{
 const shelves=await Shelf.find({userId:req.userId}).populate('bookId');
 const reviews=await Review.find({userId:req.userId}).populate('bookId').populate('userId','name').sort({rating:-1,updatedAt:-1});
 const validShelves=shelves.filter(s=>s.bookId);
 const counts={'Want to Read':0,'Reading':0,'Completed':0}; validShelves.forEach(s=>counts[s.status]++);
 const userReviews=reviews.filter(review=>review.bookId);
 const top=userReviews.slice(0,5).map(review=>({
  ...review.bookId.toObject(),
  averageRating:review.rating,
  reviews:[review]
 }));
 res.json({counts,total:validShelves.length,shelves:validShelves.map(s=>({book:s.bookId,status:s.status,lastPage:s.lastPage,progressPercent:Math.round(s.lastPage/(s.bookId.totalPages||20)*100)})),reviews:userReviews,top});
};
