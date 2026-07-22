'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutGrid, Search, Sparkles, UserCheck, Compass,
  QrCode, Briefcase, ChevronRight, Bell, Settings, LogOut
} from 'lucide-react';
import { FaceScanIcon } from '@/components/Icons';
import { useUser, getInitials } from '@/context/AuthContext';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/explore', label: 'Explore & Jobs', icon: Search },
  { href: '/copilot', label: 'AI Copilot', icon: Sparkles, badge: 'ChatGPT/Gemini' },
  { href: '/verify', label: 'Face ID & Verify', icon: UserCheck, highlight: true },
  { href: '/scout', label: 'Scout Agent', icon: Compass },
  { href: '/qr', label: 'QR Engine', icon: QrCode },
  { href: '/recruiter', label: 'Recruiter Hub', icon: Briefcase },
];

export default function Sidebar({ onOpenVerify }: { onOpenVerify?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const initials = user ? getInitials(user.name) : '??';
  const displayName = user?.name ?? 'Guest';

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', padding: '0 8px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #1A73E8, #34A853)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', fontWeight: '800', color: 'white',
            boxShadow: '0 4px 16px rgba(26,115,232,0.3)',
          }}>O</div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: '700', fontSize: '19px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Optra AI</div>
            <div style={{ fontSize: '10px', color: '#1A73E8', fontWeight: '700', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Google Career OS</div>
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', padding: '0 8px', marginBottom: '10px' }}>
          Workspace Navigation
        </div>
        {navItems.map(({ href, label, icon: Icon, badge, highlight }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '11px',
                padding: '10px 14px', borderRadius: '12px', marginBottom: '4px',
                background: active ? 'rgba(26,115,232,0.12)' : 'transparent',
                border: active ? '1px solid rgba(26,115,232,0.35)' : '1px solid transparent',
                color: active ? '#1A73E8' : 'var(--text-secondary)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                fontSize: '13.5px', fontWeight: active ? '600' : '500',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(26,115,232,0.06)';
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
                <Icon size={18} strokeWidth={active ? 2.2 : 1.8} color={active ? '#1A73E8' : 'currentColor'} />
                <span>{label}</span>
                {badge && (
                  <span style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: '700', color: '#1A73E8', background: 'rgba(26,115,232,0.12)', padding: '2px 6px', borderRadius: '10px' }}>
                    {badge}
                  </span>
                )}
                {highlight && !active && (
                  <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#34A853' }} />
                )}
                {active && !badge && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '16px' }}>
        <div
          onClick={onOpenVerify}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '12px',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            marginBottom: '12px', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1A73E8')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A73E8, #8E24AA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: '700', color: 'white',
            flexShrink: 0,
          }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</div>
            <div style={{ fontSize: '11px', color: '#188038', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaceScanIcon size={12} color="#188038" /> Face ID Verified
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button title="Notifications" style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={15} />
          </button>
          <button title="Settings" style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={15} />
          </button>
          <button title="Logout" onClick={handleLogout} style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
