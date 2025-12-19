// lib/auth.ts

import { AuthResponse, SignUpData, LoginData, User } from '../../types';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export class AuthService {
    private static TOKEN_KEY = 'auth_token';

    // Store token in localStorage
    static setToken(token: string): void {
        if (typeof window !== 'undefined') {
        localStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    // Get token from localStorage
    static getToken(): string | null {
        if (typeof window !== 'undefined') {
        return localStorage.getItem(this.TOKEN_KEY);
        }
        return null;
    }

    // Remove token
    static removeToken(): void {
        if (typeof window !== 'undefined') {
        localStorage.removeItem(this.TOKEN_KEY);
        }
    }

    // Get auth headers
    static getAuthHeaders(): HeadersInit {
        const token = this.getToken();
        return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        };
    }

    // Sign up with email/password
    static async signUp(data: SignUpData): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        });

        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Sign up failed');
        }

        const authResponse: AuthResponse = await response.json();
        this.setToken(authResponse.token);
        return authResponse;
    }

    // Login with email/password
    static async login(data: LoginData): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        });

        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
        }

        const authResponse: AuthResponse = await response.json();
        this.setToken(authResponse.token);
        return authResponse;
    }

    // Google OAuth login
    static async googleLogin(token: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        });

        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Google login failed');
        }

        const authResponse: AuthResponse = await response.json();
        this.setToken(authResponse.token);
        return authResponse;
    }

    // Get current user
    static async getCurrentUser(): Promise<User> {
        const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: this.getAuthHeaders(),
        });

        if (!response.ok) {
        throw new Error('Not authenticated');
        }

        return response.json();
    }

    // Logout
    static logout(): void {
        this.removeToken();
    }
}