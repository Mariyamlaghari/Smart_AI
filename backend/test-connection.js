import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔄 Testing MongoDB connection...');
    console.log('📝 Connection String:', process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Port: ${conn.connection.port}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:');
    console.error(error.message);
    console.log('\n💡 Troubleshooting Tips:');
    console.log('1. Check IP Whitelist: https://cloud.mongodb.com/v2/')
    console.log('2. Verify username/password in connection string');
    console.log('3. Check if database name is correct');
    console.log('4. Ensure cluster is not paused');
    process.exit(1);
  }
};

testConnection();
