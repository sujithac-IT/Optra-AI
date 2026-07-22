'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Zap, ArrowRight, Search, Bot, ShieldCheck, Radar, QrCode,
  Star, TrendingUp, Users, Clock, Globe, ChevronRight, Play,
  CheckCircle
} from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from '@/components/Icons';

const ticker = [
  "🚀 New: Sarvam AI hiring Full-Stack Interns — ₹40,000/mo",
  "🏆 ETHIndia 2026 — $5,000 prize pool — 14 days left",
  "📚 Google Summer of Code — 29 days to deadline",
  "🏛️ ISRO Scientist SC — Apply before Aug 15",
  "💡 IIT Bombay ML Fellowship — ₹25,000/mo — open now",
  "⚡ 3 new remote React jobs found on Twitter/X",
  "🔬 GSoC 2026 — Rust Foundation org added",
];

const features = [
  {
    icon: <Radar size={24} />, color: '#6366F1',
    title: "Hyper-Scout Engine",
    desc: "24/7 AI crawler that indexes niche opportunities from Twitter, Devfolio, YC Jobs, ISRO, and university portals — before anyone else finds them.",
    stat: "500+ sources"
  },
  {
    icon: <Bot size={24} />, color: '#06B6D4',
    title: "Agentic Copilot",
    desc: "Reads your GitHub, resume, and CGPA to auto-generate ATS-tailored resumes and 3-day micro-roadmaps tied to live openings.",
    stat: "3-day roadmaps"
  },
  {
    icon: <ShieldCheck size={24} />, color: '#10B981',
    title: "DigiLocker Verification",
    desc: "OAuth-linked credential verification pulls your marksheets, APAAR ID, and degree directly from the National Academic Depository.",
    stat: "100% verified"
  },
  {
    icon: <QrCode size={24} />, color: '#F59E0B',
    title: "Smart QR Engine",
    desc: "Dynamic QR codes on your resume link recruiters to your live proof-of-work dashboard — projects, scores, and verified credentials.",
    stat: "Instant verify"
  },
  {
    icon: <Search size={24} />, color: '#8B5CF6',
    title: "Semantic Matching",
    desc: "Vector embeddings compare your skill profile to job requirements, calculating a true match % — not just keyword matching.",
    stat: "AI-powered"
  },
  {
    icon: <Zap size={24} />, color: '#F43F5E',
    title: "WhatsApp Alerts",
    desc: "Instant WhatsApp notifications the moment a new opportunity matches your profile, with a 1-click apply link.",
    stat: "< 2min alerts"
  },
];

const competitors = [
  { name: "LinkedIn", scout: false, copilot: false, verify: false, niche: false, roadmap: false },
  { name: "Unstop", scout: false, copilot: false, verify: false, niche: true, roadmap: false },
  { name: "Simplify/Chiaro", scout: false, copilot: true, verify: false, niche: false, roadmap: false },
  { name: "Roadmap.sh", scout: false, copilot: false, verify: false, niche: false, roadmap: true },
  { name: "Optra ✦", scout: true, copilot: true, verify: true, niche: true, roadmap: true, isUs: true },
];

const stats = [
  { value: "4M+", label: "Target Students", sub: "India STEM undergrads" },
  { value: "500+", label: "Data Sources", sub: "Crawled 24/7" },
  { value: "94%", label: "Avg Match Score", sub: "Beta users" },
  { value: "< 2min", label: "Alert Speed", sub: "New opportunity" },
];

