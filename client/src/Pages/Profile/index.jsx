import { useEffect } from "react";
import useAppStore from "../../store/slices/store";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Avatar, Input } from "@chakra-ui/react";

export default function Profile() {
  const { userInfo } = useAppStore();
  return (
    <div className="bg-[#242423] h-screen text-white flex justify-center items-center">
      <div className="flex-col flex gap-8">
        <IoMdArrowRoundBack className="text-5xl" />
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
              placeholder="First Name"
              className="!outline-none !text-xl !p-6"
              _active={false}
            />
            <Input
              _focusVisible={false}
              placeholder="First Name"
              className="!outline-none !text-xl !p-6"
              _active={false}
            />
            <Input
              _focusVisible={false}
              placeholder="Last Name"
              className="!outline-none !text-xl !p-6"
              _active={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
