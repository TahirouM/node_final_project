const mongoose = require('mongoose');

const marketingContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, 'Section is required'],
    enum: ['hero', 'features', 'testimonials', 'faq', 'about'],
    unique: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Content is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for active content retrieval
marketingContentSchema.index({ section: 1, isActive: 1 });

module.exports = mongoose.model('MarketingContent', marketingContentSchema);
