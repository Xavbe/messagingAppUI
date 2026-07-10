import { logger } from "./logger.ts";

export interface AuthentificationRequest {
    username: string
    password: string
}

export interface RegistrationRequest extends AuthentificationRequest {
    email: string
}

export class AuthenticationService {
    private readonly apiURl = "/api"

    async login(request: AuthentificationRequest): Promise<void> {
        logger.debug("Login request sent");
        const response = await fetch(`${this.apiURl}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request),
        });
        logger.debug("Login response received", response.status);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    async register(request: RegistrationRequest): Promise<void> {
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
