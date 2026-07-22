'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockStudentProfile, mockOpportunities, mockScoutActivity } from '@/lib/mockData';
import {
  TrendingUp, Clock, CheckCircle, Zap, ArrowRight,
  Target, Star, AlertCircle, ChevronRight, Briefcase,
  Trophy, BookOpen, Bell, BarChart3
} from 'lucide-react';

const statusColors: Record<string, string> = {
  under_review: '#F29900',
  interview_scheduled: '#188038',
  applied: '#1A73E8',
  accepted: '#12B5CB',
};
const statusLabels: Record<string, string> = {
  under_review: 'Under Review',
  interview_scheduled: 'Interview Scheduled',
  applied: 'Applied',
  accepted: 'Accepted ✓',
};

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const pct = score / 1000;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="8" />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke="url(#scoreGrad)" strokeWidth="8"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.5s ease' }}
      />
      <defs>
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const p = mockStudentProfile;
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'var(--indigo)', fontWeight: '600', marginBottom: '4px' }}>Good evening 👋</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px', color: 'var(--text-primary)' }}>Welcome back, {p.name.split(' ')[0]}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{p.college} · {p.year} · {p.branch}</div>
            {p.verified && (
              <div className="verified-badge">
                <CheckCircle size={12} /> Optra Verified
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/explore" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} /> Find Opportunities
            </button>
          </Link>
        </div>
      </div>

      {/* Top Row — Score + Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Score Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--indigo)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Optra Score</div>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <ScoreRing score={mounted ? p.optraScore : 0} size={140} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', fontFamily: 'Space Grotesk', background: 'linear-gradient(135deg, var(--indigo), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {mounted ? p.optraScore : 0}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ 1000</div>
            </div>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Top 8% of students</div>
          <div style={{ width: '100%' }}>
            {[
              { label: 'Academics', val: 84, color: 'var(--indigo)' },
              { label: 'Projects', val: 90, color: 'var(--cyan)' },
              { label: 'Verification', val: 100, color: 'var(--emerald)' },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  <span>{label}</span><span style={{ color }}>{val}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: mounted ? `${val}%` : '0%', background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '16px' }}>
          {[
            { icon: <Target size={20} />, label: 'Avg Match Score', value: `${p.matchScore}%`, sub: 'Across 8 opportunities', color: 'var(--indigo)', bg: 'rgba(26,115,232,0.08)' },
            { icon: <Briefcase size={20} />, label: 'Applications', value: p.applications.length, sub: '1 interview scheduled', color: 'var(--cyan)', bg: 'rgba(18,181,203,0.08)' },
            { icon: <Bell size={20} />, label: 'New Opportunities', value: '12', sub: 'Found today by Scout', color: 'var(--emerald)', bg: 'rgba(24,128,56,0.08)' },
            { icon: <Clock size={20} />, label: 'Deadline Alert', value: '8 days', sub: 'Supermind AI closes soon', color: 'var(--rose)', bg: 'rgba(217,48,37,0.08)' },
          ].map(({ icon, label, value, sub, color, bg }) => (
            <div key={label} className="stat-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', color, marginBottom: '4px' }}>{value}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>{label}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Top Opportunities */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>Top Matches Today</div>
            <Link href="/explore" style={{ textDecoration: 'none', fontSize: '12px', color: 'var(--indigo)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              See all <ChevronRight size={12} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockOpportunities.slice(0, 4).map(opp => (
              <div key={opp.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px', borderRadius: '10px',
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'var(--bg-secondary)', color: 'var(--indigo)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: '800', flexShrink: 0,
                }}>{opp.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{opp.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{opp.company} · {opp.daysLeft}d left</div>
                </div>
                <div style={{
                  fontSize: '13px', fontWeight: '700',
                  color: opp.matchScore >= 90 ? 'var(--emerald)' : opp.matchScore >= 75 ? 'var(--amber)' : 'var(--rose)',
                  flexShrink: 0,
                }}>{opp.matchScore}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Tracker */}
        <div className="card">
          <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk', marginBottom: '20px' }}>Application Tracker</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {p.applications.map((app, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColors[app.status], flexShrink: 0, boxShadow: `0 0 8px ${statusColors[app.status]}` }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{app.role}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{app.company} · {app.date}</div>
                </div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: statusColors[app.status], background: `${statusColors[app.status]}18`, border: `1px solid ${statusColors[app.status]}44`, padding: '3px 8px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                  {statusLabels[app.status]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Roadmap */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>Your Roadmap</div>
            <Link href="/copilot" style={{ textDecoration: 'none', fontSize: '12px', color: 'var(--indigo)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Update <ChevronRight size={12} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {p.roadmap.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', opacity: item.done ? 0.7 : 1 }}>
                <div style={{ flexShrink: 0, marginTop: '2px' }}>
                  {item.done
                    ? <CheckCircle size={16} color="#10B981" />
                    : <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid ${item.priority === 'high' ? '#F43F5E' : '#6366F1'}` }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: item.done ? '400' : '600', textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                    {item.task}
                  </div>
                  {!item.done && (
                    <div style={{ fontSize: '11px', color: item.priority === 'high' ? 'var(--rose)' : 'var(--indigo)', marginTop: '2px', fontWeight: '600' }}>
                      {item.priority === 'high' ? '🔴 High Priority' : '🔵 Medium Priority'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scout Activity */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>Scout Activity</div>
            <Link href="/scout" style={{ textDecoration: 'none', fontSize: '12px', color: 'var(--emerald)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Live Feed <ChevronRight size={12} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mockScoutActivity.slice(0, 5).map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%', marginTop: '5px',
                    background: log.type === 'new' ? 'var(--emerald)' : log.type === 'alert' ? 'var(--amber)' : 'var(--indigo)',
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.event}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{log.source} · {log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
