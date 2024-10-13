import { Server as SocketIOServer } from "socket.io";

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

    socket.on("disconnect", () => disconnect(socket));
  });
};

export default SocketSetup;
