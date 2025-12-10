const express = require("express")
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
    let error = req.flash("error")
    res.render("index",{ error , loggedin: false});
})


router.get("/shop",isloggedin,async function(req,res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", {products,success})
})

router.get("/addtocart/:productid",isloggedin,async function (req, res) {
    console.log(req.user)
   let user = await userModel.findOne({email: req.user.email})
   user.cart.push(req.params.productid)
   await user.save();
   req.flash("success","Added to cart")
   res.redirect("/shop");
})


router.get("/cart", isloggedin, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");

    let totalMRP = 0;
    let totalDiscount = 0;
    let platformFee = 0;
    let shippingFee = 0; // if always FREE, keep 0

    user.cart.forEach(item => {
        totalMRP += Number(item.price);
        totalDiscount += Number(item.discount);
        platformFee += 20;
        // shippingFee += 0  (FREE)
    });

    const grandTotal = totalMRP - totalDiscount + platformFee;

    res.render("cart", { 
        user, 
        breakdown: { 
            totalMRP, 
            totalDiscount, 
            platformFee, 
            shippingFee, 
            grandTotal 
        }
    });
});


router.get("/logout",isloggedin,function(req,res){
    res.render("shop")
})

module.exports = router;