export default function LandingPage() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex(i => (i + 1) % ticker.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => (c < 234 ? c + 3 : 234));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', color: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.15)',
        padding: '0 40px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontWeight: '800', color: 'white',
          }}>O</div>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: '700', fontSize: '18px' }}>Optra</span>
          <span style={{ fontSize: '10px', color: '#6366F1', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>BETA</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Features', 'How it Works', 'Pricing', 'Recruiters'].map(item => (
            <span key={item} style={{ fontSize: '14px', color: '#94A3B8', cursor: 'pointer', transition: 'color 0.2s' }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', borderRadius: '8px', background: 'transparent', border: '1px solid rgba(99,102,241,0.4)', color: '#818CF8', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              Sign In
            </button>
          </Link>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', border: 'none', boxShadow: '0 4px 15px rgba(99,102,241,0.4)' }}>
              Get Started Free
            </button>
          </Link>
        </div>
      </nav>

      {/* Ticker Bar */}
      <div style={{
        position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99,
        background: 'rgba(99,102,241,0.08)',
        borderBottom: '1px solid rgba(99,102,241,0.15)',
        padding: '8px 40px',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(99,102,241,0.2)', padding: '3px 10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'pulseGlow 1.5s infinite' }} />
          <span style={{ fontSize: '11px', color: '#818CF8', fontWeight: '600' }}>LIVE</span>
        </div>
        <div style={{ fontSize: '13px', color: '#94A3B8', overflow: 'hidden', flex: 1 }}>
          <div style={{ transition: 'opacity 0.5s', opacity: 1 }}>{ticker[tickerIndex]}</div>
        </div>
        <Link href="/explore" style={{ textDecoration: 'none', fontSize: '12px', color: '#6366F1', fontWeight: '600', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
          See all <ChevronRight size={12} />
        </Link>
      </div>

      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', textAlign: 'center',
        padding: '160px 40px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background dots */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
          padding: '8px 18px', borderRadius: '30px', marginBottom: '32px',
          position: 'relative', zIndex: 1,
        }}>
          <Zap size={14} color="#6366F1" />
          <span style={{ fontSize: '13px', color: '#818CF8', fontWeight: '600' }}>The Autonomous Career OS for Indian Tech Talent</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: '900',
          lineHeight: '1.05', marginBottom: '24px',
          fontFamily: 'Space Grotesk', position: 'relative', zIndex: 1,
          maxWidth: '900px',
        }}>
          Stop Scrolling.<br />
          <span style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Start Landing.
          </span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#94A3B8', maxWidth: '640px', lineHeight: '1.7', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
          Optra's dual-engine AI scouts <strong style={{ color: '#F8FAFC' }}>niche opportunities</strong> 24/7 — hackathons, research grants, government exams, and startup roles — then automatically <strong style={{ color: '#F8FAFC' }}>tailors your application</strong> and builds a <strong style={{ color: '#F8FAFC' }}>3-day roadmap</strong> to get you hired.
        </p>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', position: 'relative', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '16px 36px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              color: 'white', fontSize: '16px', fontWeight: '700',
              cursor: 'pointer', border: 'none',
              boxShadow: '0 8px 30px rgba(99,102,241,0.5)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              Launch Dashboard <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/copilot" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '16px 36px', borderRadius: '14px',
              background: 'rgba(99,102,241,0.08)',
              color: '#818CF8', fontSize: '16px', fontWeight: '700',
              cursor: 'pointer', border: '1px solid rgba(99,102,241,0.3)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <Play size={16} /> Try AI Copilot
            </button>
          </Link>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          {stats.map(({ value, label, sub }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{value}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#F8FAFC' }}>{label}</div>
              <div style={{ fontSize: '11px', color: '#475569' }}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dual Engine Visualization */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontSize: '12px', color: '#6366F1', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Architecture</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '800', fontFamily: 'Space Grotesk' }}>
            The Dual-Engine System
          </h2>
          <p style={{ fontSize: '16px', color: '#64748B', marginTop: '12px' }}>Two AI engines working together, end-to-end</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '32px', alignItems: 'center' }}>
          {/* Engine 1 */}
          <div style={{ background: 'rgba(18,18,30,0.8)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '20px', padding: '32px', boxShadow: '0 0 40px rgba(99,102,241,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Radar size={22} color="#6366F1" />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#6366F1', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Engine 1</div>
                <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>Hyper-Scout</div>
              </div>
            </div>
            {['Twitter/X Hiring Threads', 'Devfolio & Unstop', 'YC Jobs & Wellfound', 'ISRO / NIC / GATE Portals', 'University Lab Openings', 'GitHub Bounties'].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid rgba(99,102,241,0.08)', fontSize: '13px', color: '#94A3B8' }}>
                <CheckCircle size={12} color="#6366F1" /> {s}
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(99,102,241,0.5)',
              margin: '0 auto 8px',
            }}>
              <Zap size={24} color="white" />
            </div>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: '600' }}>LIVE<br/>SYNC</div>
          </div>

          {/* Engine 2 */}
          <div style={{ background: 'rgba(18,18,30,0.8)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '20px', padding: '32px', boxShadow: '0 0 40px rgba(6,182,212,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={22} color="#06B6D4" />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#06B6D4', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Engine 2</div>
                <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>Agentic Copilot</div>
              </div>
            </div>
            {['Resume & GitHub Parser', 'Skill Matrix Analysis', 'ATS Resume Generator', '3-Day Micro-Roadmap', 'WhatsApp Alert System', 'QR Proof-of-Work'].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid rgba(6,182,212,0.08)', fontSize: '13px', color: '#94A3B8' }}>
                <CheckCircle size={12} color="#06B6D4" /> {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontSize: '12px', color: '#06B6D4', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Platform Features</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '800', fontFamily: 'Space Grotesk' }}>
            Everything you need to <span style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>land faster</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {features.map(({ icon, color, title, desc, stat }) => (
            <div key={title} style={{
              background: 'rgba(18,18,30,0.8)', border: '1px solid rgba(99,102,241,0.12)',
              borderRadius: '20px', padding: '28px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${color}44`;
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${color}22`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.12)';
              (e.currentTarget as HTMLDivElement).style.transform = 'none';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                  {icon}
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color, background: `${color}18`, border: `1px solid ${color}33`, padding: '4px 10px', borderRadius: '20px' }}>
                  {stat}
                </div>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px', fontFamily: 'Space Grotesk' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Competitor Matrix */}
      <section style={{ padding: '80px 40px', background: 'rgba(15,15,26,0.8)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '12px', color: '#8B5CF6', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Competitive Advantage</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800', fontFamily: 'Space Grotesk' }}>Why Optra wins</h2>
          </div>
          <div style={{ background: 'rgba(18,18,30,0.9)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '160px repeat(5, 1fr)', background: 'rgba(99,102,241,0.08)', padding: '14px 24px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <span>Platform</span>
              {['Scout', 'Copilot', 'Verify', 'Niche', 'Roadmap'].map(h => <span key={h} style={{ textAlign: 'center' }}>{h}</span>)}
            </div>
            {competitors.map((c, i) => (
              <div key={c.name} style={{
                display: 'grid', gridTemplateColumns: '160px repeat(5, 1fr)',
                padding: '14px 24px', borderTop: '1px solid rgba(99,102,241,0.08)',
                background: c.isUs ? 'rgba(99,102,241,0.06)' : 'transparent',
              }}>
                <span style={{ fontSize: '14px', fontWeight: c.isUs ? '700' : '400', color: c.isUs ? '#818CF8' : '#94A3B8' }}>{c.name}</span>
                {[c.scout, c.copilot, c.verify, c.niche, c.roadmap].map((v, j) => (
                  <div key={j} style={{ textAlign: 'center' }}>
                    {v
                      ? <CheckCircle size={16} color={c.isUs ? '#10B981' : '#475569'} style={{ margin: '0 auto' }} />
                      : <span style={{ color: '#2D3748', fontSize: '18px' }}>—</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', fontFamily: 'Space Grotesk', marginBottom: '20px' }}>
            Your career OS is ready.<br />
            <span style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Are you?
            </span>
          </h2>
          <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Join 1,200+ students already using Optra to find and land niche opportunities faster.
          </p>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '18px 48px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              color: 'white', fontSize: '18px', fontWeight: '800',
              cursor: 'pointer', border: 'none',
              boxShadow: '0 8px 40px rgba(99,102,241,0.6)',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
            }}>
              Start Free Today <ArrowRight size={20} />
            </button>
          </Link>
          <div style={{ marginTop: '20px', fontSize: '13px', color: '#475569' }}>No credit card required · Free forever for students</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px', borderTop: '1px solid rgba(99,102,241,0.15)', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg, #6366F1, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: 'white' }}>O</div>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: '700', fontSize: '16px' }}>Optra</span>
        </div>
        <p style={{ fontSize: '13px', color: '#475569' }}>© 2026 Optra Technologies Pvt Ltd. Built for Indian tech talent.</p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '16px' }}>
          {['Privacy', 'Terms', 'DPDP Compliance', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: '13px', color: '#475569', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
