const express = require("express");
const router = express.Router();
const productSchema = require("../schemas/Products");
const cartSchema = require("../schemas/Cart");
const {restrictUserLoggedIn} = require("../middleware/auth")

router.post("/", restrictUserLoggedIn, async(req, res) => {
  const id = req.body.id;
  const userId = req.cookies.uid;
  const product = await productSchema.findOne({ _id: id });
  await cartSchema.create({
    id: product.id,
    user_id: userId,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand,
  });
  return res.status(201).json({ success: "successfully added schema" });
});
// GETTING ALL PRODUCT ITEMS
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
