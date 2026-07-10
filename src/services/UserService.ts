export type CurrentUserResponse = {
    username: string;
    email: string;
};

export type FriendResponse = {
    name: string;
    email: string;
};

export type FriendsResponse = {
    friends: FriendResponse[];
};

export type UserProfile = CurrentUserResponse & {
    friends: FriendResponse[];
};

export class UserService {
    private readonly apiUrl = "/api";

    async getCurrentUser(): Promise<CurrentUserResponse> {
        const response = await fetch(`${this.apiUrl}/me`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to load current user");
        }

        return response.json();
    }

    async getFriends(): Promise<FriendResponse[]> {
        const response = await fetch(`${this.apiUrl}/friend`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to load friends");
        }

        const data: FriendsResponse = await response.json();
        return data.friends;
    }

    async addFriend(friendEmail: string): Promise<void> {
        const response = await fetch(`${this.apiUrl}/friend`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ friendEmail }),
        });

        if (!response.ok) {
            throw new Error("Failed to add friend");
        }
    }

    async getProfile(): Promise<UserProfile> {
        const [user, friends] = await Promise.all([
            this.getCurrentUser(),
            this.getFriends(),
        ]);

        return {
            ...user,
            friends,
        };
    }
}
