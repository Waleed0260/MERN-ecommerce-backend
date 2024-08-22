const express = require("express");
const router = express.Router();
const productSchema = require("../schemas/Products");
const cartSchema = require("../schemas/Cart");
const {restrictUserLoggedIn} = require("../middleware/auth")

router.post("/", async(req, res) => {
  const id = req.body.id;
  const userId = req.cookies.uid;
  const product = await productSchema.findById({_id: id});
  await cartSchema.create({
    // user_id: userId,
    product_id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand,
    images: product.images,
    stock: product.stock
  });
  return res.status(201).json({ success: "successfully added schema" });
});
// GETTING ALL CART ITEMS
router.get("/", async (req, res) => {
  const cartItems = await cartSchema.find({});
  return res.status(200).json(cartItems);
});
// DETAILS OF ONE PRODUCTS
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const products = await productSchema.findOne({ id: id });
  return res.json(products);
});
//DELETING ONE PRODUCT
router.delete(async(req, res)=>{
    const id = req.body.id;
    await cartSchema.findOneAndDelete({id:id})
    return res.status(201).json({success:"successfully deleted item"})
})

module.exports = router;
