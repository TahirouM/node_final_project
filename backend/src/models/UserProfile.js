const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    unique: true
  },
  bracelet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NfcBracelet'
  },
  publicUrl: {
    type: String,
    required: [true, 'Public URL is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Public URL can only contain lowercase letters, numbers, and hyphens']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  avatar: {
    type: String,
    trim: true
  },
  theme: {
    type: String,
    default: '#3b82f6', // Primary blue
    match: [/^#[0-9A-Fa-f]{6}$/, 'Theme must be a valid hex color code']
  },
  links: [{
    type: {
      type: String,
      enum: ['linkedin', 'github', 'twitter', 'instagram', 'website', 'email', 'phone', 'other'],
      required: true
    },
    label: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  stats: {
    views: {
      type: Number,
      default: 0
    },
    scans: {
      type: Number,
      default: 0
    }
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Note: publicUrl and user field indexes are automatically created by unique: true constraints

// Sort links by order before returning
userProfileSchema.pre('save', function(next) {
  if (this.links && this.links.length > 0) {
    this.links.sort((a, b) => a.order - b.order);
  }
  next();
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
