import type { MessageResponse } from "../models/MessageResponse.ts";
import type { MessagesResponse } from "../models/MessagesResponse.ts";

export class MessageService {
    private readonly apiUrl = "/api";

    async getMessages(conversationId: string, before?: string, limit = 30): Promise<MessageResponse[]> {
        const params = new URLSearchParams({limit: String(limit)});
        if (before) params.set("messageBeforeUUID", before);

        const response = await fetch(
            `${this.apiUrl}/conversations/${conversationId}/messages?${params}`,
            {method: "GET", credentials: "include"}
        );

        if (!response.ok) {
            throw new Error("Failed to load messages");
        }

        const data: MessagesResponse = await response.json();
        return data.messages; // le vrai tableau est dans data.messages, pas la racine
    }
}

export const messageService = new MessageService();