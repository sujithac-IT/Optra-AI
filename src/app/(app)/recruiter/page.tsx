'use client';
import { useState } from 'react';
import { mockCandidates } from '@/lib/mockData';
import {
  Search, Filter, CheckCircle, Star, Trophy,
  Zap, Eye, Users, TrendingUp, ShieldCheck, BarChart3,
  ChevronRight, Download, MessageSquare, Phone, Mail, X
} from 'lucide-react';

function CandidateModal({ c, onClose }: { c: typeof mockCandidates[0]; onClose: () => void }) {
  const [hired, setHired] = useState(false);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <div style={{ background: '#12121E', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '24px', padding: '36px', maxWidth: '580px', width: '100%', boxShadow: '0 0 60px rgba(99,102,241,0.2)', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(99,102,241,0.1)', border: 'none', borderRadius: '8px', color: '#94A3B8', cursor: 'pointer', padding: '6px', display: 'flex' }}><X size={18} /></button>

        {/* Profile */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
            {c.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Space Grotesk' }}>{c.name}</h2>
              {c.verified && <div className="verified-badge"><CheckCircle size={11} /> Verified</div>}
            </div>
            <div style={{ fontSize: '14px', color: '#64748B' }}>{c.college}</div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <span style={{ fontSize: '13px', color: '#94A3B8' }}>CGPA: <strong style={{ color: '#F8FAFC' }}>{c.cgpa}</strong></span>
              <span style={{ fontSize: '13px', color: '#94A3B8' }}>Score: <strong style={{ color: '#6366F1' }}>{c.optraScore}</strong></span>
              <span style={{ fontSize: '13px', color: '#94A3B8' }}>Match: <strong style={{ color: '#10B981' }}>{c.matchRole}%</strong></span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Hackathon Wins', value: c.hackathonWins, icon: '🏆', color: '#F59E0B' },
            { label: 'GitHub Stars', value: c.githubStars, icon: '⭐', color: '#8B5CF6' },
            { label: 'Role Match', value: `${c.matchRole}%`, icon: '🎯', color: '#10B981' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} style={{ background: 'rgba(18,18,30,0.8)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(99,102,241,0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{icon}</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color, fontFamily: 'Space Grotesk' }}>{value}</div>
              <div style={{ fontSize: '11px', color: '#475569' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Skills</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {c.skills.map(s => (
              <span key={s} style={{ fontSize: '12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818CF8', padding: '4px 12px', borderRadius: '20px' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Verification */}
        <div style={{ background: c.verified ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.06)', border: `1px solid ${c.verified ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`, borderRadius: '12px', padding: '14px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: c.verified ? '#10B981' : '#F59E0B', marginBottom: '6px' }}>
            {c.verified ? '✓ Optra Verified Profile' : '⚠️ Standard Profile (not verified)'}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>
            {c.verified ? 'DigiLocker academic credentials, AI face-verified identity, and anti-proxy assessment compliance confirmed.' : 'This candidate has not completed DigiLocker or face verification yet.'}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setHired(true)}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              background: hired ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, #6366F1, #4F46E5)',
              color: hired ? '#10B981' : 'white', border: hired ? '1px solid rgba(16,185,129,0.4)' : 'none',
              fontSize: '14px', fontWeight: '700', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
            {hired ? <><CheckCircle size={16} />Interview Scheduled!</> : <><Zap size={16} />1-Click Schedule Interview</>}
          </button>
          <button style={{ padding: '14px 16px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818CF8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}>
            <Download size={15} /> Resume
          </button>
          <button style={{ padding: '14px 16px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818CF8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}>
            <MessageSquare size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecruiterPage() {
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<typeof mockCandidates[0] | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minScore, setMinScore] = useState(0);

  const filtered = mockCandidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.college.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchVerified = !verifiedOnly || c.verified;
    const matchScore = c.optraScore >= minScore;
    return matchSearch && matchVerified && matchScore;
  });

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px' }}>Recruiter Portal</h1>
          <p style={{ fontSize: '14px', color: '#64748B' }}>Search verified candidates with AI skill graphs, CGPA proof, and anti-proxy assessments</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ padding: '10px 20px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#818CF8', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={15} /> {filtered.length} candidates
          </div>
        </div>
      </div>

      {/* B2B Value Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: '✅', label: 'Verified CGPA', value: '100%', sub: 'DigiLocker confirmed', color: '#10B981' },
          { icon: '🔒', label: 'Anti-Proxy', value: 'AI Active', sub: 'Face-verified assessments', color: '#6366F1' },
          { icon: '⚡', label: 'Hire Speed', value: '3 days', sub: 'vs industry 3 weeks', color: '#06B6D4' },
          { icon: '🎯', label: 'Avg Match', value: '87%', sub: 'Skill-to-role accuracy', color: '#F59E0B' },
        ].map(({ icon, label, value, sub, color }) => (
          <div key={label} className="stat-card">
            <div style={{ fontSize: '22px', marginBottom: '6px' }}>{icon}</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color, fontFamily: 'Space Grotesk' }}>{value}</div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#F8FAFC' }}>{label}</div>
            <div style={{ fontSize: '11px', color: '#475569' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={15} color="#475569" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input className="input" placeholder="Search by name, college, or skill..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '42px' }} />
        </div>

        {/* Verified Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '10px', background: verifiedOnly ? 'rgba(16,185,129,0.1)' : 'rgba(18,18,30,0.8)', border: `1px solid ${verifiedOnly ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.2)'}`, cursor: 'pointer' }}
          onClick={() => setVerifiedOnly(!verifiedOnly)}>
          <ShieldCheck size={15} color={verifiedOnly ? '#10B981' : '#475569'} />
          <span style={{ fontSize: '13px', color: verifiedOnly ? '#10B981' : '#64748B', fontWeight: '600' }}>Verified Only</span>
          <div style={{ width: '32px', height: '18px', borderRadius: '9px', background: verifiedOnly ? '#10B981' : 'rgba(99,102,241,0.2)', position: 'relative', transition: 'background 0.3s' }}>
            <div style={{ position: 'absolute', top: '2px', left: verifiedOnly ? '16px' : '2px', width: '14px', height: '14px', borderRadius: '50%', background: 'white', transition: 'left 0.3s' }} />
          </div>
        </div>

        <select value={minScore} onChange={e => setMinScore(Number(e.target.value))} style={{ background: 'rgba(18,18,30,0.8)', border: '1px solid rgba(99,102,241,0.2)', color: '#94A3B8', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', cursor: 'pointer', outline: 'none' }}>
          <option value={0}>Min Score: Any</option>
          <option value={750}>Min Score: 750+</option>
          <option value={800}>Min Score: 800+</option>
          <option value={850}>Min Score: 850+</option>
        </select>
      </div>

      {/* Candidates Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr auto', gap: '16px', padding: '14px 24px', background: 'rgba(99,102,241,0.06)', borderBottom: '1px solid rgba(99,102,241,0.1)', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <span>Candidate</span>
          <span>Optra Score</span>
          <span>CGPA</span>
          <span>Match</span>
          <span>Hackathons</span>
          <span>Verified</span>
          <span>Action</span>
        </div>

        {filtered.map((c, i) => (
          <div key={c.id} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr auto',
            gap: '16px', padding: '16px 24px', borderBottom: '1px solid rgba(99,102,241,0.06)',
            alignItems: 'center', transition: 'background 0.2s', cursor: 'pointer',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(99,102,241,0.04)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
            onClick={() => setSelectedCandidate(c)}>

            {/* Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                {c.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{c.name}</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>{c.college}</div>
              </div>
            </div>

            {/* Score */}
            <div style={{ fontSize: '16px', fontWeight: '800', background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'Space Grotesk' }}>
              {c.optraScore}
            </div>

            {/* CGPA */}
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#F8FAFC' }}>{c.cgpa}</div>

            {/* Match */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ flex: 1, height: '4px', background: 'rgba(99,102,241,0.15)', borderRadius: '2px', maxWidth: '60px' }}>
                <div style={{ width: `${c.matchRole}%`, height: '100%', background: c.matchRole >= 90 ? '#10B981' : '#F59E0B', borderRadius: '2px' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: c.matchRole >= 90 ? '#10B981' : '#F59E0B' }}>{c.matchRole}%</span>
            </div>

            {/* Hackathon wins */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: Math.min(c.hackathonWins, 4) }).map((_, i) => (
                <span key={i} style={{ fontSize: '14px' }}>🏆</span>
              ))}
            </div>

            {/* Verified */}
            <div>
              {c.verified
                ? <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#10B981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '3px 8px', borderRadius: '20px', fontWeight: '600' }}><CheckCircle size={10} /> Verified</div>
                : <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#475569', background: 'rgba(71,85,105,0.1)', border: '1px solid rgba(71,85,105,0.2)', padding: '3px 8px', borderRadius: '20px' }}>Standard</div>}
            </div>

            {/* Action */}
            <button
              onClick={e => { e.stopPropagation(); setSelectedCandidate(c); }}
              style={{ padding: '8px 14px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366F1, #4F46E5)', border: 'none', color: 'white', fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={12} /> View
            </button>
          </div>
        ))}
      </div>

      {/* Pricing Callout */}
      <div style={{ marginTop: '24px', background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.08))', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '20px', padding: '28px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px' }}>Upgrade to Recruiter Pro</div>
          <div style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>
            Unlock unlimited verified candidate access, bulk CSV export, ATS integration, and priority matching alerts for your open roles.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#6366F1', fontFamily: 'Space Grotesk' }}>₹4,999</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>per month / seat</div>
          </div>
          <button style={{ padding: '12px 24px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: 'white', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 20px rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={15} /> Get Pro Access
          </button>
        </div>
      </div>

      {selectedCandidate && <CandidateModal c={selectedCandidate} onClose={() => setSelectedCandidate(null)} />}
    </div>
  );
}
