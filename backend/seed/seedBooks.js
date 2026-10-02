require('dotenv').config();
const mongoose=require('mongoose'),connectDB=require('../config/db'),Book=require('../models/Book');
const books=require('./bookData');
(async()=>{try{await connectDB();await Book.deleteMany({});await Book.insertMany(books);console.log(`✅ Inserted ${books.length} books, 20 pages each.`);await mongoose.disconnect();}catch(e){console.error(e);process.exit(1);}})();
