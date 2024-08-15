const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    id:{
        type: String
    },
    fullName: {
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    }, 
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
      required: true
    },
    businessName: {
      type: String,
      required: true
    },
    businessType: {
      type: String,
      required: true
    },
    businessRegistrationNumber: {
      type: String
    },
    paymentGatewayDetails: {
      type: String
    },
    taxIdentificationNumber: {
      type: String
    },
    productDetails: {
      type: String
    }
  });
  
  const Seller = mongoose.model('Seller', sellerSchema);
  
  module.exports = Seller;