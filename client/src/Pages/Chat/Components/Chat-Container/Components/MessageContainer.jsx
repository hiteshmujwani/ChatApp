import React, { useEffect, useRef } from "react";
import useAppStore from "../../../../../store/slices/store";
import moment from "moment";
import { apiClient } from "../../../../../libs/ApiClient";
import { GET_MESSAGES } from "../../../../../utils/Constants";

const MessageContainer = () => {
  const {
    userInfo,
    selectedChatData,
    selectedChatMessages,
    selectedChatType,
    setSelectedChatMessages,
  } = useAppStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const getMessages = async () => {
    try {
      const response = await apiClient.post(
        GET_MESSAGES,
        { RecId: selectedChatData._id },
        { withCredentials: true }
      );
      if (response.data.data.length > 0) {
        setSelectedChatMessages(response.data.data);
      }
    } catch (error) {
      console.log("error in fetching messages data from database", error);
    }
  };

  useEffect(() => {
    if (selectedChatMessages.length > 0) {
      return;
    }
    getMessages();
  }, []);

  const RenderMsg = () => {
    let lastDate = null;
    return (
      selectedChatMessages &&
      selectedChatMessages.map((message, index) => {
        const messageDate = moment(message.timestamp).format("YY-MM-DD");
        const showDate = messageDate !== lastDate;
        lastDate = messageDate;
        return (
          <div key={index}>
            {showDate && (
              <div className="flex justify-center p-2 text-white">
                {moment(message.timestamp).format("LL")}
              </div>
            )}
            {selectedChatType == "Contact" && renderDMMessages(message)}
          </div>
        );
      })
    );
  };

  const renderDMMessages = (message) => {
    return (
      <div
        ref={scrollRef}
        className={`${
          userInfo._id == message.sender ? "text-right " : "text-left "
        }`}
      >
        <div
          className={`p-3 max-w-[50%] inline-block rounded-lg m-2 ${
            userInfo._id == message.sender
              ? " border-[2px] border-[#8d7eec] text-[#8d7eec]"
              : " bg-[#4e4e4b] text-white"
          }`}
        >
          {message.content}
        </div>
        <div className="block text-white mx-3">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[80vh] overflow-hidden overflow-y-auto w-full bg-[#242423]">
      {<RenderMsg />}
    </div>
  );
};

export default MessageContainer;
