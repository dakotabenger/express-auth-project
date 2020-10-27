const express = require("express");
const router = express.Router();
const db = require("../db/models/index");
const {csrfProtection, asyncHandler} = require("./utils")
const bcrypt = require("bcryptjs")
const { check, validationResult } = require('express-validator');

router.get("/user/register", csrfProtection, asyncHandler(async (req, res) => {
    const user = db.Users.build();
    console.log("User obj", user)
    res.render("user-register", {csrfToken:req.csrfToken(), user, title:"Register"})
    
}));

const validator = [check("firstName")
.exists({ checkFalsy: true })
.withMessage("Please provide a value for first name.")
.isLength({max:50})
.withMessage("First name must be less than 50 characters long"),
check('lastName')
.exists({ checkFalsy: true })
.withMessage("Please provide a last name")
.isLength({max:50})
.withMessage("Name is too long"),
check('emailAddress')
.isEmail()
.withMessage('Please provide a valid email address')
.isLength({max:255})
.withMessage("Email is too long")
.exists({checkFalsy:true})
.withMessage("Please provide an email address.")
]
router.post("/user/register", csrfProtection, validator, asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req)
  
  if (validationErrors.isEmpty()) {

  } else {
      console.log('validationErrors', validationErrors)
      res.render('user-register', {validationErrors, csrfToken: req.csrfToken(), title: "Register", user: {}})
  }
}));

module.exports = router;
