import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserType } from "../UserContext";


const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  const { userId, setUserId } = useContext(UserType);
  const history = useHistory();

  
  const acceptRequest = async (friendRequestId) => {
    try {
      const response = await fetch(
        `http:/localhost:8080/friend-request/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: friendRequestId,
            recepientId: userId,
          }),
        }
      );

      if (response.ok) {
        setFriendRequests(
          friendRequests.filter((request) => request._id !== friendRequestId)
        );
        // Assuming you want to navigate to the "Chats" route after accepting the request
        history.push("/Chats");
      }
    } catch (err) {
      console.log("error accepting the friend request", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: 'white',
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
      }}
    >
      <img
        style={{ width: 50, height: 50, borderRadius: 25 }}
        src={item.image}
        alt={item.name}
      />

      <p
        style={{ fontSize: 15, marginLeft: 10, flex: 1, fontFamily: 'Kanit_400Regular', }}>
        {item?.name} ส่งคำร้องขอเป็นเพื่อนกับคุณ 
      </p>

      <div
        onClick={() => acceptRequest(item._id)}
        style={{ backgroundColor: "#52B788", padding: 10, borderRadius: 6, cursor: "pointer" }}
      >
        <p style={{ textAlign: "center", color: "white", fontFamily: 'Kanit_400Regular' }}> ยอมรับคำขอ </p>
      </div>
    </div>
  );
};

export default FriendRequest;
