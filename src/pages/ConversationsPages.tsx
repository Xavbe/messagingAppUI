import { useState } from "react";
import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow.tsx";
import "../style/ConversationPage.css";
import { useAuth } from "../contexts/AuthContext";


export default function ConversationPage() {
    const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
    const { username } = useAuth();
    if (!username) return null;if (!username) return null;

    return (
        <div className="conversation-page">
            <ConversationList
                onSelectConversation={setSelectedConvId}
                selectedConvId={selectedConvId}
            />
            <main className="conversation-main">
                {selectedConvId ? (
                    <ChatWindow conversationId={selectedConvId} currentUsername={username} />
                ) : (
                    <div className="conversation-empty">
                        <span className="conversation-empty-mark" />
                        <p>Sélectionne une conversation pour commencer</p>
                    </div>
                )}
            </main>
        </div>
    );
}