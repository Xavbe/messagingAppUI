import type {ConversationResponse} from "../models/Conversation.ts";
import type {CreateConversationRequest} from "../models/CreateConversationRequest.ts";

export class ConversationService {
    private readonly apiUrl: string = "/api";

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

    async createConversation(request: CreateConversationRequest): Promise<ConversationResponse> {
        const response = await fetch(
            `${this.apiUrl}/conversations`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

        if (!response.ok) {
            throw new Error("Failed to load conversations");
        }

        return response.json();
    }


}