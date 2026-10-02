const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  bookId:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true},
  page:{type:Number,required:true},
  action:{type:String,enum:['started','progress','completed'],required:true}
},{timestamps:true});
module.exports=mongoose.model('ReadingHistory',schema);
