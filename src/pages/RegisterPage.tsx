import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthenticationService } from "../services";
import { logger } from "../services/logger.ts";
import "../style/LoginPage.css";

const authService = new AuthenticationService();

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setAuthenticated, setUsername: setAuthUsername } = useAuth();
    const navigate = useNavigate();

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await authService.register({ username, email, password });
            setAuthenticated(true);
            setAuthUsername(username);
            navigate("/chat");
        } catch (err) {
            setError("Impossible de créer le compte. Le nom d'utilisateur ou l'email est peut-être déjà utilisé.");
            logger.error("Registration failed", err);
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
                    <p>Créez votre compte pour commencer à discuter</p>
                </div>

                <form onSubmit={handleRegister} className="login-form">
                    <label>
                        Nom d'utilisateur
                        <input
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            "Create an Account"
                        )}
                    </button>
                </form>

                <p className="login-switch">
                    Already have an account ? <Link to="/login">login</Link>
                </p>
            </div>
        </div>
    );
}
