"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";

import { useAuth } from "@/contexts/AuthContext";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      !loading &&
      !user &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/404"
    ) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
