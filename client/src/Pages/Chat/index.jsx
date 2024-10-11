import { useEffect, useState } from "react";
import useAppStore from "../../store/slices/store";
import { useNavigate } from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import { apiClient } from "../../libs/ApiClient";
import { USER_LOGOUT } from "../../utils/Constants";

export default function Chat() {
  //states and variable //
  const { userInfo,setUserInfo } = useAppStore();
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
    <div>
    <Button onClick={handleLogout}>Logout</Button>
    </div>
  ) 
}
