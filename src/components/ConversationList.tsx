import { useEffect, useState, type SetStateAction} from "react";
import { conversationService } from "../services";
import type {ConversationResponse} from "../models/Conversation";
import ConversationItem from "../components/ConversationItem";

function ConversationList() {

    const [conversations, setConversations] = useState<ConversationResponse[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {

        conversationService.getConversations()
            .then(setConversations)
            .catch((err: { message: SetStateAction<string>; }) => setError(err.message));

    }, []);

    return (
        <div className="list-group">

            {error && <div>{error}</div>}

            {conversations.map((conv) => (
                <ConversationItem
                    key={conv.conversationId}
                    conversation={conv}
                />
            ))}

        </div>
    );
}

export default ConversationList;