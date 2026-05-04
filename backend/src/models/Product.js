const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  images: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['bracelet', 'accessory', 'bundle'],
    default: 'bracelet'
  },
  variants: [{
    color: {
      type: String,
      trim: true
    },
    size: {
      type: String,
      enum: ['S', 'M', 'L', 'XL'],
      default: 'M'
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    }
  }],
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual to check if any variant has stock
productSchema.virtual('hasStock').get(function() {
  if (!this.variants || this.variants.length === 0) return this.inStock;
  return this.variants.some(variant => variant.stock > 0);
});

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
