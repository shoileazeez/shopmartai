"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance, initCSRF } from "../utils/axios";

type User = {
    pk: number;
    email: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchUser() {
        try {
            const res = await axiosInstance.get("/auth/user/");
            setUser(res.data);
        } catch {
            setUser(null);
        }
    }

    async function logout() {
        await axiosInstance.post("/auth/logout/");
        setUser(null);
    }

    useEffect(() => {
        async function bootstrap() {
            try {
                await initCSRF(); // IMPORTANT
                await fetchUser();
            } finally {
                setLoading(false);
            }
        }

        bootstrap();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                refreshUser: fetchUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}
