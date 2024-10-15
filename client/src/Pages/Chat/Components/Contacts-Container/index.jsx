import { Avatar, Divider, Icon, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { NewDm } from "./Components/NewDm";
import useAppStore from "../../../../store/slices/store";
import { MdLogout } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GET_DM_CONTACT_LIST, USER_LOGOUT } from "../../../../utils/Constants";
import { apiClient } from "../../../../libs/ApiClient";
import { useNavigate } from "react-router-dom";
import DmContactsList from "./Components/DmContactsList";

const ContactsContainer = () => {
  const {
    userInfo,
    setUserInfo,
    setDmContactsList,
    dmContactsList,
    selectedChatData,
    closeChat,
  } = useAppStore();
  const navigate = useNavigate();
  const toast = useToast();

  //Handle Logout Function // // some validations remaining
  const handleLogout = async () => {
    const response = await apiClient.post(
      USER_LOGOUT,
      {},
      { withCredentials: true }
    );
    if (response.status == 200) {
      setUserInfo(undefined);
      closeChat();
      toast({ description: response.data.msg, status: "success" });
      navigate("/");
    }
  };

  useEffect(() => {
    const getDmContacts = async () => {
      try {
        const response = await apiClient.get(GET_DM_CONTACT_LIST, {
          withCredentials: true,
        });
        if (response.data.contacts.length > 0 && dmContactsList.length === 0) {
          setDmContactsList(response.data.contacts);
        }
      } catch (error) {
        console.log("error in fetching dm list in frontend ", error);
      }
    };

    if (dmContactsList.length === 0) {
      getDmContacts();
    }
  }, [selectedChatData]); // Notice that no dependency here to avoid extra re-renders.

  return (
    <div className="bg-[#242423] text-white w-[25vw] flex flex-col">
      <div className="flex gap-2 items-center h-[10vh] px-5">
        <Icon as={IoIosChatboxes} color={"white"} height={10} width={10} />
        <div className="text-2xl">Socialize</div>
      </div>
      <Divider />
      <div className="flex flex-col p-5 gap-1 ">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <GoDotFill />
              <Title title={"Direct Messages"} />
            </div>
            <div>
              <NewDm />
            </div>
          </div>
          {dmContactsList != undefined && <DmContactsList />}
        </div>
        <div className="flex gap-1 items-center">
          <GoDotFill />
          <Title title={"Channels"} />
        </div>
      </div>
      <div className="absolute bottom-0 w-[25vw] h-[10vh] flex items-center p-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 font-medium text-xl">
            <Avatar size={"md"} name={userInfo.firstName} />
            <div>{userInfo.firstName + " " + userInfo.lastName}</div>
          </div>
          <div className="text-3xl flex gap-4">
            <FaRegEdit
              className=" cursor-pointer"
              onClick={() => navigate("/profile")}
            />
            <MdLogout className="cursor-pointer" onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Title = ({ title }) => {
  return (
    <div className="">
      <h6>{title}</h6>
    </div>
  );
};

export default ContactsContainer;
