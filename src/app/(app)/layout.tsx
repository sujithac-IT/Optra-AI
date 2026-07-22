'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Chatbot from '@/components/Chatbot';
import { useUser } from '@/context/AuthContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F172A, #1E293B)',
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '32px', fontWeight: '900', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '12px', background: 'linear-gradient(135deg, #1A73E8, #34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Optra AI
          </div>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1A73E8', animation: `pulseGlow 1.2s ease-in-out ${i * 0.3}s infinite` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <main className="main-content" style={{ flex: 1, padding: '32px', background: 'var(--bg-primary)' }}>
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
