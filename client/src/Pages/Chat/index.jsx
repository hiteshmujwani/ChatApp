import { useEffect, useState } from "react";
import useAppStore from "../../store/slices/store";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function Chat() {
  const [user,SetUser] = useState()
  const { userInfo } = useAppStore();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      navigate("/profile");
      return;
    }
  });
  return <div>Chat PAGE</div>;
}
