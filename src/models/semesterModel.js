const mongoose = require("mongoose");

const semesterSchema = mongoose.Schema(
  {
    semesterNumber: {
      type: Number,
      required: true,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Semester = mongoose.model(
  "Semester",
  semesterSchema
);

module.exports = Semester;
