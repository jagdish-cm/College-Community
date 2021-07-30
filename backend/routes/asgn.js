const express = require("express");
// const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const Asgn = require("../models/asgn");
const Faculty = require("../models/faculty");
const User = require("../models/user");
const AsgnStudent = require("../models/asgnStudent");
const mongoose = require("mongoose");
const path = require("path");
// const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const checkFacAuth = require("../middleware/check-faculty-auth");

//multer setup
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./backend/Files/Asgns"));
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + name);
  },
});

//multer setup
var storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./backend/Files/SubmittedAsgns"));
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + name);
  },
});

const router = express.Router();

router.post(
  "/create",
  checkFacAuth,
  multer({ storage: storage }).array("files[]", 5),
  async (req, res, next) => {
    let fac = await Faculty.findById(req.userData.userId);
    if (fac) {
      console.log(req.body.branch);
      const asgn = new Asgn({
        creator: req.userData.userId,
        title: req.body.title,
        description: req.body.description,
        branch: req.body.branch,
        semester: req.body.sem,
        subject: req.body.subject,
        deadline: req.body.deadline,
        assignedOn: new Date(),
        submittedBy: new Array(),
      });
      if (req.files) {
        let files = [];
        req.files.forEach((file) => {
          const url =
            req.protocol +
            "://" +
            req.get("host") +
            "/Files/Asgns/" +
            file.filename;
          console.log(url);
          files.push(url);
        });
        asgn["files"] = files;
      }
      asgn
        .save()
        .then((newasgn) => {
          res.status(201).json({ newasgn });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    } else {
      res.status(403).json({ msg: "User is not authorised" });
    }
  }
);

router.get("/getStudentAsgn", checkAuth, async (req, res, next) => {
  try {
    console.log(req.query.semester + " ------- " + req.query.branch);
    let asgns = await Asgn.find({
      semester: req.query.semester,
      branch: req.query.branch,
    });
    res.status(200).json({ asgns });
  } catch (error) {
    res.status(403).json({ msg: error.msg });
  }
});

router.get("/facAsgns", checkFacAuth, async (req, res, next) => {
  try {
    let asgns = await Asgn.find({ creator: req.userData.userId });
    res.status(201).json({ asgns: asgns });
  } catch (error) {
    console.log(error);
    res.status(401).json(error.msg);
  }
});

router.get("/studentNames/:id", checkFacAuth, async (req, res, next) => {
  try {
    let asgn = await Asgn.findById(req.params.id);
    let submissions = [];
    for (let submission of asgn.submittedBy) {
      let obj = { ...submission._doc };
      let user = await User.findById(submission.studentId);
      obj["studentName"] = user.name;
      console.log(obj);
      submissions.push(obj);
    }
    console.log("result sending");
    res.status(201).json(submissions);
  } catch (error) {
    console.log(error);
    res.status(401).json(error.msg);
  }
});

router.post(
  "/submitByStudent",
  checkAuth,
  multer({ storage: storage2 }).array("files[]", 5),
  async (req, res, next) => {
    try {
      let files = [];
      if (req.files) {
        req.files.forEach((file) => {
          const url =
            req.protocol +
            "://" +
            req.get("host") +
            "/Files/Asgns/SubmittedAsgns/" +
            file.filename;
          console.log(url);
          files.push(url);
        });
      }
      console.log(req.body.asgnId);
      console.log(req.body.studentId);
      let result = await Asgn.update(
        {
          _id: req.body.asgnId,
          "submittedBy.studentId": req.body.studentId,
        },
        {
          $set: {
            "submittedBy.$.submittedFiles": files,
            "submittedBy.$.text": req.body.text,
            "submittedBy.$.submissionDate": Date.now(),
          },
        }
      );
      if (!result.nModified) {
        result = await Asgn.update(
          {
            _id: req.body.asgnId,
          },
          {
            $addToSet: {
              submittedBy: {
                studentId: req.userData.userId,
                submissionDate: Date.now(),
                submittedFiles: files,
                text: req.body.text,
              },
            },
          }
        );
        console.log(result);
      }
      res.status(201).json({ result: result });
    } catch (error) {
      console.log(error);
      res.status(403).json({ msg: error.msg });
    }
  }
);

module.exports = router;
