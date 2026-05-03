const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,      // Disable command buffering – fail fast if not connected
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    };
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected');
      return mongoose;
    }).catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;