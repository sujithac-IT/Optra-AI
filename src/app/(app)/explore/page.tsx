'use client';
import { useState } from 'react';
import { mockOpportunities } from '@/lib/mockData';
import {
  Search, Filter, MapPin, Clock, Users, ExternalLink,
  Zap, CheckCircle, X, ChevronDown, Briefcase, Trophy,
  BookOpen, GraduationCap, Star, QrCode, Bot, Sparkles, Building2
} from 'lucide-react';
import { LinkedInIcon, UnstopIcon } from '@/components/Icons';

const sources = ['all', 'LinkedIn', 'Unstop', 'Verified Optra Direct'];
const types = ['all', 'job', 'internship', 'hackathon', 'grant'];

const sourceLabels: Record<string, string> = {
  all: 'All Sources',
  LinkedIn: 'LinkedIn Jobs API',
  Unstop: 'Unstop Competitions',
  'Verified Optra Direct': 'Verified Optra Direct',
};

function OpportunityModal({ opp, onClose }: { opp: typeof mockOpportunities[0]; onClose: () => void }) {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-card)', border: `1px solid var(--border)`,
        borderRadius: '24px', padding: '36px', maxWidth: '640px', width: '100%',
        boxShadow: `0 20px 50px rgba(0,0,0,0.2)`,
        position: 'relative', animation: 'scaleUp 0.25s ease'
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '50%', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px', display: 'flex' }}>
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: opp.source === 'LinkedIn' ? 'rgba(0,123,255,0.12)' : opp.source === 'Unstop' ? 'rgba(0,123,255,0.12)' : 'rgba(26,115,232,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '800', color: opp.color, flexShrink: 0
          }}>
            {opp.source === 'LinkedIn' ? <LinkedInIcon size={28} color="#007BFF" /> : opp.source === 'Unstop' ? <UnstopIcon size={28} color="#007BFF" /> : opp.logo}
          </div>

          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '4px', color: 'var(--text-primary)' }}>
              {opp.title}
            </h2>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{opp.company}</span> · 
              <span style={{ fontWeight: '700', color: opp.source === 'LinkedIn' ? '#007BFF' : opp.source === 'Unstop' ? '#007BFF' : '#1A73E8' }}>
                {opp.source} API Active
              </span>
            </div>
          </div>
        </div>

        {/* Match Score Gauge */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>Calculated Profile Match</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: opp.matchScore >= 90 ? '#188038' : '#FBBC05' }}>{opp.matchScore}%</div>
          </div>
          <div className="progress-bar" style={{ height: '8px' }}>
            <div className="progress-fill" style={{ width: `${opp.matchScore}%`, background: opp.matchScore >= 90 ? '#188038' : '#FBBC05' }} />
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Calculated against your verified Optra Score (782) & GitHub projects
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Stipend / Prize', value: opp.stipend },
            { label: 'Location', value: opp.location },
            { label: 'Deadline', value: `${opp.daysLeft} days left` },
            { label: 'Total Applicants', value: opp.applicants.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
          {opp.description}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => { setApplying(true); setTimeout(() => { setApplying(false); setApplied(true); }, 1500); }}
            disabled={applied}
            className="btn-primary"
            style={{
              flex: 1, padding: '14px', fontSize: '14px', fontWeight: '700',
              background: applied ? '#188038' : '#1A73E8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            {applying ? 'Generating AI Resume & Submitting...' : applied ? '✓ Application Enrolled Successfully!' : '⚡ 1-Click Apply with Optra Score'}
          </button>

          {opp.url && (
            <a href={opp.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '14px 18px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: '#1A73E8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700' }}>
                <ExternalLink size={16} /> Open {opp.source}
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeSource, setActiveSource] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [selected, setSelected] = useState<typeof mockOpportunities[0] | null>(null);

  const filtered = mockOpportunities.filter(o => {
    const matchesSearch = o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.company.toLowerCase().includes(search.toLowerCase()) ||
      o.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesSource = activeSource === 'all' || o.source === activeSource;
    const matchesType = activeType === 'all' || o.type === activeType;
    return matchesSearch && matchesSource && matchesType;
  });

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)', marginBottom: '6px' }}>
          Explore Jobs, Internships & Competitions
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Realtime live feeds synchronized via <strong>LinkedIn Jobs API</strong> & <strong>Unstop Competitions API</strong>
        </p>
      </div>

      {/* Source Switcher Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {sources.map(src => (
          <button
            key={src}
            onClick={() => setActiveSource(src)}
            style={{
              padding: '10px 18px', borderRadius: '24px', fontSize: '13px', fontWeight: '700',
              cursor: 'pointer', border: '1px solid',
              borderColor: activeSource === src ? '#1A73E8' : 'var(--border)',
              background: activeSource === src ? 'rgba(26,115,232,0.12)' : 'var(--bg-card)',
              color: activeSource === src ? '#1A73E8' : 'var(--text-secondary)',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            {src === 'LinkedIn' && <LinkedInIcon size={16} color="#007BFF" />}
            {src === 'Unstop' && <UnstopIcon size={16} color="#007BFF" />}
            {sourceLabels[src]}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            className="input"
            placeholder="Search active roles by keyword, skill (React, Python, Fast API), or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '46px', fontSize: '14px', borderRadius: '14px' }}
          />
        </div>
      </div>

      {/* Opportunities Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {filtered.map(opp => (
          <div
            key={opp.id}
            onClick={() => setSelected(opp)}
            className="card"
            style={{
              cursor: 'pointer', transition: 'all 0.25s ease', position: 'relative',
              borderLeft: `4px solid ${opp.source === 'LinkedIn' ? '#007BFF' : opp.source === 'Unstop' ? '#007BFF' : '#1A73E8'}`
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLDivElement).style.borderColor = '#1A73E8';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'none';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: 'var(--bg-secondary)', color: opp.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', fontWeight: '800'
                }}>
                  {opp.source === 'LinkedIn' ? <LinkedInIcon size={22} color="#007BFF" /> : opp.source === 'Unstop' ? <UnstopIcon size={22} color="#007BFF" /> : opp.logo}
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: opp.source === 'LinkedIn' ? '#007BFF' : opp.source === 'Unstop' ? '#007BFF' : '#1A73E8', textTransform: 'uppercase' }}>
                    {opp.source} API
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{opp.company}</div>
                </div>
              </div>

              <div style={{
                fontSize: '13px', fontWeight: '800', color: opp.matchScore >= 90 ? '#188038' : '#FBBC05',
                background: 'rgba(24,128,56,0.1)', padding: '4px 10px', borderRadius: '16px'
              }}>
                {opp.matchScore}% Match
              </div>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '8px', color: 'var(--text-primary)' }}>
              {opp.title}
            </h3>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {opp.description}
            </p>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {opp.tags.map(t => (
                <span key={t} style={{ fontSize: '11px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '12px' }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '12px', fontSize: '12px' }}>
              <div style={{ fontWeight: '700', color: '#1A73E8' }}>{opp.stipend}</div>
              <div style={{ color: 'var(--text-muted)' }}>⏳ {opp.daysLeft} days left</div>
            </div>
          </div>
        ))}
      </div>

      {selected && <OpportunityModal opp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
