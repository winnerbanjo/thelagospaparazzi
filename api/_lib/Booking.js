import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
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
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: [
      'Wedding',
      'Corporate Event',
      'Portrait Session',
      'Fashion Shoot',
      'Celebrity Event',
      'Nightlife',
      'Editorial',
      'Other'
    ]
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  budget: {
    type: Number
  },
  specialRequirements: {
    type: String
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
