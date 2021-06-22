var express = require("express");
var router = express.Router();
var User = require("../models/user");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.render("users/register");
});
router.get("/login", function (req, res, next) {
  res.render("users/login");
});
router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/login");
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) return res.redirect("/login");
  req.session.user = user;
  return res.redirect("/");
});
router.post("/register", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.gender = req.body.gender;
  await user.save();
  res.redirect("/");
});

module.exports = router;
