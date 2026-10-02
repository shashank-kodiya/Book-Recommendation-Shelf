const fs=require('fs'),path=require('path'),Book=require('../models/Book');
const coverDirectory=path.join(__dirname,'../../frontend/images/covers');
const normalize=value=>value.toLowerCase().replace(/[^a-z0-9]/g,'');
const coverByTitle=new Map(fs.readdirSync(coverDirectory)
 .filter(file=>file.toLowerCase().endsWith('.svg'))
 .map(file=>[normalize(file.replace(/^\d+_/,'').replace(/\.svg$/i,'')),`/images/covers/${file}`]));
function withCover(book){
 const data=book.toObject();
 return {...data,cover:coverByTitle.get(normalize(book.title))||data.cover||''};
}
exports.list=async(req,res)=>{
 const q={};
 if(req.query.search) q.$or=[{title:new RegExp(req.query.search,'i')},{author:new RegExp(req.query.search,'i')}];
 if(req.query.genre) q.genre=req.query.genre;
 res.json((await Book.find(q).sort({createdAt:-1})).map(withCover));
};
exports.get=async(req,res)=>{const b=await Book.findById(req.params.id); if(!b)return res.status(404).json({message:'Book not found'});res.json(withCover(b));};
exports.genres=async(req,res)=>res.json(await Book.distinct('genre'));
exports.add=async(req,res)=>{const b=await Book.create(req.body);res.status(201).json(withCover(b));};
