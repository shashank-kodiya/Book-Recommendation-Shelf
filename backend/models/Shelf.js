const mongoose = require('mongoose');
const shelfSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  bookId:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true},
  status:{type:String,enum:['Want to Read','Reading','Completed'],default:'Want to Read'},
  lastPage:{type:Number,default:0},
  note:{type:String,default:''},
  bookmarkedPage:{type:Number,default:0}
},{timestamps:true});
shelfSchema.index({userId:1,bookId:1},{unique:true});
module.exports=mongoose.model('Shelf',shelfSchema);
