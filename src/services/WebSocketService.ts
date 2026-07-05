import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export class WebSocketService {
    private client: Client;

    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            reconnectDelay: 5000,
        });
    }

    connect(onConnected: () => void) {
        this.client.onConnect = onConnected;
        this.client.activate();
    }

    disconnect() {
        this.client.deactivate();
    }

    subscribeToConversation(conversationId: string, onMessage: (msg: any) => void) {
        return this.client.subscribe(
            `/topic/conversations/${conversationId}/messages`,
            (message: IMessage) => {
                onMessage(JSON.parse(message.body));
            }
        );
    }

    sendMessage(conversationId: string, content: string) {
        this.client.publish({
            destination: "/app/message.send",
            body: JSON.stringify({ conversationId, content }),
        });
    }
}

export const webSocketService = new WebSocketService();