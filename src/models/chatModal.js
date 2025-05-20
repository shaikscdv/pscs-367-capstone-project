const mongoose = require("mongoose");

const ChatGroupSchema = new mongoose.Schema({
  SubjectName: {
    type: String,
    required: true,
  },
  SubjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
    required: true,
  },
});

const ChatGroup = mongoose.model(
  "chatGroup",
  ChatGroupSchema
);

module.exports = ChatGroup;
