const User=require('../models/User'),Shelf=require('../models/Shelf');
exports.users=async(req,res)=>res.json(await User.find().select('-password').sort({createdAt:-1}));
exports.activity=async(req,res)=>res.json(await Shelf.find().populate('userId','name email').populate('bookId','title totalPages').sort({updatedAt:-1}));
