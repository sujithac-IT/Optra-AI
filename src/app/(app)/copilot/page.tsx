'use client';
import { useState } from 'react';
import { mockStudentProfile, mockOpportunities } from '@/lib/mockData';
import {
  Upload, Zap, CheckCircle, ChevronRight, ArrowRight,
  Target, Code, BookOpen, Star, AlertTriangle, Bot, FileText,
  Download, Sparkles, TrendingUp, Clock
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

const RadarChart = ({ skills }: { skills: typeof mockStudentProfile.skills }) => {
  const cx = 160, cy = 160, r = 120;
  const n = skills.length;
  const points = skills.map((s, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const pct = s.level / 100;
    return {
      x: cx + r * pct * Math.cos(angle),
      y: cy + r * pct * Math.sin(angle),
      lx: cx + (r + 28) * Math.cos(angle),
      ly: cy + (r + 28) * Math.sin(angle),
      ax: cx + r * Math.cos(angle),
      ay: cy + r * Math.sin(angle),
    };
  });
  const polygon = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg width="320" height="320" style={{ overflow: 'visible' }}>
      {/* Background rings */}
      {[0.25, 0.5, 0.75, 1].map(f => (
        <polygon key={f} points={skills.map((_, i) => {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          return `${cx + r * f * Math.cos(angle)},${cy + r * f * Math.sin(angle)}`;
        }).join(' ')}
          fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="1" />
      ))}
      {/* Axis lines */}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.ax} y2={p.ay} stroke="rgba(99,102,241,0.15)" strokeWidth="1" />
      ))}
      {/* Data polygon */}
      <polygon points={polygon} fill="rgba(99,102,241,0.15)" stroke="#6366F1" strokeWidth="2" />
      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6366F1" stroke="#818CF8" strokeWidth="1.5" />
      ))}
      {/* Labels */}
      {points.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle"
          fontSize="10" fill="#64748B" fontFamily="Inter">
          {skills[i].name}
        </text>
      ))}
    </svg>
  );
};

const steps = [
  { n: 1, title: 'Parse Profile', desc: 'Upload your resume PDF and GitHub URL', done: true },
  { n: 2, title: 'Skill Analysis', desc: 'AI builds your skill matrix & match score', done: true },
  { n: 3, title: 'Gap Analysis', desc: 'Compare against target opportunity', done: false },
  { n: 4, title: 'ATS Resume', desc: 'Generate tailored resume bullet points', done: false },
  { n: 5, title: '3-Day Roadmap', desc: 'Get actionable prep plan to qualify', done: false },
];

const atsResumeSample = `RAHUL SHARMA
React · Node.js · TypeScript · Python · PostgreSQL
📧 rahul@email.com | github.com/rahulsharma | linkedin.com/in/rahul

EXPERIENCE
──────────────────────────────────────────
Full-Stack Developer (Freelance) | Jan 2025 – Present
• Built and deployed 3 production React/Node.js applications serving 500+ users, achieving <200ms API response times through Redis caching and query optimization
• Integrated OpenAI GPT-4 API for AI-powered features, reducing manual workflow by 70%
• Containerized applications with Docker and set up CI/CD via GitHub Actions

PROJECTS
──────────────────────────────────────────
OptiChat — AI Customer Support Bot [React · FastAPI · LangChain]
• Engineered a multi-tenant SaaS product with role-based access control (RBAC)
• Reduced support ticket volume by 45% through intelligent FAQ automation
• Deployed on AWS EC2 with auto-scaling, handling 1,000+ concurrent sessions

EDUCATION
──────────────────────────────────────────
B.Tech Computer Science | VIT Vellore | 2022–2026
CGPA: 8.4/10 (DigiLocker Verified) | Relevant: DSA, OS, DBMS, Networks`;

