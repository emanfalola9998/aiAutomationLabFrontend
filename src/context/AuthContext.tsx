// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, SignUpData, LoginData } from '../../types';
import { AuthService } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated on mount
        const checkAuth = async () => {
        const token = AuthService.getToken();
        if (token) {
            try {
            const currentUser = await AuthService.getCurrentUser();
            setUser(currentUser);
            } catch (error) {
            console.error('Auth check failed:', error);
            AuthService.removeToken();
            }
        }
        setLoading(false);
        };

        checkAuth();
    }, []);

    const signUp = async (data: SignUpData) => {
        try {
        const response = await AuthService.signUp(data);
        setUser(response.user);
        } catch (error) {
        throw error;
        }
    };

    const login = async (data: LoginData) => {
        try {
        const response = await AuthService.login(data);
        setUser(response.user);
        } catch (error) {
        throw error;
        }
    };

    const googleLogin = async (credential: string) => {
        try {
        const response = await AuthService.googleLogin(credential);
        setUser(response.user);
        } catch (error) {
        throw error;
        }
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        signUp,
        googleLogin,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }

    export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}