// app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <h1>EventSync</h1>
      <p>
        Bienvenue — <Link href="/admin">Administration</Link>
      </p>
    </main>
  );
}
