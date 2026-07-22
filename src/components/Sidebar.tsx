'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Search, Bot, ShieldCheck, Radar,
  QrCode, Users, Zap, ChevronRight, Bell, Settings, LogOut
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explore', label: 'Explore', icon: Search },
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
            background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: '800', color: 'white',
            boxShadow: '0 4px 20px rgba(99,102,241,0.5)',
          }}>O</div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: '700', fontSize: '18px', color: '#F8FAFC' }}>Optra</div>
            <div style={{ fontSize: '10px', color: '#6366F1', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Career OS</div>
          </div>
        </div>
      </Link>

      {/* Agent Status */}
      <div style={{
        background: 'rgba(16,185,129,0.08)',
        border: '1px solid rgba(16,185,129,0.2)',
        borderRadius: '10px',
        padding: '10px 12px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#10B981',
          boxShadow: '0 0 8px rgba(16,185,129,0.8)',
          animation: 'pulseGlow 2s ease-in-out infinite',
        }} />
        <span style={{ fontSize: '11px', color: '#6EE7B7', fontWeight: '600' }}>Scout Agent Active</span>
        <Zap size={10} color="#6EE7B7" style={{ marginLeft: 'auto' }} />
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: '10px', color: '#475569', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', padding: '0 8px', marginBottom: '8px' }}>
          Navigation
        </div>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px', marginBottom: '2px',
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                border: active ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                color: active ? '#818CF8' : '#64748B',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                fontSize: '14px', fontWeight: active ? '600' : '400',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(99,102,241,0.08)';
                  (e.currentTarget as HTMLDivElement).style.color = '#94A3B8';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                  (e.currentTarget as HTMLDivElement).style.color = '#64748B';
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
      <div style={{ borderTop: '1px solid rgba(99,102,241,0.15)', paddingTop: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px', background: 'rgba(18,18,30,0.8)', border: '1px solid rgba(99,102,241,0.15)', marginBottom: '12px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: '700', color: 'white',
          }}>RS</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Rahul Sharma</div>
            <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '500' }}>✓ Optra Verified</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(99,102,241,0.15)', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={14} />
          </button>
          <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(99,102,241,0.15)', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={14} />
          </button>
          <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(99,102,241,0.15)', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
