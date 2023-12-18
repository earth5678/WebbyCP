const express = require('express');
const router = express.Router();
const Message = require("../models/message"); 
const User = require("../models/user");

//endpoint to send a request to a user เพื่อส่งคำขอไปยังผู้ใช้
router.post("/friend-request", async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;
  
    try {
      //update the recepient's friendRequestsArray!
      await User.findByIdAndUpdate(selectedUserId, {
        $push: { freindRequests: currentUserId },
      });
  
      //update the sender's sentFriendRequests array
      await User.findByIdAndUpdate(currentUserId, {
        $push: { sentFriendRequests: selectedUserId },
      });
  
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });
  
  //endpoint to show all the friend-requests of a particular user
  router.get("/friend-request/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      //fetch the user document based on the User id
      const user = await User.findById(userId)
        .populate("freindRequests", "name email image")
        .lean();
  
      const freindRequests = user.freindRequests;
  
      res.json(freindRequests);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  //endpoint to accept a friend-request of a particular person
  router.post("/friend-request/accept", async (req, res) => {
    try {
      const { senderId, recepientId } = req.body;
  
      //retrieve the documents of sender and the recipient
      const sender = await User.findById(senderId);
      const recepient = await User.findById(recepientId);
  
      sender.friends.push(recepientId);
      recepient.friends.push(senderId);
  
      recepient.freindRequests = recepient.freindRequests.filter(
        (request) => request.toString() !== senderId.toString()
      );
  
      sender.sentFriendRequests = sender.sentFriendRequests.filter(
        (request) => request.toString() !== recepientId.toString
      );
  
      await sender.save();
      await recepient.save();
  
      res.status(200).json({ message: "Friend Request accepted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  //endpoint to access all the friends of the logged in user!
  router.get("/accepted-friends/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate(
        "friends",
        "name email image"
      );
      const acceptedFriends = user.friends;
      res.json(acceptedFriends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
    
  //endpoint to post Messages and store it in the backend endpoint เพื่อโพสต์ข้อความและเก็บไว้ในแบ็กเอนด์
  router.post("/messages", async (req, res) => {
    try {
      const { senderId, recepientId, messageType, messageText } = req.body;
  
      const newMessage = new Message({
        senderId,
        recepientId,
        messageType,
        message: messageText,
        timestamp: new Date(),
      });
  
      await newMessage.save();
      res.status(200).json({ message: "Message sent Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  ///endpoint to get the userDetails to design the chat Room header
  router.get("/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      //fetch the user data from the user ID
      const recepientId = await User.findById(userId);
  
      res.json(recepientId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  //endpoint to fetch the messages between two users in the chatRoom
  router.get("/messages/:senderId/:recepientId", async (req, res) => {
    try {
      const { senderId, recepientId } = req.params;
  
      const messages = await Message.find({
        $or: [
          { senderId: senderId, recepientId: recepientId },
          { senderId: recepientId, recepientId: senderId },
        ],
      }).populate("senderId", "_id name");
  
      res.json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  //endpoint to delete the messages!
  router.post("/deleteMessages", async (req, res) => {
    try {
      const { messages } = req.body;
  
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "invalid req body!" });
      }
  
      await Message.deleteMany({ _id: { $in: messages } });
  
      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server" });
    }
  });
  
  
  
  router.get("/friend-requests/sent/:userId",async(req,res) => {
    try{
      const {userId} = req.params;
      const user = await User.findById(userId).populate("sentFriendRequests","name email image").lean();
  
      const sentFriendRequests = user.sentFriendRequests;
  
      res.json(sentFriendRequests);
    } catch(error){
      console.log("error",error);
      res.status(500).json({ error: "Internal Server" });
    }
  })
  
  router.get("/friends/:userId",(req,res) => {
    try{
      const {userId} = req.params;
  
      User.findById(userId).populate("friends").then((user) => {
        if(!user){
          return res.status(404).json({message: "User not found"})
        }
  
        const friendIds = user.friends.map((friend) => friend._id);
  
        res.status(200).json(friendIds);
      })
    } catch(error){
      console.log("error",error);
      res.status(500).json({message:"internal server error"})
    }
  })

  module.exports = router;