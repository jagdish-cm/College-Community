const mongoose = require("mongoose");

const asgnSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  assignedOn: { type: String, required: true },
  deadline: { type: String, required: true },
  files: Array,
  submittedBy: [
    {
      studentId: mongoose.Schema.Types.ObjectId,
      submissionDate: String,
      text: String,
      submittedFiles: Array,
    },
  ],
});

module.exports = mongoose.model("Asgn", asgnSchema);
