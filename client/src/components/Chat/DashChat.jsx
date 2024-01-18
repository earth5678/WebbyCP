// UserManage.js

import React from 'react';
import Conversation from './Conversation';
import Message from './Message';
import User from './User';
import styles from './styles.module.css';

const UserManage = () => {
  
  return (
    <div className={styles.UserManage}>

      <div className={styles.container}>
        <div className={`${styles.column15} ${styles.content}`}>
          <Conversation />
        </div>

        <div className={`${styles.column50} ${styles.content}`}>
          <Message />
        </div>

        <div className={`${styles.column20} ${styles.content}`}>
          <User />
        </div>
      </div>
    </div>
  );
};

export default UserManage;

// document.querySelector("#root > div > div > div > div.container > div > div > div")
//   < div class="styles_container__AwfbE" style = "
// width: 1400px;
// height: 750px;
// "><div class="NaN styles_content__ghxjt"><h2>Message</h2><div style="flex: 1 1 0 %; padding: 5px; background - color: rgb(206, 250, 219); ">
//   <div style="margin: 10px 14px 14px; "><div style="display: flex; align - items: center; padding: 8px; border - bottom: 1px solid rgb(189, 195, 199); ">
//     <img src="./ assets / 1.png" style="width: 70px; height: 70px; border - radius: 50px; border: 2px solid rgb(6, 180, 82); "><div style="margin - left: 6px; ">
//       <div style="font - size: 18px; font - weight: bold; ">Chayanin Marat</div><div style="font - size: 14px; font - weight: 300; color: rgb(127, 140, 141); ">gmail.com</div>
//       </div></div></div></div></div><div class="NaN styles_content__ghxjt"><h2>Conversation</h2><div style="flex: 1 1 0 %; background - color: white; align - items: center; "><div style="overflow - y: auto; height: 100 %; width: 100 %; "><div style="padding: 5px; "><div style="align - self: flex - end; background - color: rgb(82, 183, 136); padding: 8px; max - width: 60 %; border - radius: 7px; margin: 10px; border - color: white; border - width: 2px; "><span style="color: white; ">Test Message 1</span></div><div style="align - self: flex - start; background - color: white; padding: 8px; max - width: 60 %; border - radius: 7px; margin: 10px; border - color: rgb(82, 183, 136); border - width: 2px; "><span style="color: black; ">Test Message 2</span></div></div></div><div style="padding: 10px; width: 100 %; display: flex; flex - direction: row; align - items: center; "><input placeholder="Type a message..." value="" style="flex: 1 1 0 %; padding: 15px; border - width: 1px; border - color: rgb(52, 152, 219); border - radius: 20px; background - color: rgb(236, 240, 241); "><button style="margin - left: 4px; padding: 8px; background - color: rgb(236, 240, 241); border - radius: 20px; ">Send</button></div></div></div><div class="NaN styles_content__ghxjt"><h2>People</h2><div style="flex: 1 1 0 %; padding: 5px; background - color: rgb(206, 250, 219); "><h2 style="color: rgb(52, 152, 219); font - size: 18px; font - weight: bold; ">People</h2><div style="overflow - y: auto; "><div style="display: flex; flex - direction: row; align - items: center; padding: 8px; border - bottom: 1px solid rgb(189, 195, 199); "><div style="margin - left: 6px; "><div style="font - size: 16px; font - weight: bold; ">Test Name</div>
// <div style="font - size: 12px; color: rgb(127, 140, 141); "> TestName@gmail.com</div>
// </div></div></div></div></div></div>