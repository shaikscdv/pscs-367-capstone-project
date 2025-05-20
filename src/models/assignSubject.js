const mongoose = require("mongoose");

// Define the Subject Schema
const assignSubjectSchema = mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  },
  {
    timestamps: true,
  }
);

const AssignSubject = mongoose.model(
  "AssignSubject",
  assignSubjectSchema
);

module.exports = AssignSubject;
