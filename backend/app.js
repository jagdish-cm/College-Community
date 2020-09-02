const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jcm:ramram@cluster0.j9nm3.mongodb.net/CTAE?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const app = express();

//some necessary routes to parse response and solving CORS error
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//User defined paths goes here

app.post("/api/posts", (req, res, next) => {
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

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.json({
      message: "posts fetched !",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log("id of post " + req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(() => {
    console.log("deleted in backend");
    res.status(201).end();
  });
});

module.exports = app;