export default function CopilotPage() {
  const [stage, setStage] = useState(0); // 0=input, 1=analyzing, 2=results
  const [githubUrl, setGithubUrl] = useState('github.com/rahulsharma');
  const [targetJob, setTargetJob] = useState(mockOpportunities[0]);
  const [showResume, setShowResume] = useState(false);
  const [roadmapActive, setRoadmapActive] = useState(false);
  const p = mockStudentProfile;

  const analyze = () => {
    setStage(1);
    setTimeout(() => setStage(2), 3000);
  };

  const gaps = [
    { skill: 'Docker / Containerization', current: 45, needed: 75, priority: 'high' },
    { skill: 'System Design (HLD)', current: 40, needed: 70, priority: 'high' },
    { skill: 'Machine Learning Basics', current: 55, needed: 65, priority: 'medium' },
  ];

  const roadmapDays = [
    {
      day: 'Day 1', focus: 'Docker Deep-Dive',
      tasks: ['Build a Dockerfile for your React app', 'Set up docker-compose for full-stack', 'Push image to Docker Hub'],
      resource: 'Docker Official Docs + TechWorld with Nana (YouTube)',
    },
    {
      day: 'Day 2', focus: 'System Design Practice',
      tasks: ['Design Twitter feed (HLD)', 'Draw URL shortener architecture', 'Watch Gaurav Sen — System Design Primer'],
      resource: 'system-design-primer GitHub repo',
    },
    {
      day: 'Day 3', focus: 'Portfolio Polish + Apply',
      tasks: ['Update GitHub README with Docker badge', 'Add system design doc to project', 'Generate AI-tailored resume & apply'],
      resource: 'Optra AI Resume Generator',
    },
  ];

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px' }}>
          AI Copilot <span style={{ fontSize: '16px', fontWeight: '500', color: '#6366F1', background: 'rgba(99,102,241,0.1)', padding: '4px 12px', borderRadius: '20px', marginLeft: '8px' }}>Engine 2</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>Parse your profile, analyze skill gaps, and generate a tailored application in minutes</p>
      </div>

      {/* Stage 0 — Input */}
      {stage === 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Left: Upload */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Resume Upload */}
            <div className="card">
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} color="#6366F1" /> Resume Upload
              </div>
              <div style={{
                border: '2px dashed rgba(99,102,241,0.3)', borderRadius: '12px',
                padding: '32px', textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.2s',
                background: 'rgba(99,102,241,0.03)',
              }}>
                <Upload size={28} color="#6366F1" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Drop your resume PDF</div>
                <div style={{ fontSize: '12px', color: '#475569' }}>or click to browse · PDF, DOCX</div>
                <div style={{ marginTop: '16px', padding: '8px 16px', background: 'rgba(99,102,241,0.1)', borderRadius: '8px', fontSize: '12px', color: '#818CF8', display: 'inline-block' }}>
                  ✓ resume_rahul_2026.pdf (loaded)
                </div>
              </div>
            </div>

            {/* GitHub Input */}
            <div className="card">
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GithubIcon size={16} color="#6366F1" /> GitHub Profile
              </div>
              <input className="input" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} placeholder="github.com/yourusername" />
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={12} color="#10B981" /> 50+ public repos · 234 stars · Active contributor
              </div>
            </div>

            {/* Target Job */}
            <div className="card">
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={16} color="#6366F1" /> Target Opportunity
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mockOpportunities.slice(0, 3).map(opp => (
                  <div key={opp.id}
                    onClick={() => setTargetJob(opp)}
                    style={{
                      padding: '12px', borderRadius: '10px', cursor: 'pointer',
                      background: targetJob.id === opp.id ? 'rgba(26,115,232,0.1)' : 'var(--bg-secondary)',
                      border: `1px solid ${targetJob.id === opp.id ? 'rgba(26,115,232,0.4)' : 'var(--border)'}`,
                      transition: 'all 0.2s',
                    }}>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{opp.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{opp.company} · {opp.matchScore}% match</div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={analyze} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '15px', padding: '16px' }}>
              <Sparkles size={18} /> Analyze & Generate Roadmap
            </button>
          </div>

          {/* Right: Profile Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <Code size={16} color="#06B6D4" /> Current Skill Matrix
              </div>
              <RadarChart skills={p.skills} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px' }}>
                {p.skills.slice(0, 4).map(s => (
                  <div key={s.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
                      <span>{s.name}</span><span style={{ color: '#6366F1' }}>{s.level}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 1 — Analyzing */}
      {stage === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '24px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(99,102,241,0.5)',
            animation: 'pulseGlow 1.5s ease-in-out infinite',
          }}>
            <Bot size={36} color="white" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '8px' }}>Analyzing your profile...</h2>
            <p style={{ fontSize: '14px', color: '#64748B' }}>Parsing resume · Reading GitHub · Comparing with job requirements</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '400px' }}>
            {['Parsing resume PDF...', 'Reading GitHub repos & commits...', 'Building skill vector embeddings...', 'Comparing with job requirements...', 'Identifying skill gaps...'].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#94A3B8', animation: `fadeIn 0.5s ease ${i * 0.5}s both` }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366F1', animation: 'pulseGlow 1s ease-in-out infinite', flexShrink: 0 }} />
                {step}
              </div>
            ))}
          </div>
          <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }`}</style>
        </div>
      )}

      {/* Stage 2 — Results */}
      {stage === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Status Bar */}
          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle size={20} color="#10B981" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#10B981' }}>Analysis Complete!</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Target: {targetJob.title} @ {targetJob.company} · Match: {targetJob.matchScore}%</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
              <button onClick={() => setStage(0)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Re-analyze</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Gap Analysis */}
            <div className="card">
              <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={16} color="#F59E0B" /> Skill Gap Analysis
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {gaps.map(g => (
                  <div key={g.skill}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600' }}>{g.skill}</span>
                      <span style={{ fontSize: '11px', color: g.priority === 'high' ? '#F43F5E' : '#F59E0B', fontWeight: '700', background: g.priority === 'high' ? 'rgba(244,63,94,0.1)' : 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '20px' }}>
                        {g.priority === 'high' ? '🔴 High' : '🟡 Medium'}
                      </span>
                    </div>
                    <div style={{ position: 'relative', height: '8px', background: 'rgba(99,102,241,0.1)', borderRadius: '4px' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${g.current}%`, background: '#6366F1', borderRadius: '4px', transition: 'width 1s ease' }} />
                      <div style={{ position: 'absolute', left: `${g.needed}%`, top: '-4px', width: '2px', height: '16px', background: '#F43F5E', borderRadius: '1px' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', marginTop: '4px' }}>
                      <span>You: {g.current}%</span><span style={{ color: '#F43F5E' }}>Need: {g.needed}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Breakdown */}
            <div className="card">
              <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={16} color="#10B981" /> Match Breakdown
              </div>
              {[
                { label: 'Technical Skills', score: 88, color: '#6366F1' },
                { label: 'Project Quality', score: 92, color: '#06B6D4' },
                { label: 'CGPA Threshold', score: 100, color: '#10B981' },
                { label: 'DevOps / Infra', score: 45, color: '#F43F5E' },
                { label: 'Communication', score: 75, color: '#F59E0B' },
              ].map(({ label, score, color }) => (
                <div key={label} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8', marginBottom: '5px' }}>
                    <span>{label}</span><span style={{ color }}>{score}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Day Roadmap */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#06B6D4" /> Your 3-Day Micro-Roadmap
              </div>
              <div style={{ fontSize: '12px', color: '#06B6D4', background: 'rgba(6,182,212,0.1)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(6,182,212,0.25)' }}>
                To qualify: {targetJob.title}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {roadmapDays.map((day, i) => (
                <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', borderTop: `3px solid ${['var(--indigo)','var(--cyan)','var(--emerald)'][i]}` }}>
                  <div style={{ fontSize: '11px', color: ['#6366F1','#06B6D4','#10B981'][i], fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{day.day}</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>{day.focus}</div>
                  {day.tasks.map((task, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '12px', color: '#94A3B8' }}>
                      <span style={{ flexShrink: 0, color: ['#6366F1','#06B6D4','#10B981'][i] }}>→</span>
                      {task}
                    </div>
                  ))}
                  <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '6px 10px', borderRadius: '6px' }}>
                    📚 {day.resource}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ATS Resume */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} color="#8B5CF6" /> AI-Tailored ATS Resume
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setShowResume(!showResume)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#C4B5FD', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                  {showResume ? 'Hide' : 'Preview'} Resume
                </button>
                <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #8B5CF6, #6366F1)', border: 'none', color: 'white', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Download size={13} /> Download PDF
                </button>
              </div>
            </div>
            {showResume && (
              <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.8', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border)', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                {atsResumeSample}
              </pre>
            )}
            {!showResume && (
              <div style={{ fontSize: '13px', color: '#475569', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <span>✓ Keywords matched: 14/16</span>
                <span>✓ ATS Score: 91%</span>
                <span>✓ Tailored for: {targetJob.title}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
