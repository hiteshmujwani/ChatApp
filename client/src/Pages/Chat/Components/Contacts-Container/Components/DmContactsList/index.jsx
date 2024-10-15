import { Avatar } from "@chakra-ui/react";
import React from "react";
import useAppStore from "../../../../../../store/slices/store";

const DmContactsList = () => {
  const {
    userInfo,
    dmContactsList,
    setSelectedChatType,
    setSelectedChatData,
    closeChat,
  } = useAppStore();

  const handleSelectContact = async (chat) => {
    try {
      closeChat();
      setSelectedChatType("Contact");
      setSelectedChatData(chat);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 flex flex-col gap-3">
      {dmContactsList.length > 0 &&
        dmContactsList.map((contacts) => (
          <div
            className="flex gap-2 items-center"
            key={contacts._id}
            onClick={() => handleSelectContact(contacts)}
          >
            <Avatar
              name={contacts.firstName + " " + contacts.lastName}
              size={"sm"}
            />
            <div>{contacts.firstName + " " + contacts.lastName}</div>
          </div>
        ))}
    </div>
  );
};

export default DmContactsList;
