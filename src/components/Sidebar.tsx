'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Compass, Bot, ShieldCheck, Radar,
  QrCode, Users, Zap, ChevronRight, Bell, Settings, LogOut
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/copilot', label: 'AI Copilot', icon: Bot },
  { href: '/verify', label: 'Verify Hub', icon: ShieldCheck },
  { href: '/scout', label: 'Scout Agent', icon: Radar },
  { href: '/qr', label: 'QR Engine', icon: QrCode },
  { href: '/recruiter', label: 'Recruiter', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', padding: '0 8px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--indigo), var(--cyan))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: '800', color: 'white',
            boxShadow: '0 4px 20px rgba(26,115,232,0.3)',
          }}>O</div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: '700', fontSize: '18px', color: 'var(--text-primary)' }}>Optra</div>
            <div style={{ fontSize: '10px', color: 'var(--indigo)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Career OS</div>
          </div>
        </div>
      </Link>

      {/* Agent Status */}
      <div style={{
        background: 'rgba(24,128,56,0.08)',
        border: '1px solid rgba(24,128,56,0.2)',
        borderRadius: '10px',
        padding: '10px 12px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: 'var(--emerald)',
          boxShadow: '0 0 8px rgba(24,128,56,0.5)',
          animation: 'pulseGlow 2s ease-in-out infinite',
        }} />
        <span style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: '600' }}>Scout Agent Active</span>
        <Zap size={10} color="var(--emerald)" style={{ marginLeft: 'auto' }} />
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', padding: '0 8px', marginBottom: '8px' }}>
          Navigation
        </div>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px', marginBottom: '2px',
                background: active ? 'rgba(26,115,232,0.1)' : 'transparent',
                border: active ? '1px solid rgba(26,115,232,0.3)' : '1px solid transparent',
                color: active ? 'var(--indigo)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                fontSize: '14px', fontWeight: active ? '600' : '400',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(26,115,232,0.05)';
                  (e.currentTarget as HTMLDivElement).style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                  (e.currentTarget as HTMLDivElement).style.color = 'var(--text-secondary)';
                }
              }}
              >
                <Icon size={16} />
                {label}
                {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)', marginBottom: '12px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--indigo), var(--violet))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: '700', color: 'white',
          }}>RS</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Rahul Sharma</div>
            <div style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: '500' }}>✓ Optra Verified</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={14} />
          </button>
          <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={14} />
          </button>
          <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
