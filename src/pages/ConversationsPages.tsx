import ConversationList from "../components/ConversationList";

export default function ConversationPage() {
    return (
        <div style={{ display: "flex" }}>
            <ConversationList />
            <div>Conversation</div>
        </div>
    );
}