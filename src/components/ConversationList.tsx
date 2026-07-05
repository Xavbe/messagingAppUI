import { useEffect, useState } from "react";
import { conversationService } from "../services";
import type { ConversationResponse } from "../models/Conversation";
import ConversationItem from "../components/ConversationItem";
import "../style/ConversationPage.css";

interface ConversationListProps {
    onSelectConversation: (id: string) => void;
    selectedConvId: string | null;
}

function ConversationList({ onSelectConversation, selectedConvId }: ConversationListProps) {
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

    return (
        <aside className="conversation-sidebar">
            <div className="conversation-sidebar-header">
                <h2>Conversations</h2>
            </div>

            <div className="conversation-sidebar-list">
                {loading && <p className="conversation-status">Chargement...</p>}

                {error && <p className="conversation-status conversation-status-error">Erreur : {error}</p>}

                {!loading && !error && conversations.length === 0 && (
                    <div className="conversation-empty-list">
                        <p>Aucune conversation</p>
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