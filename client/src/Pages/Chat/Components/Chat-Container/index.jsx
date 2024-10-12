import EmptyChatContainer from "../Empty-Chat-Container";
import ChatHeader from "./Components/ChatHeader";
import MessageBar from "./Components/MessageBar";
import MessageContainer from "./Components/MessageContainer";

const ChatContainer = () => {
  return (
    <>
      <div className="w-[75vw]">
        <ChatHeader />
        <MessageContainer/>
        <MessageBar />
      </div>
    </>
  );
};

export default ChatContainer;
