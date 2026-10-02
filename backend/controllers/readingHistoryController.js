const History=require('../models/ReadingHistory');
exports.list=async(req,res)=>res.json(await History.find({userId:req.userId}).populate('bookId','title').sort({createdAt:-1}).limit(100));
