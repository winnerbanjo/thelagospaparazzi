import mongoose from 'mongoose';

const masterclassApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  instagramHandle: {
    type: String,
    required: true,
    trim: true
  },
  currentLevel: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  deviceInUse: {
    type: String,
    required: true,
    trim: true
  },
  attractionReason: {
    type: String,
    required: true,
    trim: true
  },
  currentLimitation: {
    type: String,
    required: true,
    trim: true
  },
  expectedResult: {
    type: String,
    required: true,
    trim: true
  },
  commitmentStatus: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  paymentMethod: {
    type: String,
    default: 'Bank Transfer'
  },
  transferReference: {
    type: String,
    trim: true
  },
  paymentConfirmed: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'accepted', 'waitlisted', 'declined'],
    default: 'new'
  }
}, {
  timestamps: true
});

export default mongoose.models.MasterclassApplication || mongoose.model('MasterclassApplication', masterclassApplicationSchema);
