import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import axios from "axios";
import { UserType } from ".../UserContext";
import FriendRequest from "../components/FriendRequest";
import { useNavigate } from "react-router-dom";

const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    // Assume you have a setOptions function for updating the header in a web environment
    // You should replace it with the actual function you use for header updates
    setOptions({
      headerTitle: () => (
        <p style={{ fontSize: 20, fontFamily: 'Kanit_400Regular', justifyContent: 'center' }}>คำขอเป็นเพื่อน</p>
      ),
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, [setOptions]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/friend-request/${userId}`
      );
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));

        setFriendRequests(friendRequestsData);
      }
    } catch (err) {
      console.log("error message", err);
    }
  };

  console.log(friendRequests);

  return (
    <div style={{ backgroundColor: '#C2FFD3', flex: 1 }}>
      <div style={{ padding: 10, marginInline: 12 }}>
        {friendRequests.length > 0 && <p style={{ fontFamily: 'Kanit_400Regular' }}>คำขอเป็นเพื่อน</p>}

        {friendRequests.map((item, index) => (
          <FriendRequest
            key={index}
            item={item}
            friendRequests={friendRequests}
            setFriendRequests={setFriendRequests}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendsScreen;
