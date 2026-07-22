'use client';
import { useState } from 'react';
import { mockOpportunities } from '@/lib/mockData';
import {
  Search, Filter, MapPin, Clock, Users, ExternalLink,
  Zap, CheckCircle, X, ChevronDown, Briefcase, Trophy,
  BookOpen, GraduationCap, Star, QrCode, Bot
} from 'lucide-react';

const types = ['all', 'job', 'internship', 'hackathon', 'grant', 'exam'];
const typeLabels: Record<string, string> = {
  all: 'All', job: '💼 Jobs', internship: '🎓 Internships',
  hackathon: '🏆 Hackathons', grant: '💡 Grants', exam: '📋 Exams',
};
const typeColors: Record<string, string> = {
  job: '#8B5CF6', internship: '#6366F1', hackathon: '#06B6D4',
  grant: '#10B981', exam: '#F59E0B',
};

function OpportunityModal({ opp, onClose }: { opp: typeof mockOpportunities[0]; onClose: () => void }) {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: '#12121E', border: `1px solid ${opp.color}44`,
        borderRadius: '24px', padding: '36px', maxWidth: '600px', width: '100%',
        boxShadow: `0 0 60px ${opp.color}22`,
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(99,102,241,0.1)', border: 'none', borderRadius: '8px', color: '#94A3B8', cursor: 'pointer', padding: '6px', display: 'flex' }}>
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: `${opp.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '800', color: opp.color, flexShrink: 0 }}>
            {opp.logo}
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '4px' }}>{opp.title}</h2>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>{opp.company}</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: opp.color, background: `${opp.color}18`, border: `1px solid ${opp.color}33`, padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
                {opp.type}
              </div>
              {opp.verified && <div className="verified-badge"><CheckCircle size={10} />Verified</div>}
            </div>
          </div>
        </div>

        {/* Match Score */}
        <div style={{ background: 'rgba(18,18,30,0.8)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Your AI Match Score</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: opp.matchScore >= 90 ? '#10B981' : '#F59E0B' }}>{opp.matchScore}%</div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${opp.matchScore}%` }} />
          </div>
          <div style={{ fontSize: '12px', color: '#475569', marginTop: '8px' }}>Based on your skills, CGPA, and past experience</div>
        </div>

        {/* Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Stipend / Prize', value: opp.stipend },
            { label: 'Location', value: opp.location },
            { label: 'Deadline', value: `${opp.daysLeft} days left` },
            { label: 'Applicants', value: opp.applicants.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'rgba(18,18,30,0.6)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(99,102,241,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#475569', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.7', marginBottom: '20px' }}>{opp.description}</p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {opp.tags.map(tag => (
            <div key={tag} style={{ fontSize: '12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818CF8', padding: '4px 12px', borderRadius: '20px' }}>{tag}</div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { setApplying(true); setTimeout(() => { setApplying(false); setApplied(true); }, 2000); }}
            disabled={applied}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              background: applied ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, #6366F1, #4F46E5)',
              color: applied ? '#10B981' : 'white',
              border: applied ? '1px solid rgba(16,185,129,0.4)' : 'none',
              fontSize: '14px', fontWeight: '700', cursor: applied ? 'default' : 'pointer',
              boxShadow: applied ? 'none' : '0 4px 20px rgba(99,102,241,0.4)',
              transition: 'all 0.3s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
            {applying ? <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} /> Generating AI Resume...</> :
              applied ? <><CheckCircle size={16} /> Applied with AI Resume!</> :
              <><Zap size={16} /> AI Quick Apply</>}
          </button>
          <button style={{ padding: '14px 16px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818CF8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}>
            <Bot size={16} /> Roadmap
          </button>
          <button style={{ padding: '14px 16px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818CF8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [selected, setSelected] = useState<typeof mockOpportunities[0] | null>(null);
  const [sortBy, setSortBy] = useState('match');

  const filtered = mockOpportunities.filter(o => {
    const matchesSearch = o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.company.toLowerCase().includes(search.toLowerCase()) ||
      o.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = activeType === 'all' || o.type === activeType;
    return matchesSearch && matchesType;
  }).sort((a, b) => sortBy === 'match' ? b.matchScore - a.matchScore : a.daysLeft - b.daysLeft);

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px' }}>Explore Opportunities</h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>AI-curated across jobs, hackathons, grants, and government exams — updated live</p>
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search size={16} color="#475569" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            className="input"
            placeholder="Search by role, company, or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '42px' }}
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ background: 'rgba(18,18,30,0.8)', border: '1px solid rgba(99,102,241,0.2)', color: '#94A3B8', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', outline: 'none' }}
        >
          <option value="match">Sort: Best Match</option>
          <option value="deadline">Sort: Deadline</option>
        </select>
      </div>

      {/* Type Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {types.map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            style={{
              padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
              cursor: 'pointer', border: '1px solid',
              borderColor: activeType === type ? (typeColors[type] || '#6366F1') : 'rgba(99,102,241,0.15)',
              background: activeType === type ? `${typeColors[type] || '#6366F1'}18` : 'transparent',
              color: activeType === type ? (typeColors[type] || '#818CF8') : '#64748B',
              transition: 'all 0.2s',
            }}
          >{typeLabels[type]}</button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: '13px', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
          {filtered.length} opportunities
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
        {filtered.map(opp => (
          <div
            key={opp.id}
            onClick={() => setSelected(opp)}
            style={{
              background: '#12121E', border: `1px solid rgba(99,102,241,0.12)`,
              borderLeft: `3px solid ${opp.color}`,
              borderRadius: '16px', padding: '20px',
              cursor: 'pointer', transition: 'all 0.25s ease',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${opp.color}44`;
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px ${opp.color}18`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.12)';
              (e.currentTarget as HTMLDivElement).style.transform = 'none';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            {/* Top Row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${opp.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: opp.color }}>
                  {opp.logo}
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: opp.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{opp.type}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{opp.source}</div>
                </div>
              </div>
              <div style={{
                fontSize: '14px', fontWeight: '800',
                color: opp.matchScore >= 90 ? '#10B981' : opp.matchScore >= 75 ? '#F59E0B' : '#F43F5E',
                background: opp.matchScore >= 90 ? 'rgba(16,185,129,0.1)' : opp.matchScore >= 75 ? 'rgba(245,158,11,0.1)' : 'rgba(244,63,94,0.1)',
                padding: '4px 10px', borderRadius: '20px',
                border: `1px solid ${opp.matchScore >= 90 ? 'rgba(16,185,129,0.3)' : opp.matchScore >= 75 ? 'rgba(245,158,11,0.3)' : 'rgba(244,63,94,0.3)'}`,
              }}>
                {opp.matchScore}% match
              </div>
            </div>

            {/* Title & Company */}
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px', fontFamily: 'Space Grotesk' }}>{opp.title}</h3>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
              {opp.company} {opp.verified && <span style={{ color: '#10B981', fontSize: '11px' }}>✓ Verified</span>}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
              {opp.tags.slice(0, 3).map(tag => (
                <span key={tag} style={{ fontSize: '11px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', color: '#818CF8', padding: '2px 8px', borderRadius: '20px' }}>{tag}</span>
              ))}
              {opp.tags.length > 3 && <span style={{ fontSize: '11px', color: '#475569' }}>+{opp.tags.length - 3}</span>}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(99,102,241,0.08)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={11} color={opp.color} /> {opp.stipend}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: opp.daysLeft <= 10 ? '#F43F5E' : '#64748B' }}>
                <Clock size={11} /> {opp.daysLeft}d left
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && <OpportunityModal opp={selected} onClose={() => setSelected(null)} />}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
