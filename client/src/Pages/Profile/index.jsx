import { useEffect, useState } from "react";
import useAppStore from "../../store/slices/store";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Avatar, Button, Input, useToast } from "@chakra-ui/react";
import { apiClient } from "../../libs/ApiClient";
import { UPDATE_PROFILE } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const toast = useToast({ position: "top" });
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { userInfo, setUserInfo } = useAppStore();

  // Handling Profile setup changes // // some validations remaining
  const handleSaveChanges = async () => {
    console.log("Profile Setup Done");
    const response = await apiClient.post(
      UPDATE_PROFILE,
      { firstName, lastName, profileSetup: true },
      { withCredentials: true }
    );
    if (response.status == 200) {
      setUserInfo(response.data.data);
      toast({ status: "success", description: "Profile Setup Completed" });
      navigate("/chat");
    }
  };

  // initialy setting up user details after Saving //
  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
  }, [userInfo]);
  return (
    <div className="bg-[#242423] h-screen text-white flex justify-center items-center">
      <div className="flex-col flex gap-8">
        <IoMdArrowRoundBack className="text-5xl" onClick={() => navigate(-1)} />
        <div className="flex gap-10 items-center">
          <div className="flex flex-col gap-8 items-center">
            <Avatar
              name="Hitesh Mujwani"
              size={"2xl"}
              src="https://bit.ly/broken-link"
            />
            <div className="flex gap-4">
              <div className="p-3 bg-red-600 rounded-full border-2 border-red-300"></div>
              <div className="p-3 bg-blue-600 rounded-full border-2 border-blue-300"></div>
              <div className="p-3 bg-green-600 rounded-full border-2 border-green-300"></div>
              <div className="p-3 bg-orange-600 rounded-full border-2 border-orange-300"></div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              _focusVisible={false}
              disabled={true}
              placeholder="Email"
              className="!outline-none !text-xl !p-6"
              value={userInfo.email}
              _active={false}
            />
            <Input
              _focusVisible={false}
              placeholder="First Name"
              className="!outline-none !text-xl !p-6"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
              _active={false}
            />

            <Input
              _focusVisible={false}
              placeholder="Last Name"
              className="!outline-none !text-xl !p-6"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              _active={false}
            />
          </div>
        </div>
        <Button
          color={"white"}
          onClick={handleSaveChanges}
          className="!bg-[#9f6fac]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
