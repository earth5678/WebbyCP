import React, { useLayoutEffect, useContext, useEffect, useState } from "react";

const Conversation = () => {
  const userId = localStorage.getItem("token");
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([])
  const [conversations, setConversations] = useState([]);

  return (
    <div style={{ flex: 1, padding: 5 }}>

      <div style={{ margin: "5px", marginTop: "5" }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #bdc3c7',
          }}
        >
          <img
            src='./assets/1.png'
            style={{ width: "60px", height: "60px" }}
          />
          <div style={{ marginLeft: "1px" }}>
            <div style={{ fontSize: "16px", fontWeight: 'bold', fontFamily: 'Kanit' }}>Chayanin Marat</div>
            <div style={{ fontSize: "14px", fontWeight: '300', color: '#7f8c8d', fontFamily: 'Kanit' }}>email@cp.com</div>
          </div>
        </div>
      </div>
      
      <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
        <h2 style={{ color: "#3498db", fontSize: 16, fontFamily: 'Kanit' }}>
          ข้อความ
        </h2>
        <div style={{ margin: "5px", marginTop: "5" }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: "5px",
              borderBottom: '1px solid #bdc3c7',
            }}
          >
            <img
              src='./assets/1.png'
              style={{ width: "60px", height: "60px" }}

            />
            <div style={{ marginLeft: "1px" }}>
              <div style={{ fontSize: "18", fontWeight: 'bold', fontFamily: 'Kanit' }}>Chayanin Marat</div>
              <div style={{ fontSize: "14px", fontWeight: '300', color: '#7f8c8d', fontFamily: 'Kanit' }}>gmail@gmail.com</div>
            </div>
          </div>
        </div>
        <div style={{ margin: "5px", marginTop: "5" }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: "5px",
              borderBottom: '1px solid #bdc3c7',
            }}
          >
            <img
              src='./assets/1.png'
              style={{ width: "60px", height: "60px" }}

            />
            <div style={{ marginLeft: "1px" }}>
              <div style={{ fontSize: "18", fontWeight: 'bold', fontFamily: 'Kanit' }}>Chayanin Marat</div>
              <div style={{ fontSize: "14px", fontWeight: '300', color: '#7f8c8d', fontFamily: 'Kanit' }}>gmail@gmail.com</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Conversation;