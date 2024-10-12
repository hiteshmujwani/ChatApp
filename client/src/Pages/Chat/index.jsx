import { useEffect, useState } from "react";
import useAppStore from "../../store/slices/store";
import { useNavigate } from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import { apiClient } from "../../libs/ApiClient";
import { USER_LOGOUT } from "../../utils/Constants";
import ContactsContainer from "./Components/Contacts-Container";
import ChatContainer from "./Components/Chat-Container";
import EmptyChatContainer from "./Components/Empty-Chat-Container";

export default function Chat() {
  //states and variable //
  const { userInfo,setUserInfo } = useAppStore();
  const {selectedChatType} = useAppStore()
  const toast = useToast();
  const navigate = useNavigate();

  //Handle Logout Function // // some validations remaining
  const handleLogout = async() =>{
    const response = await apiClient.post(USER_LOGOUT,{},{withCredentials:true})
    if(response.status == 200){
      setUserInfo(undefined)
      toast({description:response.data.msg,status:"success"})
      navigate('/')
    }
  }

  // Redirecting user if he\she has not setup there profile page //
  useEffect(() => {
    if (!userInfo.profileSetup) {
      navigate("/profile");
      return;
    }
  });

  return(
    <>
    <div className="w-screen h-screen flex gap-[1px] bg-[#686864]">
      <ContactsContainer/>
      {selectedChatType ? <ChatContainer/> : <EmptyChatContainer/>}
    </div>
    </>
  ) 
}
