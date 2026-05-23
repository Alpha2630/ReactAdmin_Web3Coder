"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUser(data.user);
      } catch {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tableau de bord administrateur</h1>
      <p>Bienvenue, {user?.email || "Admin"} !</p>
      <p>Vous êtes bien connecté.</p>
      <button
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          router.push("/admin/login");
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
}