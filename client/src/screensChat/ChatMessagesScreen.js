import React, { useState, useContext, useLayoutEffect, useEffect, useRef } from "react";
import { FaRegGrin } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { BsImage } from "react-icons/bs";
import { EmojiPicker } from "react-web-emoji-picker";
import { UserType } from "../UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import * as ImagePicker from "react-image-picker";
import { apiBaseUrl } from '../ApiConfig';

const ChatMessagesScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { recepientId } = location.state;
  const [message, setMessage] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://${apiBaseUrl}:8000/messages/${userId}/${recepientId}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messages", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchRecepientData = async () => {
      try {
        const response = await fetch(
          `http://${apiBaseUrl}:8000/user/${recepientId}`
        );

        const data = await response.json();
        setRecepientData(data);
      } catch (error) {
        console.log("error retrieving details", error);
      }
    };

    fetchRecepientData();
  }, [recepientId]);

  const handleSend = async (messageType, imageUri) => {
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);

      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      const response = await fetch(`http://${apiBaseUrl}:8000/messages`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  useLayoutEffect(() => {
    navigate.state = { selectedMessages, recepientData };
  }, [recepientData, selectedMessages]);

  const deleteMessages = async (messageIds) => {
    try {
      const response = await fetch(`http://${apiBaseUrl}:8000/deleteMessages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messageIds }),
      });

      if (response.ok) {
        setSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );

        fetchMessages();
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };

  const handleSelectMessage = (message) => {
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((prevSelectedMessages) =>
        prevSelectedMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((prevSelectedMessages) => [
        ...prevSelectedMessages,
        message._id,
      ]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        ref={scrollViewRef}
        style={{
          flexGrow: 1,
          overflowY: "scroll",
          padding: "10px",
        }}
      >
        {messages.map((item, index) => {
          if (item.messageType === "text") {
            const isSelected = selectedMessages.includes(item._id);
            return (
              <div
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleSelectMessage(item);
                }}
                key={index}
                style={{
                  alignSelf:
                    item?.senderId?._id === userId ? "flex-end" : "flex-start",
                  backgroundColor:
                    item?.senderId?._id === userId ? "#52B788" : "white",
                  padding: "8px",
                  maxWidth: "60%",
                  borderRadius: "7px",
                  margin: "10px",
                  borderColor: "white",
                  borderWidth: "2px",
                  display: "flex",
                  flexDirection: "column",
                  ...(isSelected && { width: "100%", backgroundColor: "#F0FFFF" }),
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    textAlign: isSelected ? "right" : "left",
                    fontFamily: 'Kanit_400Regular',
                  }}
                >
                  {item?.message}
                </span>
                <span
                  style={{
                    textAlign: "right",
                    fontSize: "9px",
                    color: "gray",
                    marginTop: "5px",
                    fontFamily: 'Kanit_400Regular',
                  }}
                >
                  {formatTime(item.timeStamp)}
                </span>
              </div>
            );
          }

          if (item.messageType === "image") {
            const baseUrl =
              "C:\gitClone\UpdateProjectDT\api\files";
            const imageUrl = item.imageUrl;
            const filename = imageUrl.split("/").pop();
            const source = { uri: baseUrl + filename };
            return (
              <div
                key={index}
                style={{
                  alignSelf:
                    item?.senderId?._id === userId ? "flex-end" : "flex-start",
                  backgroundColor:
                    item?.senderId?._id === userId ? "#52B788" : "white",
                  padding: "8px",
                  maxWidth: "60%",
                  borderRadius: "7px",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <img
                    src={source}
                    alt="chat-img"
                    style={{ width: "200px", height: "200px", borderRadius: "7px" }}
                  />
                  <span
                    style={{
                      textAlign: "right",
                      fontSize: "9px",
                      position: "absolute",
                      right: "10px",
                      bottom: "7px",
                      color: "gray",
                      marginTop: "5px",
                      fontFamily: 'Kanit_400Regular',
                    }}
                  >
                    {formatTime(item?.timeStamp)}
                  </span>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "#C2FFD3",
        }}
      >
        <FaRegGrin
          onClick={handleEmojiPress}
          style={{ marginRight: "5px", cursor: "pointer" }}
        />

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flex: "1",
            height: "40px",
            borderWidth: "1px",
            borderColor: "#8D8D8D",
            borderRadius: "20px",
            padding: "10px",
            fontFamily: 'Kanit_400Regular',
          }}
          placeholder="Aa"
        />

        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginInline: "8px" }}>
          <BsImage onClick={pickImage} style={{ cursor: "pointer" }} />
        </div>

        <IoIosSend
          onClick={() => handleSend("text")}
          style={{
            backgroundColor: "#52B788",
            padding: "8px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        />
      </div>

      {showEmojiSelector && (
        <EmojiPicker
          onSelect={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: "250px" }}
        />
      )}
    </div>
  );
};

export default ChatMessagesScreen;
