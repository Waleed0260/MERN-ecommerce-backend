const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    id: {type: String, required: true},
    user_id: {type: String, required: true},
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
})

const cart = mongoose.model("CartSchema", CartSchema)
module.exports = cart;