import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from './models/Company.model.js';

dotenv.config();

//mongodb connected
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dayflow';

async function checkCompanyCodes() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB\n');
    
    const companies = await Company.find({});
    
    if (companies.length === 0) {
      console.log('No companies found in database');
      process.exit(1);
    }
    
    console.log('Companies in database:\n');
    companies.forEach((company, index) => {
      console.log(`${index + 1}. Company Name: ${company.name}`);
      console.log(`Company Code: ${company.code}`);
      console.log(`Code Length: ${company.code.length} characters`);
      console.log(` Expected: 2 characters\n`);
    });
    
   
    const invalidCodes = companies.filter(c => c.code.length !== 2);
    if (invalidCodes.length > 0) {
      console.log('WARNING: Found companies with invalid codes (not 2 characters):');
      invalidCodes.forEach(c => {
        console.log(`   - ${c.name}: "${c.code}" (${c.code.length} chars)`);
      });
    }
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkCompanyCodes();

