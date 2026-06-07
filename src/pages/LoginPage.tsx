import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthenticationService } from "../services";

const authService = new AuthenticationService();

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setAuthenticated} = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        try{
            await authService.login({username, password})
            setAuthenticated(true);
            navigate("/chat");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>
    );
}
