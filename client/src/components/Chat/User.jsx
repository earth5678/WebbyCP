import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserType } from "../UserContext";

const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/friend-requests/sent/${userId}`
        );

        const data = await response.json();
        if (response.ok) {
          setFriendRequests(data);
        } else {
          console.log("error", response.status);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchFriendRequests();
  }, []);

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/friends/${userId}`
        );

        const data = await response.json();

        if (response.ok) {
          setUserFriends(data);
        } else {
          console.log("error retrieving user friends", response.status);
        }
      } catch (error) {
        console.log("Error message", error);
      }
    };

    fetchUserFriends();
  }, []);

  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/friend-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentUserId, selectedUserId }),
        }
      );

      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <div>
        <img
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            objectFit: "cover",
          }}
          src={item.image}
          alt={item.name}
        />
      </div>

      <div style={{ marginLeft: 12, flex: 1 }}>
        <p style={{ fontFamily: 'Kanit_400Regular', }}>{item?.name}</p>
        <p style={{ marginTop: 4, color: "gray" , fontFamily: 'Kanit_400Regular', }}>{item?.email}</p>
      </div>

      {userFriends.includes(item._id) ? (
        <div
          style={{
            backgroundColor: "#82CD47",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <p style={{ textAlign: "center", color: "white", fontFamily: 'Kanit_400Regular', }}>เพื่อน</p>
        </div>
      ) : requestSent ||
        friendRequests.some((friend) => friend._id === item._id) ? (
        <div
          style={{
            backgroundColor: "gray",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <p style={{ textAlign: "center", color: "white", fontSize: 13 , fontFamily: 'Kanit_400Regular', }}>
          ส่งคำขอแล้ว
          </p>
        </div>
      ) : (
        <div
          onClick={() => sendFriendRequest(userId, item._id)}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
            cursor: "pointer",
          }}
        >
          <p style={{ textAlign: "center", color: "white", fontSize: 13 , fontFamily: 'Kanit_400Regular' }}>
             เพิ่มเพื่อน
          </p>
        </div>
      )}
    </div>
  );
};

export default User;
