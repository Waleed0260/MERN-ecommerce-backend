const express = require("express");
const router = express.Router();
const productSchema = require("../schemas/Products")
const Reviews = require("../schemas/Reviews");
const { v4: uuidv4 } = require('uuid');
const {restrictSellerLoggedIn} = require("../middleware/sellerAuth")

router.post("/",restrictSellerLoggedIn, async(req, res)=>{
    const {name, description, price, category, brand, stock} = req.body;
    const id = uuidv4();

    await productSchema.create({
        id, name, description, price, category, brand, stock
    })
    res.status(201).json({successs:"product added successfully"})
})

router.get("/", async(req, res)=>{
    const products = await productSchema.find({});
  //  console.log("products", products)
    return res.json(products)
})
router.get("/:id", async(req, res)=>{
    const id = req.params.id;
    const products = await productSchema.findOne({_id: id});
    return res.json(products)
})
router.patch("/:id", restrictSellerLoggedIn, async(req, res)=>{
    const id = req.params.id;
    const updateProducts = await productSchema.findByIdAndUpdate({id})
    return res.json({success:"updated successfully"})
})
router.delete(async(req, res)=>{
    const id = req.body.id;
    const deleteProduct = await productSchema.findOneAndDelete({_id: id})
    return res.json({success:"user deleted succefffully"})
})

router.post("/review",async(req, res)=>{
    const {userId, rating, comment } = req.body;
    await Reviews.create({
        userId,
        rating,
        comment
    })
    res.status(201).json({success:"Review added successfully"})
})

module.exports = router;