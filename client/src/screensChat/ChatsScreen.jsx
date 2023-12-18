import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import { useNavigate } from "react-router-dom";
import UserChat from "../components/UserChat";
import { apiBaseUrl } from '../ApiConfig';

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigate = useNavigate();

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/accepted-friends/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, [userId]); // Added userId to the dependency array

  console.log("friends", acceptedFriends);

  return (
    <div style={{ backgroundColor: '#C2FFD3', flex: 1 }}>
      <div>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ChatsScreen;
