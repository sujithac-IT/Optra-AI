'use client';
import { useState } from 'react';
import { mockOpportunities } from '@/lib/mockData';
import {
  Search, Filter, MapPin, Clock, Users, ExternalLink,
  Zap, CheckCircle, X, ChevronDown, Briefcase, Trophy,
  BookOpen, GraduationCap, Star, QrCode, Bot, Sparkles, Building2
} from 'lucide-react';

const types = ['all', 'job', 'internship', 'hackathon', 'grant', 'exam'];
const typeLabels: Record<string, string> = {
  all: 'All', job: '💼 Jobs', internship: '🎓 Internships',
  hackathon: '🏆 Hackathons', grant: '💡 Grants', exam: '📋 Exams',
};
const typeColors: Record<string, string> = {
  job: 'var(--violet)', internship: 'var(--indigo)', hackathon: 'var(--cyan)',
  grant: 'var(--emerald)', exam: 'var(--amber)',
};

function OpportunityModal({ opp, onClose }: { opp: typeof mockOpportunities[0]; onClose: () => void }) {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-card)', border: `1px solid var(--border)`,
        borderRadius: '24px', padding: '36px', maxWidth: '600px', width: '100%',
        boxShadow: `0 12px 40px rgba(0,0,0,0.1)`,
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px', display: 'flex' }}>
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '800', color: typeColors[opp.type] || 'var(--indigo)', flexShrink: 0 }}>
            {opp.logo}
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '4px', color: 'var(--text-primary)' }}>{opp.title}</h2>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{opp.company}</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: typeColors[opp.type] || 'var(--indigo)', background: 'var(--bg-secondary)', border: `1px solid var(--border)`, padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
                {opp.type}
              </div>
              {opp.verified && <div className="verified-badge" style={{ background: 'var(--bg-secondary)', color: 'var(--emerald)', border: '1px solid var(--emerald)' }}><CheckCircle size={10} />Verified</div>}
            </div>
          </div>
        </div>

        {/* Match Score */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Your AI Match Score</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: opp.matchScore >= 90 ? 'var(--emerald)' : 'var(--amber)' }}>{opp.matchScore}%</div>
          </div>
          <div className="progress-bar" style={{ background: 'var(--border)' }}>
            <div className="progress-fill" style={{ width: `${opp.matchScore}%`, background: opp.matchScore >= 90 ? 'var(--emerald)' : 'var(--amber)' }} />
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Based on your skills, CGPA, and past experience</div>
        </div>

        {/* Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Stipend / Prize', value: opp.stipend },
            { label: 'Location', value: opp.location },
            { label: 'Deadline', value: `${opp.daysLeft} days left` },
            { label: 'Applicants', value: opp.applicants.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>{opp.description}</p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {opp.tags.map(tag => (
            <div key={tag} style={{ fontSize: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--indigo)', padding: '4px 12px', borderRadius: '20px' }}>{tag}</div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { setApplying(true); setTimeout(() => { setApplying(false); setApplied(true); }, 2000); }}
            disabled={applied}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              background: applied ? 'var(--bg-secondary)' : 'var(--indigo)',
              color: applied ? 'var(--emerald)' : 'white',
              border: applied ? '1px solid var(--emerald)' : 'none',
              fontSize: '14px', fontWeight: '700', cursor: applied ? 'default' : 'pointer',
              boxShadow: applied ? 'none' : '0 4px 12px rgba(26,115,232,0.3)',
              transition: 'all 0.3s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
            {applying ? <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} /> Generating AI Resume...</> :
              applied ? <><CheckCircle size={16} /> Applied with AI Resume!</> :
              <><Zap size={16} /> AI Quick Apply</>}
          </button>
          <button style={{ padding: '14px 16px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--indigo)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}>
            <Bot size={16} /> Roadmap
          </button>
          <button style={{ padding: '14px 16px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--indigo)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [hasSelectedInterest, setHasSelectedInterest] = useState(false);
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

  const handleInterestSelect = (type: string) => {
    setActiveType(type);
    setHasSelectedInterest(true);
  };

  if (!hasSelectedInterest) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingTop: '60px' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '16px', 
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', color: 'var(--indigo)'
        }}>
          <Sparkles size={32} />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '16px', color: 'var(--text-primary)' }}>
          What are you looking for today?
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '48px' }}>
          Select an interest to let our AI personalize your feed with the most relevant opportunities.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {[
            { id: 'internship', label: 'Internships', icon: GraduationCap, color: 'var(--indigo)', desc: 'Start your career with hands-on experience.' },
            { id: 'job', label: 'Full-time Jobs', icon: Briefcase, color: 'var(--violet)', desc: 'Explore roles at startups and top companies.' },
            { id: 'hackathon', label: 'Hackathons', icon: Trophy, color: 'var(--cyan)', desc: 'Compete, build, and showcase your skills.' },
            { id: 'grant', label: 'Grants & Research', icon: BookOpen, color: 'var(--emerald)', desc: 'Funding and research fellowships.' },
          ].map(interest => (
            <div
              key={interest.id}
              onClick={() => handleInterestSelect(interest.id)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = interest.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 24px rgba(0,0,0,0.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.02)`;
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-secondary)', color: interest.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <interest.icon size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>{interest.label}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{interest.desc}</p>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => handleInterestSelect('all')}
          style={{ marginTop: '40px', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Skip, show me everything
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px', color: 'var(--text-primary)' }}>Explore Opportunities</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>AI-curated across jobs, hackathons, grants, and government exams — updated live</p>
        </div>
        <button 
          onClick={() => setHasSelectedInterest(false)}
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          Change Interest
        </button>
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            className="input"
            placeholder="Search by role, company, or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '42px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', outline: 'none' }}
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
              borderColor: activeType === type ? (typeColors[type] || 'var(--indigo)') : 'var(--border)',
              background: activeType === type ? 'var(--bg-card)' : 'transparent',
              color: activeType === type ? (typeColors[type] || 'var(--indigo)') : 'var(--text-secondary)',
              transition: 'all 0.2s',
              boxShadow: activeType === type ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
            }}
          >{typeLabels[type]}</button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--emerald)' }} />
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
              background: 'var(--bg-card)', border: `1px solid var(--border)`,
              borderLeft: `3px solid ${typeColors[opp.type] || 'var(--indigo)'}`,
              borderRadius: '16px', padding: '20px',
              cursor: 'pointer', transition: 'all 0.25s ease',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-bright)';
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 30px rgba(0,0,0,0.05)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLDivElement).style.transform = 'none';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            {/* Top Row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: typeColors[opp.type] || 'var(--indigo)' }}>
                  {opp.logo}
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: typeColors[opp.type] || 'var(--indigo)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{opp.type}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{opp.source}</div>
                </div>
              </div>
              <div style={{
                fontSize: '14px', fontWeight: '800',
                color: opp.matchScore >= 90 ? 'var(--emerald)' : opp.matchScore >= 75 ? 'var(--amber)' : 'var(--rose)',
                background: 'var(--bg-secondary)',
                padding: '4px 10px', borderRadius: '20px',
                border: `1px solid var(--border)`,
              }}>
                {opp.matchScore}% match
              </div>
            </div>

            {/* Title & Company */}
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px', fontFamily: 'Space Grotesk', color: 'var(--text-primary)' }}>{opp.title}</h3>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {opp.company} {opp.verified && <span style={{ color: 'var(--emerald)', fontSize: '11px' }}>✓ Verified</span>}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
              {opp.tags.slice(0, 3).map(tag => (
                <span key={tag} style={{ fontSize: '11px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '20px' }}>{tag}</span>
              ))}
              {opp.tags.length > 3 && <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>+{opp.tags.length - 3}</span>}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={11} color={typeColors[opp.type] || 'var(--indigo)'} /> {opp.stipend}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: opp.daysLeft <= 10 ? 'var(--rose)' : 'var(--text-secondary)' }}>
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
