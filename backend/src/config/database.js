import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
    };

    console.log('🔄 Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Error:\n`);
    console.error(`Error: ${error.message}\n`);
    
    if (error.message.includes('IP whitelist')) {
      console.log('💡 FIX: Add your IP to MongoDB Atlas Network Access');
      console.log('   URL: https://cloud.mongodb.com/v2/');
      console.log('   → Network Access → Add IP Address\n');
    } else if (error.message.includes('authentication')) {
      console.log('💡 FIX: Check username/password in connection string');
      console.log('   Go to: MongoDB Atlas → Connect → Copy Connection String\n');
    } else if (error.message.includes('Unable to parse')) {
      console.log('💡 FIX: Connection string format is incorrect');
      console.log('   Should be: mongodb+srv://username:password@cluster.mongodb.net/dbname\n');
    }
    
    process.exit(1);
  }
};

export default connectDB;

