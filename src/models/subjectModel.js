const mongoose = require("mongoose");

// Define the Subject Schema
const subjectSchema = mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    subjectNumber: {
      type: String,
      required: true,
    },
    semesterNumber: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["Theory", "Practical","Tutorial"], // Specify allowed values for the type field
      default: "Theory", // Default value for type field
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model(
  "Subject",
  subjectSchema
);

module.exports = Subject;
