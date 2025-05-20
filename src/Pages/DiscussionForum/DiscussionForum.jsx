import React, { useMemo } from "react";
import io from "socket.io-client";
import config from "../../configSocket/configSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { MySubject } from "../../Services/discussionForumServices";
import { FcReadingEbook } from "react-icons/fc";
import { getTeacherSubjects } from "../../Services/teacherServices";
import { IoSend } from "react-icons/io5";

export default function DiscussionForum() {
  const socket = useMemo(() => {
    return io(config.serverUrl, {
      withCredentials: true,
    });
  }, []);

  const { user } = useAuth();
  // console.log(user);
  const [subjects, setSubject] = useState([]);
  const [selectSub, setSelectSub] = useState();

  const [newMessage, setNewMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("old-messages", (oldMessages) => {
      console.log("----", oldMessages);
      setMessageReceived(
        oldMessages.map((oldmss) => ({
          content: oldmss.content,
          senderId: oldmss.senderId,
          senderName: oldmss.senderName,
        })),
      );
    });

    socket.on(
      "received-message",
      ({ decryptedMessage, senderId, senderName }) => {
        console.log("****", decryptedMessage);
        setMessageReceived((prevMessages) => {
          if (Array.isArray(prevMessages)) {
            return [
              ...prevMessages,
              { content: decryptedMessage, senderId, senderName },
            ];
          } else {
            return [{ content: decryptedMessage, senderId, senderName }];
          }
        });
      },
    );

    socket.on("room-created", (data) => {
      console.log("user join in room ", data);
      if (data) {
        setRoom(data);
      }
    });

    return () => {
      console.log("Disconnecting socket");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTo({
        behavior: "smooth",
        top: chatContainer.scrollHeight,
      });
    }
  }, [messageReceived, selectSub]);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (user.userType === "student") {
          const allSubjects = await MySubject(user.CurrentSemester);
          setSubject(allSubjects.subjects);
        } else if (user.userType === "teacher") {
          const allSubjects = await getTeacherSubjects(user._id);
          // console.log(allSubjects);
          setSubject(allSubjects.map((sub) => sub.subjectId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSubjectBtn = (sub) => {
    // console.log(sub);
    setSelectSub(sub.subjectName);
    setMessageReceived([]);
    socket.emit("CreateRoom", sub);
  };
  const handleSend = () => {
    console.log("Sending new message to room:", room);
    console.log("This is new message", newMessage);
    socket.emit("newMessage", room, newMessage, user._id, user.name);
    setNewMessage("");
  };

  return (
    <div className="h-screen bg-gray-100 pt-16">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-[98%] w-[90%] flex-row rounded-2xl bg-white shadow-xl">
          <div className="w-1/4 border-r border-gray-500">
            <div className="flex h-16 flex-row items-center rounded-tl-2xl border-b border-gray-500 bg-gray-700/95 ">
              <FcReadingEbook className="ml-20 text-3xl text-gray-300" />
              <h1 className="ml-5 text-xl font-light text-white">
                {" "}
                Your Subjects
              </h1>
            </div>
            <div className="flex p-5">
              <div className="w-full">
                {/* {console.log("Hello", subjects)} */}
                {subjects && subjects.length > 0 ? (
                  <ul className="text-xl font-bold ">
                    {subjects.map((sub) => (
                      <button
                        className={`mb-2 w-full rounded-lg border-b-4 p-3 text-xl  font-bold ${sub.subjectName === selectSub ? " border-2 bg-gray-50 text-mintPrimary shadow-inner" : "hover:border-2 hover:bg-gray-50 hover:text-mintPrimary hover:shadow-inner"}`}
                        key={sub._id}
                        onClick={() => handleSubjectBtn(sub)}
                      >
                        {sub.subjectName}
                      </button>
                    ))}
                  </ul>
                ) : (
                  <p>No Subject Group available</p>
                )}
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col">
            <div className="flex h-16 w-full flex-row items-center rounded-tr-2xl border-b border-gray-500 bg-gray-700/95">
              {selectSub ? (
                <h1 className="ml-3 text-xl font-bold text-white">
                  🟢 {selectSub}
                </h1>
              ) : (
                <h1 className="ml-3 text-xl font-light text-white">
                  Disscusion Fourm
                </h1>
              )}
            </div>
            <div className="absolute bottom-0 flex w-full flex-col">
              <div
                id="chatContainer"
                className="max-h-[80vh] overflow-y-auto pb-24"
              >
                <div className="p-5 leading-8">
                  {messageReceived && messageReceived.length > 0 ? (
                    messageReceived.map((message, index) => (
                      <div
                        key={index}
                        ref={(m) =>
                          m &&
                          index === messageReceived.length - 1 &&
                          m.parentElement.scrollTo({
                            behavior: "smooth",
                            top: m.parentElement.scrollHeight,
                          })
                        }
                      >
                        {console.log("Message", message)}
                        <div
                          className={
                            message.senderId === user._id
                              ? "flex justify-end"
                              : "flex justify-start"
                          }
                        >
                          {message.senderId === user._id ? (
                            <>
                              <h1 className="mb-3 rounded-xl bg-primary text-white px-8 py-1 text-right text-lg font-bold leading-9 ">
                                {message.content}
                              </h1>
                              <span className="text-md mb-3 ml-2 rounded-full bg-gray-100 px-3 py-1 font-bold leading-9">
                                {message.senderName}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-md mb-3 mr-2 rounded-full bg-gray-100 px-3 py-1 font-bold leading-9">
                                {message.senderName}
                              </span>
                              <h1 className="mb-3 rounded-xl bg-mintPrimary  text-black px-8 py-1 text-left text-lg font-bold leading-9">
                                {message.content}
                              </h1>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center justify-center">
                        <h1 className="rounded-lg bg-gray-200 p-2 font-bold shadow-inner">
                          Please Select Group or No chat
                        </h1>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-full">
              <div className="flex w-full items-center bg-gray-700/95 px-3 py-2">
                <input
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleEnterKey}
                  value={newMessage}
                  type="text"
                  name="message"
                  className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-4 font-semibold focus:shadow-inner focus:outline-none"
                />

                <button
                  onClick={handleSend}
                  className="ml-3 w-auto rounded-r-xl bg-blue-600 px-8 py-4 text-center text-[1.5rem] font-semibold text-white hover:bg-blue-900"
                >
                  <IoSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
