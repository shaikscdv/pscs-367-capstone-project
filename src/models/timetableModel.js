const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subjects: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
      days: [{ type: String, required: true }], // Change to array of strings
      timeRange: { type: String, required: true }, // Use timeRange instead of startTime and endTime
      batch: { type: String },
      type: { type: String, required: true },
      classroom: { type: String, required: true },
    },
  ],
});

const Timetable = mongoose.model(
  "Timetable",
  timetableSchema
);

module.exports = Timetable;
