const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id:{
        type: String,
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

const user = mongoose.model("user", userSchema)

module.exports = user