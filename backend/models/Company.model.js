import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  code: { 
    type: String, 
    required: true,
    uppercase: true,
    unique: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Company', CompanySchema);

