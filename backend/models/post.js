const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  username: String,
  designation: String,
  time: String,
  lcounts: Number,
  postContent: String,
  //   comments: Comment[],
  comcounts: Number,
  profileimg: String
});

module.exports = mongoose.model("Post", postSchema);
