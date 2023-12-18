import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";

const HomeScreen = () => {
  const history = useHistory();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://localhost:8080/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, [setUserId]);

  console.log("users", users);

  return (
    <div>
      <div style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
