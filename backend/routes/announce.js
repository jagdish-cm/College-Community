const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const Announcement = require("../models/announce");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/announceFiles");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "/create",
  checkAuth,
  multer({ storage: storage }).array("files", 5),
  (req, res, next) => {
    const files = req.files;
    console.log(here);
    const announce = new Announcement({
      creator: req.userData.userId,
      time: req.body.time,
      title: req.body.title,
      description: req.body.description
    });
    if (files) {
      for (file in files) {
        const url = req.protocol + "://" + req.get("host");
        let filePath = url + "/announceFiles/" + file.filename;
        announce["filePaths"].append(filePath);
      }
      console.log(announce);
      announce.save().then(newAnnounce => {
        console.log(newAnnounce);
        res
          .status(201)
          .json({ ...newAnnounce.toObject(), id: newAnnounce._id });
      });
    }
  }
);

module.exports = router;
