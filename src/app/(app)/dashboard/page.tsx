'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockStudentProfile, mockOpportunities, mockScoutActivity } from '@/lib/mockData';
import {
  TrendingUp, Clock, CheckCircle, Zap, ArrowRight,
  Target, Star, AlertCircle, ChevronRight, Briefcase,
  Upload, Sparkles, RefreshCw, FileText, Award, Layers
} from 'lucide-react';
import { LinkedInIcon } from '@/components/Icons';
import { WhatsAppIcon, UnstopIcon, FaceScanIcon } from '@/components/Icons';
import OnboardingModal from '@/components/OnboardingModal';

function ScoreRing({ score, max = 1000, size = 150 }: { score: number; max?: number; size?: number }) {
  const r = (size - 20) / 2;
  const circ = 2 * Math.PI * r;
  const pct = score / max;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(26,115,232,0.12)" strokeWidth="10" />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke="url(#googleGrad)" strokeWidth="10"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
      />
      <defs>
        <linearGradient id="googleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="50%" stopColor="#34A853" />
          <stop offset="100%" stopColor="#EA4335" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  // Dynamic Interactive Optra Score State
  const [optraScore, setOptraScore] = useState(782);
  const [calculating, setCalculating] = useState(false);
  const [calcMessage, setCalcMessage] = useState('');
  const [calcMode, setCalcMode] = useState<'upload' | 'wizard'>('upload');
  
  // Interactive Wizard Input State
  const [role, setRole] = useState('Full Stack AI Developer');
  const [experience, setExperience] = useState(2);
  const [selectedSkills, setSelectedSkills] = useState(['React', 'Python', 'Node.js', 'FastAPI']);
  const [githubUrl, setGithubUrl] = useState('github.com/rahulsharma');

  // Computed Roadmap & Recommendations based on Optra Score
  const [dynamicRoadmap, setDynamicRoadmap] = useState([
    { task: "Master Docker containerization for full-stack apps", done: false, priority: "high" },
    { task: "Solve system design HLD for scalable APIs", done: false, priority: "high" },
    { task: "Add unit tests to GitHub projects (PyTest/Jest)", done: false, priority: "medium" },
    { task: "Apply to Top 3 LinkedIn remote AI internships", done: true, priority: "high" },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const availableSkills = ['React', 'Python', 'Node.js', 'TypeScript', 'FastAPI', 'Docker', 'Kubernetes', 'LLMs', 'System Design', 'SQL'];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    recalculateScore(`Parsing resume: ${file.name}...`);
  };

  const recalculateScore = (customMsg?: string) => {
    setCalculating(true);
    setCalcMessage(customMsg || 'Extracting skills, ATS compliance & project vectors...');

    setTimeout(() => setCalcMessage('Parsing GitHub repository commit velocity...'), 800);
    setTimeout(() => setCalcMessage('Evaluating against live LinkedIn & Unstop job requirements...'), 1600);

    setTimeout(() => {
      // Dynamic computation logic based on selected skills + experience
      const base = 650;
      const skillBonus = selectedSkills.length * 28;
      const expBonus = experience * 35;
      const newScore = Math.min(980, Math.max(700, base + skillBonus + expBonus));
      
      setOptraScore(newScore);
      setCalculating(false);

      // Update roadmap based on calculated score
      if (newScore > 850) {
        setDynamicRoadmap([
          { task: "Prepare for System Design interviews at Tier-1 companies", done: false, priority: "high" },
          { task: "Contribute to major open-source repositories", done: false, priority: "high" },
          { task: "Apply to High-Equity Startup roles on LinkedIn", done: true, priority: "high" },
        ]);
      } else {
        setDynamicRoadmap([
          { task: "Build & Deploy full-stack project with FastAPI & React", done: true, priority: "high" },
          { task: "Add Docker containerization to your microservices", done: false, priority: "high" },
          { task: "Enroll in Flipkart GRiD 7.0 on Unstop", done: false, priority: "medium" },
        ]);
      }
    }, 2400);
  };

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Onboarding & Face ID Modal */}
      <OnboardingModal 
        isOpen={showVerifyModal} 
        onClose={() => setShowVerifyModal(false)}
        onVerified={() => setOptraScore(prev => Math.min(990, prev + 50))}
      />

      {/* Top Welcome Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '13px', color: '#1A73E8', fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#1A73E8" /> Google AI Powered Career Dashboard
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)', marginBottom: '4px' }}>
            Welcome back, Rahul! 👋
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>VIT Vellore · CSE · 3rd Year</span>
            <button 
              onClick={() => setShowVerifyModal(true)}
              style={{
                background: 'rgba(24,128,56,0.12)', border: '1px solid rgba(24,128,56,0.3)',
                color: '#188038', padding: '3px 10px', borderRadius: '14px', fontSize: '11px',
                fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px'
              }}
            >
              <FaceScanIcon size={13} color="#188038" /> Realtime Face ID Verified
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setShowVerifyModal(true)}
            style={{
              padding: '10px 16px', borderRadius: '12px', background: 'rgba(26,115,232,0.1)',
              border: '1px solid rgba(26,115,232,0.3)', color: '#1A73E8', fontWeight: '600',
              fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <WhatsAppIcon size={16} color="#25D366" /> Test WhatsApp & Face Verification
          </button>

          <Link href="/explore" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}>
              <Zap size={16} /> Explore LinkedIn & Unstop Jobs
            </button>
          </Link>
        </div>
      </div>

      {/* Main Interactive Optra Score Hero Section */}
      <div className="card" style={{ padding: '28px', marginBottom: '28px', border: '1px solid rgba(26,115,232,0.25)', background: 'linear-gradient(135deg, rgba(26,115,232,0.03), rgba(54,168,83,0.03))' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'center' }}>
          
          {/* Left: Dynamic Animated Gauge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRight: '1px solid var(--border)', paddingRight: '24px' }}>
            <div style={{ fontSize: '12px', color: '#1A73E8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              Dynamic Optra AI Score
            </div>
            
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <ScoreRing score={mounted ? optraScore : 0} size={155} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{
                  fontSize: '36px', fontWeight: '900', fontFamily: 'Space Grotesk',
                  background: 'linear-gradient(135deg, #1A73E8, #34A853)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>
                  {calculating ? '...' : optraScore}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>/ 1000 PTS</div>
              </div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: '700', color: '#188038', marginBottom: '12px' }}>
              🏆 Top 5% Applicant Pool
            </div>

            {/* Score Component Breakdown */}
            <div style={{ width: '100%', fontSize: '11px', color: 'var(--text-secondary)' }}>
              {[
                { label: 'ATS & Skill Match', pct: Math.round(optraScore * 0.35 / 10), color: '#1A73E8' },
                { label: 'Project Proof & GitHub', pct: Math.round(optraScore * 0.30 / 10), color: '#34A853' },
                { label: 'Face ID & Verification', pct: Math.round(optraScore * 0.25 / 10), color: '#FBBC05' },
              ].map(({ label, pct, color }) => (
                <div key={label} style={{ marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span>{label}</span><span style={{ fontWeight: '700', color }}>{pct}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: '5px' }}>
                    <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Resume & Skill Questionnaire Controls */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '4px' }}>
                  Calculate & Update Your Optra Score
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Upload your resume or adjust your skill matrix to compute your real-time score & roadmap
                </p>
              </div>

              {/* Mode Switcher Buttons */}
              <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <button
                  onClick={() => setCalcMode('upload')}
                  style={{
                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                    background: calcMode === 'upload' ? '#1A73E8' : 'transparent',
                    color: calcMode === 'upload' ? 'white' : 'var(--text-secondary)', border: 'none'
                  }}
                >
                  📄 Resume File
                </button>
                <button
                  onClick={() => setCalcMode('wizard')}
                  style={{
                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                    background: calcMode === 'wizard' ? '#1A73E8' : 'transparent',
                    color: calcMode === 'wizard' ? 'white' : 'var(--text-secondary)', border: 'none'
                  }}
                >
                  ⚡ Skill Questionnaire
                </button>
              </div>
            </div>

            {/* Mode 1: File Dropzone */}
            {calcMode === 'upload' && (
              <div style={{
                border: '2px dashed rgba(26,115,232,0.3)', borderRadius: '16px',
                padding: '24px', textAlign: 'center', background: 'rgba(26,115,232,0.02)',
                position: 'relative', cursor: 'pointer'
              }}>
                <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                <Upload size={32} color="#1A73E8" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Drop your resume PDF here or click to browse
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Parses technical skills, experience metrics, and ATS compatibility instantly
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(26,115,232,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', color: '#1A73E8', fontWeight: '600' }}>
                  ✓ resume_rahul_sharma_2026.pdf (Loaded)
                </div>
              </div>
            )}

            {/* Mode 2: Interactive Skill Matrix Questionnaire */}
            {calcMode === 'wizard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Primary Target Role</label>
                  <input className="input" value={role} onChange={e => setRole(e.target.value)} style={{ padding: '8px 12px', fontSize: '13px' }} />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                    Select Your Tech Stack ({selectedSkills.length} selected)
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {availableSkills.map(sk => {
                      const sel = selectedSkills.includes(sk);
                      return (
                        <button
                          key={sk}
                          onClick={() => toggleSkill(sk)}
                          style={{
                            padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '600', cursor: 'pointer',
                            background: sel ? 'rgba(26,115,232,0.15)' : 'var(--bg-secondary)',
                            border: `1px solid ${sel ? '#1A73E8' : 'var(--border)'}`,
                            color: sel ? '#1A73E8' : 'var(--text-secondary)'
                          }}
                        >
                          {sel ? '✓ ' : '+ '}{sk}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>Experience / Project Count</span>
                    <span style={{ color: '#1A73E8' }}>{experience} Years / 5 Projects</span>
                  </div>
                  <input type="range" min={0} max={5} value={experience} onChange={e => setExperience(Number(e.target.value))} style={{ width: '100%', accentColor: '#1A73E8' }} />
                </div>
              </div>
            )}

            {/* Calculate Button & Progress Message */}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <button
                onClick={() => recalculateScore()}
                disabled={calculating}
                className="btn-primary"
                style={{
                  flex: 1, padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                {calculating ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />}
                {calculating ? 'Analyzing Profile Data...' : 'Recalculate Optra Score & Roadmap'}
              </button>
            </div>

            {calculating && (
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#1A73E8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1A73E8', animation: 'pulseGlow 1s infinite' }} />
                {calcMessage}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Middle Row: Personalized Roadmap & Live Job Matches */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        
        {/* Dynamic AI Roadmap Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)' }}>
                Personalized Career Roadmap
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Generated from your calculated Optra Score</div>
            </div>
            <Link href="/copilot" style={{ textDecoration: 'none', fontSize: '12px', color: '#1A73E8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Open Copilot <ChevronRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dynamicRoadmap.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <div style={{ flexShrink: 0, marginTop: '2px' }}>
                  {item.done
                    ? <CheckCircle size={18} color="#188038" />
                    : <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${item.priority === 'high' ? '#EA4335' : '#1A73E8'}` }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: item.done ? '500' : '600', textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                    {item.task}
                  </div>
                  <div style={{ fontSize: '11px', color: item.priority === 'high' ? '#EA4335' : '#1A73E8', marginTop: '2px', fontWeight: '700' }}>
                    {item.priority === 'high' ? '🔥 High Priority' : '⚡ Recommended'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live LinkedIn & Unstop Matches */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)' }}>
                Top Matched Jobs & Competitions
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Realtime LinkedIn & Unstop APIs</div>
            </div>
            <Link href="/explore" style={{ textDecoration: 'none', fontSize: '12px', color: '#1A73E8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockOpportunities.slice(0, 4).map(opp => (
              <div key={opp.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px', borderRadius: '12px',
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                transition: 'all 0.2s', cursor: 'pointer'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: opp.source === 'LinkedIn' ? 'rgba(0,123,255,0.12)' : opp.source === 'Unstop' ? 'rgba(0,123,255,0.12)' : 'rgba(26,115,232,0.12)',
                  color: opp.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '15px', fontWeight: '800', flexShrink: 0
                }}>
                  {opp.source === 'LinkedIn' ? <LinkedInIcon size={20} color="#007BFF" /> : opp.source === 'Unstop' ? <UnstopIcon size={20} color="#007BFF" /> : opp.logo}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {opp.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{opp.company}</span> · 
                    <span style={{ fontWeight: '600', color: opp.source === 'LinkedIn' ? '#007BFF' : opp.source === 'Unstop' ? '#007BFF' : '#1A73E8' }}>
                      {opp.source}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: opp.matchScore >= 90 ? '#188038' : '#FBBC05' }}>
                    {opp.matchScore}% Match
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{opp.stipend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scout Live Activity Feed */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'Space Grotesk', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="#1A73E8" /> Realtime API & Verification Activity Log
          </div>
          <span style={{ fontSize: '11px', color: '#188038', fontWeight: '700', background: 'rgba(24,128,56,0.1)', padding: '2px 8px', borderRadius: '10px' }}>
            Live Stream Connected
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {mockScoutActivity.slice(0, 3).map((act, i) => (
            <div key={i} style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#1A73E8', textTransform: 'uppercase', marginBottom: '4px' }}>
                {act.source} · {act.time}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                {act.event}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
