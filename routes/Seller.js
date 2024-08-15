const express = require("express")
const sellerSchema = require("../schemas/Seller")
const { v4: uuidv4 } = require('uuid');
const {setUser, getUser} = require("../services/auth")

const router = express.Router();

router.post("/signUp", async(req, res)=>{
    const{fullName, email, password, address, contactNumber, businessName, businessType} = req.body;
    const id = uuidv4()
    await sellerSchema.create({
        id, fullName, email, password, address, contactNumber, businessName, businessType
    })
    return res.status(201).json({success:"Seller User created successfully"})
})

router.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    const sellerUser = await sellerSchema.findOne({email, password})
    const token = setUser({id: sellerUser.id, email: sellerUser.email, name: sellerUser.name, address: sellerUser.address, contactNumber: sellerUser.contactNumber, businessName: sellerUser.businessName});
    res.cookie("sellId", token)
    return res.status(200).json({success:"logged in Successfully"});
})

router.get("/:id", async(req, res)=>{
    const id = req.params.id;
    const findSeller = await sellerSchema.findOne({id:id})
    return res.status(200).json(findSeller);
})

module.exports = router