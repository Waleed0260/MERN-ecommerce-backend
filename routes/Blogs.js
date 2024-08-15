// const express = require("express")
// const BlogPost = require("../schemas/BlogPost")
// const upload = require("../uploads/upload")
// const router = express.Router();

// router.post("/", upload.single('image'), async (req, res) => {
//     try {
//         const { title, desc, tags, categories, author } = req.body;
//         const image = req.file.path; // Access the path of the uploaded image

//         const newPost = new BlogPost({
//             image,
//             title,
//             desc,
//             tags: tags.split(','), // Assuming tags are sent as a comma-separated string
//             categories: categories.split(','),
//             author
//         });

//         const savedPost = await newPost.save();
//         res.status(201).json(savedPost);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// //get all blogs
// router.get("/", async(req, res)=>{
//     const allBlogs = await BlogPost.find({})
//     console.log("allBlogs", allBlogs)
//     return res.json(allBlogs);
// })

// //get blogs of same name
// router.get("/:id", async(req, res)=>{
//     const heading = req.params.id;
//     console.log("heading", heading)
//     const findBlog = await BlogPost.find({title:heading})
//     console.log("find", findBlog);
//     return res.json(findBlog)
// })

// //get single specified blog
// router.get("/:id", async(req, res)=>{
//     const heading = req.params.id;
//     console.log("heading", heading)
//     const findBlog = await BlogPost.findOne({title:heading})
//     console.log("find", findBlog);
//     return res.json(findBlog)
// })
// module.exports = router;


const express = require('express');
const router = express.Router();
const Product = require('../schemas/Products');

// Add a new category
router.post('/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// List all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a new product
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// List products by category
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.categoryId }).populate('category');
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
