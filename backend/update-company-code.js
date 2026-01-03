import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from './models/Company.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dayflow';
const NEW_CODE = process.argv[2] || 'OI';

async function updateCompanyCode() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB\n');
    
    if (NEW_CODE.length !== 2) {
      console.error(' Error: Company code must be exactly 2 characters');
      process.exit(1);
    }
    
    
    const company = await Company.findOne({ name: /odooo/i });
    
    if (!company) {
      console.log('Company "odooo" not found');
      console.log('\nAvailable companies:');
      const allCompanies = await Company.find({});
      allCompanies.forEach(c => {
        console.log(`   - ${c.name} (code: ${c.code})`);
      });
      process.exit(1);
    }
    
    console.log(`Current: Company "${company.name}" has code "${company.code}"`);
    console.log(`Updating to: "${NEW_CODE}"\n`);
    
   
    company.code = NEW_CODE.toUpperCase();
    await company.save();
    
    console.log(` Successfully updated company code to "${NEW_CODE}"`);
    console.log(`\nNote: Existing employee Login IDs will still have the old code.`);
    console.log(`   New employees will use the updated code "${NEW_CODE}"\n`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(' Error:', error.message);
    process.exit(1);
  }
}

updateCompanyCode();

