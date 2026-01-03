import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dayflow';

console.log('Checking MongoDB connection...');
console.log(`Connection URI: ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}\n`);

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4,
})
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('MongoDB connection failed!');
    console.error(`\nError: ${error.message}\n`);
    process.exit(1);
  });

