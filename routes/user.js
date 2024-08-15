const express = require("express")
const users = require("../schemas/user");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken")
const {setUser, getUser} = require("../services/auth")


router.post("/signUp", async(req, res)=>{
    const {name, email, password} = req.body;
    const id = uuidv4()
    const user = await users.create({
        id, name, email, password
    })
    return res.status(201).json({status:"success"})
})

router.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    const findEmail = await users.findOne({email, password})
    const token = setUser({id: findEmail.id, email: findEmail.email, name: findEmail.name});
    res.cookie("uid", token)
    return res.status(200).json(token);
})
router.get("/:id", async(req,res)=>{
    const user = await users.findOne({id: req.params.id});
    const token = req.cookies.uid;
    getUser(token)
    return res.status(200).json(user);
})
router.patch("/:id", async(req, res)=>{
    const update = await users.findByIdAndUpdate(req.params.id)
    return res.status(200).json({message:"user updated successfully"})
})
module.exports = router;



// mae agar product kae andar eik value user id ki add krdun ok

// or phir mae kisi tarah jo user loggedin hai us token mae sae uski id lae lun or phir mae wo id use id kae andar rakh dun tu kaesa rahey gaa