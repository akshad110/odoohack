import mongoose from 'mongoose';

const SerialCounterSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  currentSerial: {
    type: Number,
    required: true,
    default: 0
  }
}, {
 
});

SerialCounterSchema.index({ companyId: 1, year: 1 }, { unique: true });

export default mongoose.model('SerialCounter', SerialCounterSchema);

