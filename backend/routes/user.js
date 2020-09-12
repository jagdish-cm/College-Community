const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      name: req.body.name,
      branch: req.body.branch,
      batchFrom: req.body.batchFrom,
      batchTo: req.body.batchTo,
      enrolNo: req.body.enrolNo,
      password: hash,
      email: req.body.email,
      mobile: req.body.mobile
    });
    console.log(user);
    user
      .save()
      .then(result => {
        console.log("user created");
        res.status(201).json({ message: "User created", result: result });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  //email exist or not
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Email not found" });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({ message: "Password not matched" });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "sercret_and_longer_string"
      );
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({ message: "Auth failed" });
    });
});

router.get("/getCurUserInfo", checkAuth, (req, res, next) => {
  console.log("we are here");
  User.findById(req.userData.userId)
    .then(user => {
      return res.status(201).json({ user: user });
    })
    .catch(err => {
      console.log(err + " id not found");
    });
});

module.exports = router;
