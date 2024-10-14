import { createContext, useContext, useRef, useEffect } from "react";
import useAppStore from "../store/slices/store";
import { io } from "socket.io-client";
import { HOST } from "../utils/Constants";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();


  useEffect(() => {

    

    if (userInfo && userInfo._id) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });
      socket.current.on("connect", () => {
        console.log("connected To socket server");
      });

      const handleReceiveMessage = async(message) =>{
      const {selectedChatType,selectedChatData,addMessage} = useAppStore.getState();
      console.log(message)
      console.log(selectedChatType,selectedChatData)
      if(selectedChatType !== undefined && (selectedChatData._id == message.sender._id || selectedChatData._id == message.receiver._id)){
        addMessage(message)
      }
    }

      socket.current.on("receiveMessage",handleReceiveMessage)

    }

   

    
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [userInfo]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
