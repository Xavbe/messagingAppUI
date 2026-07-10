import {useEffect, useRef, useState} from "react";
import { webSocketService } from "../services/WebSocketService";
import { messageService } from "../services/MessagesService.ts";
import { logger } from "../services/logger.ts";
import {type MessageResponse} from "../models/MessageResponse.ts";
import "../style/ChatWindows.css";

interface Props {
    conversationId: string;
    currentUsername: string;
}

export default function ChatWindow({ conversationId, currentUsername }: Props) {
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageService
            .getMessages(conversationId)
            .then((msgs) => setMessages(msgs.reverse()))
            .catch((err) => logger.error("Failed to load messages", err))
            .finally(() => setLoading(false));

        webSocketService.connect(() => {
            const sub = webSocketService.subscribeToConversation(conversationId, (msg) => {
                setMessages((prev) => [...prev, msg]);
            });
            return () => sub.unsubscribe();
        });

        return () => webSocketService.disconnect();
    }, [conversationId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function handleSend() {
        if (!content.trim()) return;
        webSocketService.sendMessage(conversationId, content);
        setContent("");
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="chat-window">

            {}
            <div className="chat-messages">
                {loading && <p className="chat-status">Messages loading</p>}

                {!loading &&
                    messages.map((m) => {
                        const isOwn = m.sender === currentUsername;
                        return (
                            <div key={m.id} className={`chat-bubble-row ${isOwn ? "own" : ""}`}>
                                <div className={`chat-bubble ${isOwn ? "chat-bubble-own" : "chat-bubble-other"}`}>
                                    {!isOwn && <span className="chat-bubble-sender">{m.sender}</span>}
                                    <p>{m.message}</p>
                                    <span className="chat-bubble-time">
                        {new Date(m.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                                </div>
                            </div>
                        );
                    })}
                <div ref={bottomRef} />
            </div>

            {}
            <div className="chat-input-bar">
                <textarea
                    placeholder="Write your message"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button onClick={handleSend} disabled={!content.trim()}>
                    Envoyer
                </button>
            </div>
        </div>
    );
}
