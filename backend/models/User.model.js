import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    required: true
  },
  loginId: { 
    type: String, 
    unique: true, 
    sparse: true,
    uppercase: true
  },
  email: { 
    type: String, 
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  yearOfJoining: {
    type: Number,
    required: true
  },
  password: { 
    type: String, 
    required: true 
  },
  forcePasswordReset: { 
    type: Boolean, 
    default: false 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('User', UserSchema);

