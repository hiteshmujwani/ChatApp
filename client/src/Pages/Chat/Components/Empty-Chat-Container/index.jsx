import { Icon, Img } from "@chakra-ui/react";
import React from "react";
import { IoIosChatboxes } from "react-icons/io";
import Animation from "../../../../assets/animation_2.gif";

const EmptyChatContainer = () => {
  return (
    <div className="w-[75vw] bg-[#242423] text-white h-[100vh] flex justify-center items-center">
      <div className="flex-col flex gap-1 items-center">
        <div className=" flex gap-2 items-center">
          <Icon as={IoIosChatboxes} color={"white"} height={20} width={20} />
          <div className="text-5xl">Socialize</div>
        </div>
        <div className="text-2xl">
          Hi, Welcome To{" "}
          <span className="font-bold text-[#6D59F0]">Socialize</span>
        </div>
        <p className="text-lg font-light">Start New Chat</p>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
