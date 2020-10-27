const express = require("express");
const router = express.Router();
const db = require("../db/models/index");
const {csrfProtection, asyncHandler} = require("./utils")
const bcrypt = require("bcryptjs")
router.get("/user/register", csrfProtection, asyncHandler((req, res) => {
    const user = db.Users.build();
    console.log("User obj", user)
    res.render("user-register", {csrfToken:req.csrfToken(), user, title:"Register"})

}));

router.post("/user/register", csrfProtection, asyncHandler((req, res) => {

}));

module.exports = router;
