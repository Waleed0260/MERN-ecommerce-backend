const mongoose = require("mongoose")

const reviewsSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    reviews:{
        type:String,
    },
    comment:{
        type: String,
    }
})

const Reviews = mongoose.model("reviewsSchema", reviewsSchema)
module.exports = Reviews;