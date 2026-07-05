import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthenticationService } from "../services";
import "../style/LoginPage.css";

const authService = new AuthenticationService();

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setAuthenticated, setUsername: setAuthUsername } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await authService.login({ username, password });
            setAuthenticated(true);
            setAuthUsername(username);
            navigate("/chat");
        } catch (err) {
            setError("Username or password is incorrect");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-brand">
                    <span className="login-brand-mark" />
                    <h1>Chat</h1>
                    <p>Login to your account to chat</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <label>
                        Nom d'utilisateur
                        <input
                            placeholder="username or email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                    </label>

                    <label>
                        Mot de passe
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    {error && <p className="login-error">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <span className="typing-indicator">
                                <span /><span /><span />
                            </span>
                        ) : (
                            "Connect"
                        )}
                    </button>
                    <p className="login-switch">
                        No account yet <Link to="/register">register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}