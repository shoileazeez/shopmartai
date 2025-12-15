"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/layout/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [loading, user]);

    if (loading || !user) return null;

    return <>{children}</>;
}
