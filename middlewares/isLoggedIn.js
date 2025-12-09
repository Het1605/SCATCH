const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model");


module.exports = async function (req, res, next) {

    if (!req.cookies.token) { // it means token nahi hai
        req.flash("error", "you need to login first");
        return res.redirect("/")
    }


    try {
        let docoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
            .findOne({ email: docoded.email })
            .select("-password")
            
        req.user = user;
        next()
    } catch (err) {
        req.flash("error", "something went wrong");
        res.redirect("/")
    }
}