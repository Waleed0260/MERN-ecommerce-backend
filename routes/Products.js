const express = require("express");
const router = express.Router();
const productSchema = require("../schemas/Products")
const Reviews = require("../schemas/Reviews");
const upload = require("../uploads/upload")
const {restrictSellerLoggedIn} = require("../middleware/sellerAuth")
// const {getUser} = require("../services/auth")

router.post("/", upload.array('images', 10), async(req, res)=>{
    // const getToken = getUser(req.cookies?.sellId);
    // const seller_id = getToken?.id;
    // const image = req.file.path;
    // console.log("image", image)
    const images = req.files.map(file => file.path);
    const {seller_id, name, description, price, category, brand, stock} = req.body;
    // const id = uuidv4();
    await productSchema.create({
        seller_id, name, description, price, category, brand, images, stock
    })
    res.status(201).json({successs:"product added successfully"})
})

router.get("/", async(req, res)=>{
    const products = await productSchema.find({});
  //  console.log("products", products)
    return res.json(products)
})
router.get("/userProducts", async(req, res)=>{
    const sellerId = req.body.sellerId;
    const sellerProducts = await productSchema.find({seller_id:sellerId})
    return res.json(sellerProducts);
})
router.get("/:id", async(req, res)=>{
    const id = req.body;
    const manyProducts = await productSchema.findOne({_id: id})
    console.log("products", manyProducts)
    return res.json(manyProducts)
})
router.patch("/:id", restrictSellerLoggedIn, async(req, res)=>{
    const id = req.params.id;
    const updateProducts = await productSchema.findByIdAndUpdate({id})
    return res.json({success:"updated successfully"})
})
router.delete("/",async(req, res)=>{
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