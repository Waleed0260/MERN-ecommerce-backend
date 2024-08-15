  const mongoose = require('mongoose');

  const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
  });
  
  const productSchema = new mongoose.Schema({
    user_id:{type: String, required:true}, // In this I want to store the id of the user and the schema for the user is in another file
    id: {type: String, required: true},
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    images: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 10'] },
    stock: { type: Number, required: true, min: 0 },
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
      reviews: [reviewSchema]
    },
    specifications: {
      weight: { type: String, trim: true },
      dimensions: { type: String, trim: true },
      material: { type: String, trim: true },
      color: { type: String, trim: true }
      // Add more specifications as needed
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  // Custom validation function to limit the number of images
  function arrayLimit(val) {
    return val.length <= 10;
  }
  
  // Middleware to update the updatedAt field on document update
  productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

  
  module.exports = mongoose.model('Product', productSchema);
  