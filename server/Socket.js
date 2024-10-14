import { Server as SocketIOServer } from "socket.io";
import Message from "./Models/MessageModel.js";

const SocketSetup = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log("client disconnected");
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        console.log(userSocketMap);
        break;
      }
    }
  };

  const sendMessage = async(message) =>{
    try {
      const senderSocketId = userSocketMap.get(message.sender)
      const receiverSocketId = userSocketMap.get(message.receiver)

      const createMessage = await Message.create(message)
      console.log("message Data before populate",createMessage)
      const messageData = await Message.findById(createMessage._id).populate("sender","-password").populate("receiver","-password")
      console.log("message Data After populate",messageData)
      if(receiverSocketId){
        io.to(receiverSocketId).emit("receiveMessage",messageData)
      }
      if(senderSocketId){
        io.to(senderSocketId).emit("receiveMessage",messageData)
      }
    } catch (error) {
      console.log("error in socket :- error in sendMessage function",error)
    }
  }

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log("user Connected");
      console.log(socket.id, userId);
      console.log(userSocketMap);
    } else {
      console.log("userId not provided");
    }
    socket.on("sendMessage",sendMessage)
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default SocketSetup;
