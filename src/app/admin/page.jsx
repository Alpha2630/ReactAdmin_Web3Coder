'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminClient from './AdminClient';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthenticated(true);
          } else {
            router.replace('/admin/login');
          }
        } else {
          router.replace('/admin/login');
        }
      } catch {
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement...</div>;
  }

  if (!authenticated) {
    return null;
  }

  return <AdminClient />;
}