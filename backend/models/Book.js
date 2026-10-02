const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title:{type:String,required:true},
  author:{type:String,required:true},
  genre:{type:String,required:true},
  category:{type:String,default:'General'},
  description:String,
  pages:[{title:String,content:String}],
  totalPages:{type:Number,default:20},
  averageRating:{type:Number,default:4.2},
  cover:String,
  createdAt:{type:Date,default:Date.now}
});
bookSchema.pre('save',function(next){this.totalPages=this.pages.length;next();});
module.exports=mongoose.model('Book',bookSchema);
