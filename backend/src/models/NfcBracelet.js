const mongoose = require('mongoose');

const nfcBraceletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  nfcId: {
    type: String,
    required: [true, 'NFC ID is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  activatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster lookups
nfcBraceletSchema.index({ user: 1, isActive: 1 });

module.exports = mongoose.model('NfcBracelet', nfcBraceletSchema);
