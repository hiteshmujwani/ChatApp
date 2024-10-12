import EmptyChatContainer from "../Empty-Chat-Container";
import ChatHeader from "./Components/ChatHeader";
import MessageBar from "./Components/MessageBar";

const ChatContainer = () => {
  return (
    <>
      <div>
        <ChatHeader />
        <EmptyChatContainer />
        <MessageBar />
      </div>
    </>
  );
};

export default ChatContainer;
