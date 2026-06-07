import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch("http://localhost:8080/", {
            credentials: "include"
        })
            .then(res => setAuthenticated(res.ok))
            .catch(() => setAuthenticated(false))
            .finally(() => setLoading(false));

    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setAuthenticated,
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