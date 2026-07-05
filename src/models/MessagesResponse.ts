import type { MessageResponse } from "./MessageResponse";

export interface MessagesResponse {
    messages: MessageResponse[];
    conversationDone: string;
    lastMessageId: string;
}