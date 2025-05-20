const { Server } = require("socket.io");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const ChatGroup = require("../models/chatModal");
const Message = require("../models/messageModal");
dotenv.config();

// Key
const encryptionKey = process.env.KeyCrypt;
// console.log(process.env.KeyCrypt)

const encryptMessage = (message) => {
  const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
  const encryptedMessage = CryptoJS.AES.encrypt(
    message,
    CryptoJS.enc.Utf8.parse(encryptionKey),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  // Concatenate the IV to the encrypted message
  return iv.concat(encryptedMessage.ciphertext).toString(CryptoJS.enc.Hex);
};

const decryptMessage = (encryptedMessage) => {
  const iv = CryptoJS.enc.Hex.parse(encryptedMessage.substring(0, 32)); // Extract IV from the encrypted message
  const ciphertext = CryptoJS.enc.Hex.parse(encryptedMessage.substring(32));

  const decryptedMessage = CryptoJS.AES.decrypt(
    { ciphertext: ciphertext },
    CryptoJS.enc.Utf8.parse(encryptionKey),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decryptedMessage.toString(CryptoJS.enc.Utf8);
};

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5175",
        "https://main.d8lxuggtw74z7.amplifyapp.com/",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    const createChatRoom = async (subject) => {
      try {
        const existingChat = await ChatGroup.findOne({
          SubjectId: subject._id,
        });

        if (existingChat) {
          console.log("Chat group already exists for SubjectId:", subject._id);

          const oldMessages = await Message.find({
            chatRoom: existingChat._id,
          })
            .sort({ timestamp: 1 })
            .lean()
            .exec();

          const decryptedOldMessages = oldMessages.map((msg) => ({
            ...msg,
            content: decryptMessage(msg.content),
            senderId: msg.sender,
          }));

          // console.log(decryptedOldMessages);
          socket.emit("old-messages", decryptedOldMessages);

          return existingChat._id;
        } else {
          const newChatGroup = await ChatGroup.create({
            SubjectName: subject.subjectName,
            SubjectId: subject._id,
            // members: Members.map(
            //   (member) => ({
            //     userId: member.memberId,
            //     name: member.memberName,
            //   })
            // ),
          });

          console.log("Chat saved:", newChatGroup);

          io.emit("room-created", newChatGroup.SubjectName);

          return newChatGroup._id.toString();
        }
      } catch (error) {
        console.error("Error creating or checking chat:", error.message);
      }
    };

    socket.on("CreateRoom", async (subject) => {
      const roomId = await createChatRoom(subject);
      console.log("ROOM ID ==> ", roomId);

      if (roomId) {
        const roomIdString = roomId.toString();
        socket.join(roomIdString);
        console.log(`${socket.id} joined the room ${roomIdString}`);
        io.to(roomIdString).emit("room-created", roomIdString);
      }
    });

    socket.on(
      "newMessage",
      async (roomIdString, newMessage, studentId, studentName) => {
        try {
          const encryptedMessage = encryptMessage(newMessage);

          const message = await Message.create({
            content: encryptedMessage,
            sender: studentId,
            senderName: studentName,
            chatRoom: roomIdString,
          });

          if (message) {
            // console.log(
            //   "message ==> ",
            //   encryptedMessage
            // );
            const decryptedMessage = decryptMessage(encryptedMessage);

            const messageData = {
              decryptedMessage,
              senderId: studentId,
              senderName: studentName,
            };

            io.to(roomIdString).emit("received-message", messageData);
            console.log(
              "New Message ==> ",
              decryptedMessage,
              " ",
              roomIdString
            );
          }
        } catch (error) {
          console.log("Error in saving message ", error);
        }
      }
    );
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
