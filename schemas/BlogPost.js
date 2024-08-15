const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    categories:[{
        type: String,
        trim: true
    }],
    author: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
