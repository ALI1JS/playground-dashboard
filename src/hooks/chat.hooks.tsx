import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const sendingTypes: Record<MessageType, string> = {
  owner: "SendMessageFromAdminToOwner",
  player: "SendMessageFromAdminToPlayer",
};

const fetchingTypes: Record<MessageType, string> = {
  owner: "ConversationAdminWithOwner",
  player: "ConversationAdminWithPlayer",
};

export default function useChat() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  // const adminId = JSON.parse(localStorage.getItem("admin") || "")?.id;
  const adminId = -1;
  const [conversations, setConversations] = useState<any[]>([]);
  const [conversation, setConversation] = useState<Conversation>();

  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  useEffect(() => {
    // Initialize SignalR connection
    initializeConnection();
    getConversations();

    return () => {
      connection?.stop();
    };
  }, [adminId]);

  useEffect(() => {
    getConversation();
  }, [conversation]);

  async function getConversations() {
    try {
      const [owners, players] = await Promise.all([
        axios({
          baseURL: import.meta.env.VITE_CONNECTION_HUB_URL,
          url: "AdminConversationsWithOwners/" + adminId,
          method: "GET",
        }),
        axios({
          baseURL: import.meta.env.VITE_CONNECTION_HUB_URL,
          url: "AdminConversationsWithPlayers/" + adminId,
          method: "GET",
        }),
      ]);

      const data = [...(owners?.data ?? []), ...(players?.data ?? [])].map((e) => ({
        ...e,
        key: v4(),
      }));
      const firstConversation = data?.[0];

      setConversations(data);

      // get first conversation messages if existed
      if (firstConversation) {
        updateConversation({
          conversationId: firstConversation?.conversationId,
          type: firstConversation?.lastMessage?.owner ? "owner" : "player",
          key: firstConversation?.key,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getConversation() {
    try {
      if (!conversation) return;

      const pathname = fetchingTypes[conversation?.type as MessageType];
      const { data } = await axios({
        baseURL: import.meta.env.VITE_CONNECTION_HUB_URL,
        url: pathname + "/" + conversation?.conversationId,
        method: "GET",
      });
      setMessages(data?.messages ?? []);

      smoothScrollInSideConversation();
    } catch (error) {
      console.log(error);
    }
  }

  function smoothScrollInSideConversation() {
    const element = document.getElementById("conversation-room");

    setTimeout(() => {
      if (element) {
        element.scrollTo({
          behavior: "smooth",
          top: element.scrollHeight,
        });
      }
    }, 10);
  }

  async function initializeConnection() {
    try {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_CONNECTION_HUB_URL + "?UserType=Admin")
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Error)

        .build();

      await connection.start();

      console.log("Connection ID: " + connection.connectionId);
      setConnection(connection);

      await axios({
        baseURL: import.meta.env.VITE_CONNECTION_HUB_URL,
        url: "negotiate",
        method: "POST",
        params: {
          negotiateVersion: 1,
        },
      });

      connection?.on("ReceivedMessageFromOwner", (e: OwnerMessageResponse) => {
        updateConversationMessage(e, "owner");
      });
      connection?.on("ReceivedMessageFromPlayer", (e: PlayerMessageResponse) => {
        updateConversationMessage(e, "player");
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function sendMessage(message: string, type: MessageType) {
    try {
     
      setIsSendingMessage(true);
      await connection?.invoke("SendMessageFromAdminToPlayer", {
        ConversationId: conversation?.conversationId,
        Message: message,
      });

      // await getConversation();
      setMessages((prev) => [
        ...prev,
        {
          messageContent: message,
          messageId: prev[prev.length - 1]?.messageId + 1,
          timestamp: new Date().toISOString(),
          adminToOwner: type == "owner",
          adminToPlayer: type == "player",
        },
      ]);

      updateConversationRecord(message);
    } catch (error) {
      console.log("There is an error while sending message ");
      console.log(error);
    } finally {
      setIsSendingMessage(false);
    }
  }

  // find conversation and update lastMessage content based on selected conversation
  function updateConversationRecord(message: string) {
    setConversations((prev) =>
      prev.map((e: any) => ({
        ...e,
        lastMessage: {
          ...e.lastMessage,
          messageContent: e.key == conversation?.key ? message : e.lastMessage?.messageContent,
        },
      })),
    );
  }

  function updateConversationMessage(
    item: OwnerMessageResponse | PlayerMessageResponse,
    _type: MessageType, // not used at that moment
  ) {
    if (conversation?.conversationId == item.conversationId) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            messageContent: item.ownerMessage,
            messageId: prev[prev.length - 1]?.messageId + 1,
            timestamp: new Date().toISOString(),
            adminToOwner: false,
            adminToPlayer: false,
          },
        ]);
        updateConversationRecord(item.ownerMessage);
        smoothScrollInSideConversation();
      }, 100);
    } else {
      setConversations((prev) =>
        prev.map((e: any) => ({
          ...e,
          lastMessage: {
            ...e.lastMessage,
            messageContent:
              e.conversationId == item?.conversationId
                ? item.ownerMessage
                : e.lastMessage?.messageContent,
          },
        })),
      );
    }
  }

  function updateConversation(data: Conversation) {
    setConversation(data);
  }

  return {
    messages,
    sendMessage,
    isSendingMessage,
    setConversation,
    conversation,
    conversations,
    updateConversation,
  };
}
