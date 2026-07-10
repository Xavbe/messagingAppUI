import { useEffect, useState } from "react";
import { userService } from "../services";
import type { UserProfile } from "../services/UserService.ts";
import { logger } from "../services/logger.ts";
import "../style/ProfilePage.css";

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [friendEmail, setFriendEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        setError("");
        setLoading(true);

        try {
            const loadedProfile = await userService.getProfile();
            setProfile(loadedProfile);
        } catch (err) {
            logger.error("Failed to load profile", err);
            setError("Failed to load profile");
        } finally {
            setLoading(false);
        }
    }

    async function handleAddFriend(e: React.FormEvent) {
        e.preventDefault();
        if (!friendEmail.trim()) return;

        setError("");
        setSaving(true);

        try {
            await userService.addFriend(friendEmail.trim());
            setFriendEmail("");
            await loadProfile();
        } catch (err) {
            logger.error("Failed to add friend", err);
            setError("Failed to add friend");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <p className="profile-status">Loading profile...</p>;
    }

    if (!profile) {
        return <p className="profile-status profile-status-error">{error || "Profile unavailable"}</p>;
    }

    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-avatar">{profile.username[0]?.toUpperCase()}</div>
                <div>
                    <h1>{profile.username}</h1>
                    <p>{profile.email}</p>
                </div>
            </section>

            <section className="profile-section">
                <div className="profile-section-header">
                    <h2>Friends</h2>
                    <span>{profile.friends.length}</span>
                </div>

                <form className="profile-add-friend" onSubmit={handleAddFriend}>
                    <input
                        type="email"
                        placeholder="friend@example.com"
                        value={friendEmail}
                        onChange={(e) => setFriendEmail(e.target.value)}
                    />
                    <button type="submit" disabled={saving || !friendEmail.trim()}>
                        {saving ? "Adding..." : "Add"}
                    </button>
                </form>

                {error && <p className="profile-status profile-status-error">{error}</p>}

                {profile.friends.length === 0 ? (
                    <p className="profile-empty">No friends yet</p>
                ) : (
                    <ul className="profile-friend-list">
                        {profile.friends.map((friend) => (
                            <li key={friend.email} className="profile-friend-item">
                                <span>{friend.name}</span>
                                <small>{friend.email}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
