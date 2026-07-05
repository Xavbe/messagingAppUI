import type { ConversationResponse } from "../models/Conversation.ts";

type Props = {
    conversation: ConversationResponse;
    active?: boolean;
    onSelect?: () => void;
};

function getInitials(name: string): string {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");
}

function ConversationItem({ conversation, active, onSelect }: Props) {
    return (
        <button
            className={`conversation-item ${active ? "conversation-item-active" : ""}`}
            onClick={onSelect}
        >
            <span className="conversation-avatar">
                {getInitials(conversation.conversationName)}
            </span>

            <span className="conversation-item-content">
                <span className="conversation-item-top">
                    <span className="conversation-item-name">{conversation.conversationName}</span>
                    {conversation.updatedAt && (
                        <span className="conversation-item-time">
                            {new Date(conversation.updatedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    )}
                </span>
                <span className="conversation-item-preview">
                    {conversation.message || "Aucun message"}
                </span>
            </span>
        </button>
    );
}

export default ConversationItem;