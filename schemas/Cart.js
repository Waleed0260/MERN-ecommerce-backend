const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    // user_id:{type: String, required:true}, 
    product_id: {type: String, required: true},
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    images: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 10'] },
    stock: { type: Number, required: true, min: 0 },
})

function arrayLimit(val) {
    return val.length <= 10;
  }

const cart = mongoose.model("CartSchema", CartSchema)
module.exports = cart;