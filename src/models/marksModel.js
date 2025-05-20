const mongoose = require("mongoose");

const marksSchema = mongoose.Schema(
  {
    SubjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    StudentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    Marks: [
      {
        type: Number,
        default: 0,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Marks = mongoose.model(
  "Marks",
  marksSchema
);

module.exports = Marks;
