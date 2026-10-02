const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not defined in environment variables');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    // Do NOT use process.exit(1) on Vercel
  }
}

module.exports = connectDB;