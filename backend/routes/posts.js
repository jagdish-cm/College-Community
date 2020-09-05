const express = require("express");
const Post = require("../models/post");
const multer = require("multer");

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    username: req.body.username,
    designation: req.body.designation,
    time: req.body.time,
    lcounts: req.body.lcounts,
    postContent: req.body.postContent,
    //   comments: Comment[],
    comcounts: req.body.comcounts,
    profileimg: req.body.profileimg
  });
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({ postid: createdPost._id });
  });
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    const url = req.protocol + "://" + req.get("host");
    console.log("images url " + url);
    res.json({
      message: "posts fetched !",
      posts: documents
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    username: req.body.username,
    designation: req.body.designation,
    time: req.body.time,
    lcounts: req.body.lcounts,
    postContent: req.body.postContent,
    //   comments: Comment[],
    comcounts: req.body.comcounts,
    profileimg: req.body.profileimg
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(201).json({ message: "Update successful !" });
  });
});

router.delete("/:id", (req, res, next) => {
  console.log("id of post " + req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(() => {
    console.log("deleted in backend");
    res.status(201).end();
  });
});

module.exports = router;
