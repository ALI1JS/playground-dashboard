import moment from "moment";
import React, { useRef, useState } from "react";
import defaultAvatar from "../assets/avatar.png";
import humbrgerBar from "../assets/menu-icon.png";
import Nav from "../components/nav/nav.comp";
import Navbar from "../components/navbar/navbar.com";
import useChat from "../hooks/chat.hooks";

const Chat: React.FC = () => {
  const roomWrapper = useRef<HTMLDivElement | null>(null);
  const [navbarIsHidden, setNavbarIsHidden] = useState(true);
  const {
    messages,
    isSendingMessage,
    sendMessage,
    conversations,
    conversation,
    updateConversation,
  } = useChat();

  console.log("conversation", conversation);
  const navbarDisplayHandle = () => {
    setNavbarIsHidden(!navbarIsHidden);
  };

  function sendMessageAndScrollToBottom(message: string) {
    if (!conversation || !conversation.type) {
      console.error("Conversation or conversation type is undefined");
      return;
    }
    sendMessage(message, conversation?.type).then(() => {
      setTimeout(() => {
        if (roomWrapper.current) {
          roomWrapper.current.scrollTo({
            behavior: "smooth",
            top: roomWrapper.current.scrollHeight,
          });
        }
      }, 10);
    });
  }

  return (
    <div className="flex gap-5 w-[100vw] min-h-[100vh] relative">
      <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
        <img
          onClick={() => navbarDisplayHandle()}
          src={humbrgerBar}
          alt="Menu"
        />
      </div>
      <Navbar
        closeNavbar={navbarDisplayHandle}
        isHidden={navbarIsHidden}
      />

      <div className="w-[100%] xl:w-[72%] 2xl:w-[78%] min-h-[100%] flex flex-col xl:absolute xl:right-10">
        <Nav />

        <div className="flex flex-col md:flex-row justify-center w-full mt-10 p-10 bg-slate-100 h-full">
          <div className="flex md:w-1/3 md:h-[300px] w-full h-40 overflow-x-auto md:overflow-y-auto p-4 bg-gray-100 shadow-inner">
            <div className="flex md:flex-col flex-row w-full overflow-x-scroll md:overflow-y-scroll space-x-4 md:space-x-0 md:space-y-4">
              {conversations.map((item: any) => (
                <button
                  key={item.key}
                  onClick={() =>
                    updateConversation({
                      type: item.lastMessage?.owner ? "owner" : "player",
                      conversationId: item.conversationId,
                      key: item.key,
                    })
                  }
                  className="flex md:flex-row flex-col items-center md:space-x-4 space-y-2 md:space-y-0 p-4 transition-all duration-200 rounded-lg bg-white shadow hover:bg-gray-100
                  
                  "
                >
                  <div>
                    <img
                      src={
                        (item?.lastMessage?.owner || item?.lastMessage?.player)?.profilePictureUrl ||
                        defaultAvatar
                      }
                      alt={(item?.lastMessage?.owner || item?.lastMessage?.player)?.userName}
                      className={`w-10 h-10 rounded-full object-cover transition-all duration-200 ${conversation?.conversationId === item.conversationId
                        ? "ring-4 ring-blue-500"
                        : "ring-2 ring-gray-300"
                        }`}
                    />
                    <span className="font-bold capitalize text-sm">{item.lastMessage?.owner ? "owner" : "player"}</span>
                  </div>
                  <div
                    className={`text-center md:text-left text-sm font-bold transition-all duration-200 ${conversation?.conversationId === item.conversationId
                      ? "text-black"
                      : "text-gray-700"
                      }`}
                  >
                    <p>{(item?.lastMessage?.owner || item?.lastMessage?.player)?.userName}</p>

                    <div className="grid hidden md:block">
                      <p className="line-clamp-1 font-medium text-sm text-gray-500">
                        {item?.lastMessage?.messageContent}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-gray-50 h-[calc(100vh-250px)] md:h-full w-full md:w-2/3">
            <div
              className="flex-1 max-h-[calc(100vh-250px)] p-4 overflow-y-auto space-y-2"
              ref={roomWrapper}
              id="conversation-room"
            >
              {messages?.map((message, index) => (
                <MessageItem
                  message={message}
                  key={index}
                  messages={messages}
                />
              ))}

              {messages?.length == 0 && (
                <p className="text-center py-3 italic">No messages yet. Start a conversation!</p>
              )}
            </div>

            <ChatFooter
              isSendingMessage={isSendingMessage}
              onClick={sendMessageAndScrollToBottom}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function MessageItem({ message, messages }: { message: MessageItem; messages: MessageItem[] }) {
  const index = messages.findIndex((e) => message.messageId == e.messageId);

  console.log("messages", messages)
  const isNewDay =
    moment(messages[index - 1]?.timestamp).format("YYYY-MM-DD") !=
    moment(message.timestamp).format("YYYY-MM-DD");

  return (
    <>
      {isNewDay && (
        <div className="flex w-full max-w-xs mx-auto gap-4 items-center !my-3">
          <hr className="flex-1" />
          <span className="text-center text-sm bg-white border border-gray-200 l rounded-full py-1 px-3 font-medium text-gray-500">
            {moment(message.timestamp).fromNow()}
          </span>
          <hr className="flex-1" />
        </div>
      )}
      <div
        className={`p-3 rounded-md w-fit max-w-[80%] ${message.adminToOwner || message.adminToPlayer
          ? "bg-blue-500 ms-auto text-white"
          : "bg-gray-100 me-auto"
          }`}
      >
        <div className="flex items-end gap-2">
          <span className="flex-1">{message.messageContent}</span>
          <span
            className={`text-xs ${message.adminToOwner || message.adminToPlayer ? "text-white/60" : "text-gray-500"
              }`}
          >
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      </div>
    </>
  );
}

function ChatFooter({ onClick, isSendingMessage }: any) {
  const [messageInput, setMessageInput] = useState<string>("");

  return (
    <div className="flex items-center sticky p-4 bg-white  bottom-0">
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-lg"
        placeholder="Type a message"
        readOnly={isSendingMessage}
      />
      <button
        onClick={() => {
          onClick(messageInput);
          setMessageInput("");
        }}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-no-drop"
        disabled={!messageInput || isSendingMessage}
      >
        Send
      </button>
    </div>
  );
}

export default Chat;
