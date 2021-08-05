const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // username: String,
  // designation: String,
  // profileimg: String,
  time: String,
  lcounts: Number,
  postContent: String,
  isAdminApproved: {
    type: Number,
    default: 0
    // 0 pending,
    // 1 approved,
    // 2 rejected
  },
  likedBy: {
    type: [String],
    default: undefined
  },
  //   comments: Comment[],
  // comcounts: Number,
  imagePath: String
});

module.exports = mongoose.model("Post", postSchema);
