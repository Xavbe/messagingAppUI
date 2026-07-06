import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    username: string | null;
    setUsername: (value: string | null) => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/me", {
            credentials: "include"
        })
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setAuthenticated(true);
                    setUsername(data.username);
                } else {
                    setAuthenticated(false);
                    setUsername(null);
                }
            })
            .catch(() => {
                setAuthenticated(false);
                setUsername(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setAuthenticated,
            username,
            setUsername,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}