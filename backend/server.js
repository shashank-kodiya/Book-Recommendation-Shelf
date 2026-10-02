require('dotenv').config();
const express=require('express'),path=require('path'),connectDB=require('./config/db');
const app=express();app.use(express.json());app.use(express.static(path.join(__dirname,'../frontend')));
app.get('/api/health',(req,res)=>res.json({ok:true}));
app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/books',require('./routes/bookRoutes'));
app.use('/api/shelf',require('./routes/shelfRoutes'));
app.use('/api/reviews',require('./routes/reviewRoutes'));
app.use('/api/dashboard',require('./routes/dashboardRoutes'));
app.use('/api/analytics',require('./routes/analyticsRoutes'));
app.use('/api/recommendations',require('./routes/recommendationRoutes'));
app.use('/api/reading-history',require('./routes/readingHistoryRoutes'));
app.use('/api/admin',require('./routes/adminRoutes'));
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'../frontend/index.html')));
const port=process.env.PORT||5000;
connectDB().then(()=>app.listen(port,()=>console.log(`🚀 Server running at http://localhost:${port}`))).catch(e=>{console.error(e);process.exit(1);});

module.exports = app;
