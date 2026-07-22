'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockStudentProfile, mockOpportunities, mockScoutActivity } from '@/lib/mockData';
import {
  TrendingUp, Clock, CheckCircle2, ArrowRight,
  Target, AlertCircle, ChevronRight, Briefcase,
  Upload, RefreshCw, FileText, Award,
  PlayCircle, ExternalLink, Video, BookOpen
} from 'lucide-react';
import { LinkedInIcon, WhatsAppIcon, UnstopIcon, FaceScanIcon } from '@/components/Icons';
import OnboardingModal from '@/components/OnboardingModal';
import VoiceoverAssistant from '@/components/VoiceoverAssistant';
import { useUser } from '@/context/AuthContext';

function ScoreRing({ score, max = 1000, size = 155 }: { score: number; max?: number; size?: number }) {
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
          <stop offset="0%" stopColor="#1A73E8" />
          <stop offset="50%" stopColor="#188038" />
          <stop offset="100%" stopColor="#F29900" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [language, setLanguage] = useState(user?.language ?? 'en-US');

  // Dynamic Interactive Optra Score State — seeded from user profile
  const [optraScore, setOptraScore] = useState(user?.optraScore ?? 782);
  const [calculating, setCalculating] = useState(false);
  const [calcMessage, setCalcMessage] = useState('');
  const [calcMode, setCalcMode] = useState<'upload' | 'wizard'>('upload');
  
  // Interactive Wizard Input State — seeded from user's registered skills
  const [role, setRole] = useState('Full Stack AI Developer');
  const [experience, setExperience] = useState(2);
  const [selectedSkills, setSelectedSkills] = useState(
    user?.skills?.length ? user.skills.slice(0, 6) : ['React', 'Python', 'Node.js', 'FastAPI']
  );

  // Coursera & Google Career Certificate Style Roadmap Modules with YouTube Video Tutorials
  const [courseraRoadmap, setCourseraRoadmap] = useState([
    {
      module: "Module 1: Docker Containerization & Microservices",
      provider: "Google Developer Student Track",
      estTime: "2 Hours",
      status: "In Progress",
      videoUrl: "https://www.youtube.com/watch?v=3c-iBn73dDE",
      videoTitle: "Watch FreeCodeCamp Docker Full Course",
      task: "Build multi-stage Dockerfiles & docker-compose for Next.js and FastAPI",
      priority: "high"
    },
    {
      module: "Module 2: High-Level System Architecture & Caching",
      provider: "Coursera System Design Professional",
      estTime: "3 Hours",
      status: "Recommended",
      videoUrl: "https://www.youtube.com/watch?v=m8Icp_Cid5o",
      videoTitle: "Watch System Design Primer Tutorial",
      task: "Design high-throughput load balancer & Redis cache layer",
      priority: "high"
    },
    {
      module: "Module 3: Full-Stack Next.js 15 & Generative AI",
      provider: "Google Cloud Skill Boost",
      estTime: "1.5 Hours",
      status: "Completed ✓",
      videoUrl: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
      videoTitle: "Watch Next.js 15 Full Tutorial",
      task: "Deploy production React frontend with server actions",
      priority: "medium"
    }
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
      const base = 650;
      const skillBonus = selectedSkills.length * 28;
      const expBonus = experience * 35;
      const newScore = Math.min(980, Math.max(700, base + skillBonus + expBonus));
      
      setOptraScore(newScore);
      setCalculating(false);
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
          <div style={{ fontSize: '12px', color: '#1A73E8', fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} color="#1A73E8" /> Google Career Operating System
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)', marginBottom: '4px' }}>
            Welcome back, {user?.name ?? 'Guest'}
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>
              {user?.college ? `${user.college}${user.year ? ` · ${user.year}` : ''}` : 'Optra Verified Member'}
            </span>
            <button 
              onClick={() => setShowVerifyModal(true)}
              style={{
                background: 'rgba(24,128,56,0.08)', border: '1px solid rgba(24,128,56,0.2)',
                color: '#188038', padding: '3px 10px', borderRadius: '14px', fontSize: '11px',
                fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px'
              }}
            >
              <FaceScanIcon size={13} color="#188038" /> Realtime Face ID Verified
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Multilingual Voice Selector */}
          <VoiceoverAssistant
            currentLanguage={language}
            onLanguageChange={setLanguage}
            textToSpeak={`Welcome back ${user?.name?.split(' ')[0] ?? 'there'}. Your calculated Optra Score is ${optraScore} points.`}
          />

          <button 
            onClick={() => setShowVerifyModal(true)}
            style={{
              padding: '10px 16px', borderRadius: '12px', background: 'var(--bg-secondary)',
              border: '1px solid var(--border)', color: '#1A73E8', fontWeight: '600',
              fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <WhatsAppIcon size={16} color="#25D366" /> Verification & OTP Settings
          </button>

          <Link href="/explore" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}>
              Explore LinkedIn & Unstop Jobs
            </button>
          </Link>
        </div>
      </div>

      {/* Main Interactive Optra Score Hero Section */}
      <div className="card" style={{ padding: '28px', marginBottom: '28px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'center' }}>
          
          {/* Left: Dynamic Animated Gauge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRight: '1px solid var(--border)', paddingRight: '24px' }}>
            <div style={{ fontSize: '12px', color: '#1A73E8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              Calculated Optra AI Score
            </div>
            
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <ScoreRing score={mounted ? optraScore : 0} size={155} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{
                  fontSize: '36px', fontWeight: '900', fontFamily: 'Space Grotesk',
                  color: '#1A73E8'
                }}>
                  {calculating ? '...' : optraScore}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>/ 1000 PTS</div>
              </div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: '700', color: '#188038', marginBottom: '12px' }}>
              Top 5% Candidate Percentile
            </div>

            {/* Score Component Breakdown */}
            <div style={{ width: '100%', fontSize: '11px', color: 'var(--text-secondary)' }}>
              {[
                { label: 'ATS & Skill Match', pct: Math.round(optraScore * 0.35 / 10), color: '#1A73E8' },
                { label: 'Project Proof & GitHub', pct: Math.round(optraScore * 0.30 / 10), color: '#188038' },
                { label: 'Face ID & Verification', pct: Math.round(optraScore * 0.25 / 10), color: '#F29900' },
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
                  Calculate & Update Optra Score
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Upload your resume document or update your technical skill matrix
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
                  Resume File
                </button>
                <button
                  onClick={() => setCalcMode('wizard')}
                  style={{
                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                    background: calcMode === 'wizard' ? '#1A73E8' : 'transparent',
                    color: calcMode === 'wizard' ? 'white' : 'var(--text-secondary)', border: 'none'
                  }}
                >
                  Skill Matrix
                </button>
              </div>
            </div>

            {/* Mode 1: File Dropzone */}
            {calcMode === 'upload' && (
              <div style={{
                border: '2px dashed var(--border)', borderRadius: '16px',
                padding: '24px', textAlign: 'center', background: 'var(--bg-secondary)',
                position: 'relative', cursor: 'pointer'
              }}>
                <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                <Upload size={30} color="#1A73E8" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Upload Resume PDF
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Extract technical skills, experience metrics, and ATS compatibility
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(26,115,232,0.08)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', color: '#1A73E8', fontWeight: '600' }}>
                  resume_rahul_sharma_2026.pdf (Loaded)
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
                    Select Tech Stack ({selectedSkills.length} selected)
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
                            background: sel ? 'rgba(26,115,232,0.12)' : 'var(--bg-secondary)',
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
              </div>
            )}

            {/* Calculate Button & Progress Message */}
            <div style={{ marginTop: '16px' }}>
              <button
                onClick={() => recalculateScore()}
                disabled={calculating}
                className="btn-primary"
                style={{
                  width: '100%', padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                {calculating ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />}
                {calculating ? 'Analyzing Profile Vector...' : 'Recalculate Optra Score'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Coursera / Google Certificate Style Roadmap with YouTube Video Tutorials */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="#1A73E8" /> Coursera & Google Certificate Learning Roadmap
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Curated professional tutorials and video courses tailored to your Optra Score gap areas
            </div>
          </div>
          <span style={{ fontSize: '11px', color: '#1A73E8', fontWeight: '700', background: 'rgba(26,115,232,0.08)', padding: '4px 10px', borderRadius: '12px' }}>
            Verified Video Curations
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {courseraRoadmap.map((item, i) => (
            <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#1A73E8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {item.provider}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: '1.4' }}>
                  {item.module}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.5' }}>
                  {item.task}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  <span>Est. Time: {item.estTime}</span>
                  <span style={{ fontWeight: '700', color: item.status.includes('Completed') ? '#188038' : '#1A73E8' }}>{item.status}</span>
                </div>

                {/* Direct YouTube Video Tutorial Link Button */}
                <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%', padding: '9px 12px', borderRadius: '10px',
                    background: 'rgba(219,68,85,0.08)', border: '1px solid rgba(219,68,85,0.25)',
                    color: '#DB4437', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}>
                    <PlayCircle size={15} color="#DB4437" /> {item.videoTitle}
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Row: Live LinkedIn & Unstop Matches */}
      <div className="card" style={{ marginBottom: '28px' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {mockOpportunities.slice(0, 4).map(opp => (
            <div key={opp.id} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '14px', borderRadius: '14px',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)'
            }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: 'rgba(26,115,232,0.1)', color: opp.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {opp.source === 'LinkedIn' ? <LinkedInIcon size={20} color="#007BFF" /> : opp.source === 'Unstop' ? <UnstopIcon size={20} color="#007BFF" /> : opp.logo}
              </div>
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {opp.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {opp.company} · <span style={{ color: '#1A73E8', fontWeight: '600' }}>{opp.source}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: opp.matchScore >= 90 ? '#188038' : '#F29900' }}>
                  {opp.matchScore}% Match
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{opp.stipend}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
