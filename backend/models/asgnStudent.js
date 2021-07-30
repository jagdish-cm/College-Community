const mongoose = require("mongoose");

const asgnStudent = new mongoose.Schema({
  studentId : {type: mongoose.Schema.Types.ObjectId},
  asgns : [ {
      asgnId : mongoose.Schema.Types.ObjectId,
      status : { type : String, required : true, default : 'pending' }
  }]
});

module.exports = mongoose.model("AsgnStudent", asgnStudent);
