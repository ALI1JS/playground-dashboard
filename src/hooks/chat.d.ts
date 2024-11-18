type MessageType = "owner" | "player";

type Conversation = {
  conversationId: number | string;
  type: MessageType;
  key: string;
};

interface MessageItem {
  messageContent: string;
  messageId: number;
  timestamp: string;
  adminToOwner?: boolean;
  adminToPlayer?: boolean;
}

interface OwnerMessageResponse {
  message: string;
  conversationId: number | string;
  ownerId: number | string;
  adminID: number | string;
  ownerMessage: string;
  ownerAttachmentUrl?: string;
}

interface PlayerMessageResponse {
  message: string;
  conversationId: number | string;
  ownerId: number | string;
  adminID: number | string;
  ownerMessage: string;
  ownerAttachmentUrl?: string;
}
