import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PeopleList = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
  user &&
  user.fullName &&
  typeof user.fullName === 'string' &&
  user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
  !user.isAdmin
);

const handleUserPress = (user) => {
  const senderId = userId;
  const receiverId = user._id; 
  createConversation(senderId, receiverId, user.fullName);
};

const createConversation = async (senderId, receiverId, receiverName) => {
  try {
    const response = await axios.post(`http://localhost:8080/conversation`, {
      senderId,
      receiverId,
    });
    const conversationId = response.data;
    console.log(conversationId);

    
  } catch (error) {
    console.error('Error creating conversation:', error);

  }
};

  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ color: "#3498db", fontSize: 16, fontFamily: 'Kanit' }}>
        ผู้ติดต่อ
      </h2>
      <div className="search-container">
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="ค้นหา"
          style={{ width: '90%', padding: '5px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '50px', fontFamily: 'Kanit', marginBottom: '2px', }}
        />
      </div>


      <div style={{ overflowY: 'auto', maxHeight: '570px' }}>
        {filteredUsers.map((user, index) => (
          <div key={index} style={{ margin: "5px", marginTop: index === 0 ? "0" : "5px" }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: "5px",
                borderBottom: '1px solid #bdc3c7',
              }}
            >
              <img
                src={user.image || './assets/2.png'}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                alt={`Profile of ${user.fullName}`}
              />
              <div style={{ marginLeft: "5px" }}>
                <div style={{ fontSize: "16px", fontWeight: 'bold', fontFamily: 'Kanit' }}>{user.fullName}</div>
                <div style={{ fontSize: "12px", fontWeight: '300', color: '#7f8c8d', fontFamily: 'Kanit' }}>{user.email}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleList;
