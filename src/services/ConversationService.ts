import type {ConversationResponse} from "../models/Conversation.ts";

export class ConversationService {
    private readonly apiUrl: string = "http://localhost:8080";

    async getConversations(): Promise<ConversationResponse[]> {
        const response = await fetch(
            `${this.apiUrl}/conversations`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to load conversations");
        }

        return response.json();
    }

}