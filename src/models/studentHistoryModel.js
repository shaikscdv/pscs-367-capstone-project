const mongoose = require("mongoose");

// Define the Subject Schema
const studentHistorySchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
    },
  },
  {
    timestamps: true,
  }
);

const StudentHist = mongoose.model(
  "StudentHistory",
  studentHistorySchema
);

module.exports = StudentHist;
