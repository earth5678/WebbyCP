import React, { useState } from "react";

const Conversation = () => {

  const [message, setMessage] = useState('');

  const sendMessage = () => {
  };

  return (
    <div>
      <div style={{ overflowY: 'auto', height: '100%', width: '100%' }}>
        <div style={{ padding: 5, display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginTop: 2, backgroundColor: 'white', borderRadius: 50, alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src='./assets/1.png'
                style={{ width: "55px", height: "55px" }}

              />
              <div style={{ marginLeft: "1px" }}>
                <div style={{ fontSize: "18px", fontWeight: 'bold', fontFamily: 'Kanit' }}>Chayanin Marat</div>
                <div style={{ fontSize: "14px", fontWeight: '300', color: '#7f8c8d', fontFamily: 'Kanit' }}>gmail@gmail.com</div>
              </div>
            </div>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
            <div style={{ padding: 5, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'white',
                  padding: 8,
                  maxWidth: '50%',
                  borderRadius: '0px 7px 7px 7px',
                  margin: 10,
                  borderColor: 'white',
                  borderWidth: 2,
                  fontFamily: 'Kanit',
                }}
              >
                <span style={{ color: 'black' }}>Test Message 1</span>
              </div>

              <div
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#52B788',
                  padding: 8,
                  maxWidth: '50%',
                  borderRadius: '7px 7px 0px 7px',
                  margin: 10,
                  borderColor: '#52B788',
                  borderWidth: 2,
                  fontFamily: 'Kanit',
                }}
              >
                <span style={{ color: 'white' }}>Test Message 2Line 15:11:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text</span>
              </div>

            </div>
          </div>
        </div>

        <div style={{ width: '47%', position: 'fixed', bottom: 30, padding: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
          <input
            placeholder='Type a message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ flex: 1, padding: 10, borderWidth: 1, borderColor: '#52B788', borderRadius: 20, backgroundColor: '#ecf0f1',fontFamily: 'Kanit' }}
          />
          <button
            style={{ marginLeft: 5, padding: 8, backgroundColor: '#52B788', borderRadius: 20 , color: 'white' , fontFamily: 'Kanit'}}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
