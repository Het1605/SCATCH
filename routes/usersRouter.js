const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const {registerUser,loginUser,logout} = require("../controllers/authControllet")

router.get("/", function (req, res) {
    res.send("hey")
})

router.post("/register", registerUser);

router.post("/login",loginUser)

router.get("/logout",logout);

module.exports = router