import { useState } from "react";
import { conversationService } from "../services";
import type { ConversationResponse } from "../models/Conversation.ts";
import { logger } from "../services/logger.ts";

type Props = {
    onConversationCreated: (conversation: ConversationResponse) => void;
};

export default function AddConversationButton({ onConversationCreated }: Props) {
    const [open, setOpen] = useState(false);
    const [conversationName, setConversationName] = useState("");
    const [usernames, setUsernames] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const parsedUsernames = usernames
            .split(",")
            .map((username) => username.trim())
            .filter(Boolean);

        if (!conversationName.trim()) {
            setError("Conversation name is required");
            return;
        }

        if (parsedUsernames.length === 0) {
            setError("Add at least one username");
            return;
        }

        setLoading(true);

        try {
            const conversation = await conversationService.createConversation({
                conversationName: conversationName.trim(),
                usernames: parsedUsernames,
            });

            onConversationCreated(conversation);
            setConversationName("");
            setUsernames("");
            setOpen(false);
        } catch (err) {
            logger.error("Failed to create conversation", err);
            setError("Failed to create conversation");
        } finally {
            setLoading(false);
        }
    }

    if (!open) {
        return (
            <button className="add-conversation-button" onClick={() => setOpen(true)}>
                + New conversation
            </button>
        );
    }

    return (
        <form className="add-conversation-form" onSubmit={handleSubmit}>
            <input
                placeholder="Conversation name"
                value={conversationName}
                onChange={(e) => setConversationName(e.target.value)}
                autoFocus
            />
            <input
                placeholder="Usernames, separated by commas"
                value={usernames}
                onChange={(e) => setUsernames(e.target.value)}
            />
            {error && <p className="add-conversation-error">{error}</p>}
            <div className="add-conversation-actions">
                <button type="button" onClick={() => setOpen(false)} disabled={loading}>
                    Cancel
                </button>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </div>
        </form>
    );
}
