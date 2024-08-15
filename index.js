const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
const connection = require("./db/dbConnection")
const addBlog = require("./routes/Blogs")
const userRoutes = require("./routes/user")
const products = require("./routes/Products")
const user = require("./schemas/user")
const addToCart = require("./routes/Cart")
const sellerRoutes = require("./routes/Seller")
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


connection("mongodb://127.0.0.1:27017/blog-app").then(()=>{
    console.log("db connected")
}).catch((e)=>{
    console.log("catch error", e)
})

// app.use("/", addBlog)
app.use("/products", products)
app.use("/addToCart", addToCart)
app.use("/user", userRoutes)
app.use("/sellerUser", sellerRoutes)
app.listen(8000, ()=>console.log("started"))