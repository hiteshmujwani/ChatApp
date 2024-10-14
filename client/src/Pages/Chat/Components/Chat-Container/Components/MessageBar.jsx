import { Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoAttachOutline } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import useAppStore from "../../../../../store/slices/store";
import { useSocket } from "../../../../../context/socket";

const MessageBar = () => {
  const socket = useSocket()
  const {userInfo,selectedChatData,selectedChatType} = useAppStore();
  const [message,setMessage] = useState()


  const handleSendMessage = async()=>{
    try {
      if(selectedChatType == "Contact")
      socket.emit("sendMessage",{sender:userInfo._id,receiver:selectedChatData._id,messageType:"text",content:message})
    } catch (error) {
      console.log("error in sending message in frontend",error)
    }
  }
  return (
    <div className="h-[10vh] w-full flex items-center text-white bg-[#242423] relative">
      <div className="flex w-full px-5">
        <div className="flex flex-1 items-center gap-2">
          <EmojiPicker className="absolute top-[100px]" open={false} />
          <div className="flex flex-1 border-[#686864] border-[1px] rounded-lg items-center relative ">
            <Input
              border={false}
              _hover={false}
              _focusVisible={false}
              placeholder="Type Your Message..."
              onChange={(e)=>setMessage(e.target.value)}
            />
            <div className="flex gap-2 mr-2">
              <IoAttachOutline size={26} />
              <RiEmojiStickerLine size={26} />
            </div>
          </div>
          <Button bg={"#6D59F0"} textColor={"#ffffff"} className="" onClick={handleSendMessage}>
            <IoSend size={25} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageBar;
