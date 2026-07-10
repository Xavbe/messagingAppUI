import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { conversationService } from "../services";
import type { ConversationResponse } from "../models/Conversation";
import ConversationItem from "../components/ConversationItem";
import AddConversationButton from "../components/AddConversationButton.tsx";
import "../style/ConversationPage.css";

interface ConversationListProps {
    onSelectConversation: (id: string) => void;
    selectedConvId: string | null;
    username: string;
}

function ConversationList({ onSelectConversation, selectedConvId, username }: ConversationListProps) {
    const [conversations, setConversations] = useState<ConversationResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        conversationService
            .getConversations()
            .then(setConversations)
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    function handleConversationCreated(conversation: ConversationResponse) {
        setConversations((current) => [conversation, ...current]);
        onSelectConversation(conversation.conversationId);
    }

    return (
        <aside className="conversation-sidebar">
            <div className="conversation-sidebar-header">
                <div className="conversation-sidebar-title-row">
                    <h2>Conversations</h2>
                    <Link className="profile-avatar-link" to="/profile" aria-label="Open profile">
                        {username[0]?.toUpperCase()}
                    </Link>
                </div>
                <AddConversationButton onConversationCreated={handleConversationCreated} />
            </div>

            <div className="conversation-sidebar-list">
                {loading && <p className="conversation-status">Loading...</p>}

                {error && <p className="conversation-status conversation-status-error">Error : {error}</p>}

                {!loading && !error && conversations.length === 0 && (
                    <div className="conversation-empty-list">
                        <p>No conversation</p>
                    </div>
                )}

                {!loading &&
                    !error &&
                    conversations.map((conv) => (
                        <ConversationItem
                            key={conv.conversationId}
                            conversation={conv}
                            active={conv.conversationId === selectedConvId}
                            onSelect={() => onSelectConversation(conv.conversationId)}
                        />
                    ))}
            </div>
        </aside>
    );
}

export default ConversationList;
