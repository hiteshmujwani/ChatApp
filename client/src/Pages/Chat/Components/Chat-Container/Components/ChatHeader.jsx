import { Avatar } from "@chakra-ui/react";
import React from "react";
import { IoClose } from "react-icons/io5";

const ChatHeader = () => {
  return (
    <div className="h-[10vh] flex text-white bg-[#242423] border-b-[#686864] border-b-[1px]">
      <div className="flex justify-between p-5 items-center w-full">
        <div className="flex gap-3 items-center">
          <Avatar />
          <div className="text-2xl font-medium">Hitesh Mujwani</div>
        </div>
        <div className="text-3xl font-bold">
          <IoClose />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
