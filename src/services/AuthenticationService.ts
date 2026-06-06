import "./Parameters.ts"
export interface AuthentificationRequest {
    username: string
    password: string
}

export class AuthenticationService {
    private readonly apiURl = "http://localhost:8080";

    async login(request: AuthentificationRequest): Promise<void> {
        const response = await fetch(`${this.apiURl}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    async register(request: AuthentificationRequest): Promise<void> {
        const response = await fetch(`${this.apiURl}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    async disconnect(username:string): Promise<void> {
        const response = await fetch(`${this.apiURl}/disconnect`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username}),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }


}