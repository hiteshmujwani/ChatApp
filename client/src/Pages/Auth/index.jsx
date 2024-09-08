import {
  Button,
  Input,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QR from "../../assets/QR.png";
import { apiClient } from "../../libs/ApiClient";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../utils/Constants";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../store/slices/store";

export default function Auth() {
  const toast = useToast({ position: "top" });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { userInfo, setUserInfo } = useAppStore();

  const handleSignup = async () => {
    try {
      if (!email.length || !password.length) {
        toast({
          status: "warning",
          description: "Email or Password Is Required",
        });
        return;
      }
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.status == 201) {
        setUserInfo(response.data.data);
        toast({
          status: "success",
          description: response.data.msg,
        });

        if (response.data.data.profileSetup) navigate("/chats");
        else navigate("/profile");
      } else {
        toast({
          status: "error",
          description: response.data.msg,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        description: error.response.data.msg,
      });
    }
  };
  const handleLogin = async () => {
    try {
      if (!email.length || !password.length) {
        toast({
          status: "warning",
          description: "Email or Password Is Required",
        });
        return;
      }
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );

      console.log(response);
      if (response.status == 200) {
        setUserInfo(response.data.data);
        toast({
          status: "success",
          description: response.data.msg,
        });

        if (response.data.data.profileSetup) navigate("/chats");
        else navigate("/profile");
      } else {
        toast({
          status: "error",
          description: response.data.msg,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        description: error.response.data.msg,
      });
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-screen"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #7678ed, #9091f3, #a9aaf8, #c2c3fc, #dbdcff)",
      }}
    >
      <div className=" w-[90vw] bg-white grid lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl ">
        <div className="grid">
          <div className="p-5">
            <Tabs isFitted variant="unstyled">
              <TabList mb="0.5em">
                <Tab>
                  <div className="text-[1.5em] font-semibold">Login</div>
                </Tab>
                <Tab>
                  <div className="text-[1.5em] font-semibold ">Sign Up</div>
                </Tab>
              </TabList>
              <TabIndicator height="4px" bg="#9091f3" borderRadius="1px" />
              <TabPanels>
                <TabPanel>
                  <div className="flex flex-col gap-4">
                    <h1 className="welcome_text text-lg">Welcome Back !</h1>
                    <div className=" flex flex-col items-center mt-8">
                      <div className="flex items-center bg-[#EEEEF8] p-3 w-full rounded-2xl mb-8">
                        <Icon
                          color={"black"}
                          as={MdOutlineMailOutline}
                          width={8}
                          height={8}
                        />
                        <Input
                          type="email"
                          autoComplete={false}
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          placeholder="Email Address"
                          _placeholder={{ color: "black" }}
                          _focusVisible={false}
                          _hover={false}
                          border={"none"}
                          fontSize={"1.1em"}
                        />
                      </div>
                      <div className="flex items-center bg-[#EEEEF8] p-3 w-full rounded-2xl mb-2">
                        <Icon as={MdLockOutline} height={8} width={8} />
                        <Input
                          type={show ? "text" : "password"}
                          _placeholder={{ color: "black" }}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          placeholder="Password"
                          _focusVisible={false}
                          _hover={false}
                          border={"none"}
                          fontSize={"1.1em"}
                        />
                        <Button
                          h="1.75rem"
                          size="sm"
                          p={4}
                          onClick={handleClick}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </div>
                      <Link className=" self-end text-[#6D59F0]">
                        Forgot Password ?
                      </Link>
                      <div className="w-full self-center mt-8">
                        <Button
                          width={"100%"}
                          bg={"#6D59F0"}
                          color={"white"}
                          fontSize={"1.2em"}
                          onClick={handleLogin}
                          p={6}
                          _hover={false}
                        >
                          Login
                        </Button>
                      </div>
                      <div className="flex flex-col items-center gap-5 mt-6">
                        <p className="font-medium">Or Login With</p>
                        <div className="flex gap-2 ">
                          <Link className="border-2 p-1 rounded-lg">
                            <Icon as={FcGoogle} height={8} width={8} />
                          </Link>
                          <Link className="border-2 p-1 rounded-lg overflow-hidden">
                            <Icon
                              as={FaFacebookSquare}
                              color={"blue"}
                              height={8}
                              width={8}
                            />
                          </Link>
                          <Link className="border-2 rounded-lg p-1">
                            <Icon
                              as={FaTwitter}
                              color={"#1DA1F2"}
                              height={8}
                              width={8}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="flex flex-col gap-4">
                    <h1 className="welcome_text text-lg">Hey, Welcome</h1>
                    <div className=" flex flex-col items-center mt-8">
                      <div className="flex items-center bg-[#EEEEF8] p-3 w-full rounded-2xl mb-8">
                        <Icon
                          color={"black"}
                          as={MdOutlineMailOutline}
                          width={8}
                          height={8}
                        />
                        <Input
                          type="email"
                          placeholder="Email Address"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          _placeholder={{ color: "black" }}
                          _focusVisible={false}
                          _hover={false}
                          border={"none"}
                          fontSize={"1.1em"}
                        />
                      </div>
                      <div className="flex items-center bg-[#EEEEF8] p-3 w-full rounded-2xl mb-2">
                        <Icon as={MdLockOutline} height={8} width={8} />
                        <Input
                          type={show ? "text" : "password"}
                          _placeholder={{ color: "black" }}
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          _focusVisible={false}
                          _hover={false}
                          border={"none"}
                          fontSize={"1.1em"}
                        />
                        <Button
                          h="1.75rem"
                          size="sm"
                          p={4}
                          onClick={handleClick}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </div>
                      <div className="w-full self-center mt-8">
                        <Button
                          width={"100%"}
                          bg={"#6D59F0"}
                          color={"white"}
                          fontSize={"1.2em"}
                          onClick={handleSignup}
                          p={6}
                          _hover={false}
                        >
                          Sign Up
                        </Button>
                      </div>
                      <div className="flex flex-col items-center gap-1 mt-20">
                        <div className="sm:text-lg text-center">
                          if you are having trouble please contact
                        </div>
                        <Link className="text-[#6D59F0] font-medium">
                          hiteshmujwaniofficial@gmail.com
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
        <div className="lg:flex items-end justify-between flex-col p-5 bg-[#6D59F0] relative hidden">
          <div>
            <div className="flex items-center  gap-1">
              <Icon
                as={IoIosChatboxes}
                color={"white"}
                height={10}
                width={10}
              />
              <h1 className="text-white font-medium text-xl">Socialize</h1>
            </div>
          </div>
          <div className=" w-[70%] self-center  hidden">
            <img src={QR} alt="QR" />
            <div className="mt-2 text-white font-medium text-center">
              <p>Scan QR Code</p>
              <p>Download App</p>
            </div>
          </div>
          <div className="text-white  leading-6 self-start">
            Hey Welcome <br />
            To Socialize Web <br />
            Chat Application
          </div>

          <Link className="absolute top-5 left-0 bg-white text-xl p-2 rounded-r-full font-medium">
            Download Our App
          </Link>
        </div>
      </div>
    </div>
  );
}
