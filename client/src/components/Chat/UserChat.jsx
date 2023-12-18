import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserType } from "../UserContext";

const UserChat = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [messages, setMessages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/messages/${userId}/${item._id}`
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

    fetchMessages();
  }, []);

  const getLastMessage = () => {
    const userMessages = messages.filter(
      (message) => message.messageType === "text"
    );

    const n = userMessages.length;

    return userMessages[n - 1];
  };

  const lastMessage = getLastMessage();

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  return (
    <div
      onClick={() =>
        history.push(`/messages/${userId}/${item._id}`)
      }
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        backgroundColor: "white",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
        cursor: "pointer",
      }}
    >
      <img
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          objectFit: "cover",
        }}
        src={item?.image}
        alt={item?.name}
      />

      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 15, fontWeight: "500", fontFamily: 'Kanit_400Regular' }}>
          {item?.name}
        </p>
        {lastMessage && (
          <p style={{ marginTop: 3, color: "gray", fontWeight: "500", fontFamily: 'Kanit_400Regular' }}>
            {lastMessage?.message}
          </p>
        )}
      </div>

      <div>
        <p style={{ fontSize: 11, fontWeight: "400", color: "#585858", fontFamily: 'Kanit_400Regular' }}>
          {lastMessage && formatTime(lastMessage?.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default UserChat;
