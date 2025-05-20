const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "senderModel", // Dynamically reference either "Student" or "Teacher" model
    required: true,
  },
  senderName: {
    type: String,
  },
  senderModel: {
    type: String,
    enum: ["Student", "Teacher"], // To store the type of sender
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatGroup", // Reference to the ChatGroup model
    required: true,
  },
});

const Message = mongoose.model(
  "Message",
  messageSchema
);

module.exports = Message;
