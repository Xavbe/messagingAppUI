import type {ConversationResponse} from "../models/Conversation.ts";

type Props = {
    conversation: ConversationResponse;
    onClick?: () => void;
}

function ConversationList({ conversation, onClick }: Props) {
    return (
        <a
            href="#"
            className="list-group-item list-group-item-action"
            onClick={onClick}
        >
            <div className="d-flex w-100 justify-content-between">

                <h5 className="mb-1">
                    {conversation.conversationName}
                </h5>

                <small className="text-body-secondary">
                    {conversation.updatedAt ?? ""}
                </small>

            </div>

            <p className="mb-1">
                {conversation.message}
            </p>

        </a>
    )
}

export default ConversationList