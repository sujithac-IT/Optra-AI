'use client';
import { useState, useEffect } from 'react';
import { mockScoutActivity } from '@/lib/mockData';
import {
  Radar, Zap, Globe, Settings,
  Bell, BellRing, CheckCircle, AlertCircle, TrendingUp,
  ArrowRight, Play, Pause, RefreshCw, Filter, BarChart3,
  MessageCircle, Smartphone
} from 'lucide-react';

const sources = [
  { name: 'Twitter/X', icon: '𝕏', active: true, found: 34, color: '#1DA1F2', desc: 'Hiring threads & DM-resume posts' },
  { name: 'Devfolio', icon: '⬡', active: true, found: 18, color: '#06B6D4', desc: 'Hackathons & startup challenges' },
  { name: 'YC Jobs', icon: 'Y', active: true, found: 12, color: '#F97316', desc: 'Early-stage startup openings' },
  { name: 'GitHub Bounties', icon: '⭐', active: true, found: 8, color: '#8B5CF6', desc: 'Open-source issue bounties' },
  { name: 'ISRO / GATE', icon: '🏛️', active: true, found: 5, color: '#F59E0B', desc: 'Government exam notifications' },
  { name: 'University Portals', icon: '🎓', active: false, found: 3, color: '#10B981', desc: 'Lab openings & research positions' },
  { name: 'Telegram Groups', icon: '✈️', active: true, found: 22, color: '#2AABEE', desc: 'Startup hiring channels' },
  { name: 'Unstop', icon: 'U', active: false, found: 9, color: '#F43F5E', desc: 'Competitions & campus events' },
];

function LiveLog() {
  const [logs, setLogs] = useState(mockScoutActivity.slice(0, 5));
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(c => c + 1);
      const newLog = {
        time: 'Just now',
        source: ['Twitter/X', 'Devfolio', 'YC Jobs', 'GitHub'][Math.floor(Math.random() * 4)],
        event: [
          'Found: Senior React Dev — Setu API, ₹18 LPA Remote',
          'New Hackathon: HackBengaluru 2026 — ₹80,000 prize',
          'Updated: Zepto SDE-1 deadline extended by 7 days',
          'Alert: IIT Delhi RA opening — Prof. Roshan Sharma, CV',
          'Found: Google Developer Student Club lead opening — IIIT',
        ][Math.floor(Math.random() * 5)],
        type: ['new', 'update', 'alert'][Math.floor(Math.random() * 3)],
        matchedStudents: Math.floor(Math.random() * 100) + 5,
      };
      setLogs(prev => [newLog, ...prev.slice(0, 7)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
      {logs.map((log, i) => (
        <div key={`${i}-${counter}`} style={{
          display: 'flex', gap: '12px', padding: '10px 12px', borderRadius: '10px',
          background: 'rgba(18,18,30,0.6)',
          border: `1px solid ${log.type === 'new' ? 'rgba(16,185,129,0.15)' : log.type === 'alert' ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.1)'}`,
          animation: i === 0 ? 'slideIn 0.4s ease' : 'none',
        }}>
          <div style={{ flexShrink: 0, marginTop: '4px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: log.type === 'new' ? '#10B981' : log.type === 'alert' ? '#F59E0B' : '#6366F1',
              boxShadow: `0 0 6px ${log.type === 'new' ? '#10B981' : log.type === 'alert' ? '#F59E0B' : '#6366F1'}`,
            }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5' }}>{log.event}</div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              <span style={{ fontSize: '10px', color: '#475569' }}>{log.source}</span>
              <span style={{ fontSize: '10px', color: '#475569' }}>{log.time}</span>
              {log.matchedStudents > 0 && (
                <span style={{ fontSize: '10px', color: '#6366F1' }}>→ {log.matchedStudents} students matched</span>
              )}
            </div>
          </div>
          <div style={{ fontSize: '10px', color: log.type === 'new' ? '#10B981' : log.type === 'alert' ? '#F59E0B' : '#6366F1', textTransform: 'uppercase', fontWeight: '700', flexShrink: 0, paddingTop: '2px' }}>
            {log.type}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ScoutPage() {
  const [running, setRunning] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [phone, setPhone] = useState('+91 98765 43210');

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px' }}>
            Scout Agent <span style={{ fontSize: '14px', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '4px 12px', borderRadius: '20px', marginLeft: '8px', border: '1px solid rgba(16,185,129,0.25)' }}>Engine 1</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B' }}>24/7 AI crawler indexing niche opportunities from 8 live sources</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setRunning(!running)}
            style={{
              padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '700',
              background: running ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)',
              border: `1px solid ${running ? 'rgba(244,63,94,0.3)' : 'rgba(16,185,129,0.3)'}`,
              color: running ? '#FB7185' : '#6EE7B7',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
            {running ? <><Pause size={14} /> Pause Scout</> : <><Play size={14} /> Resume Scout</>}
          </button>
          <button style={{ padding: '10px 20px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#818CF8', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={14} /> Force Scan
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ background: running ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.06)', border: `1px solid ${running ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`, borderRadius: '14px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: running ? '#10B981' : '#F59E0B', boxShadow: running ? '0 0 8px rgba(16,185,129,0.8)' : 'none', animation: running ? 'pulseGlow 1.5s infinite' : 'none' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: running ? '#10B981' : '#F59E0B' }}>Scout {running ? 'Running' : 'Paused'}</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { label: 'Sources active', value: '6/8' },
            { label: 'Found today', value: '111' },
            { label: 'Students matched', value: '432' },
            { label: 'Last scan', value: '47s ago' },
          ].map(({ label, value }) => (
            <div key={label} style={{ fontSize: '13px' }}>
              <span style={{ color: '#475569' }}>{label}: </span>
              <span style={{ color: '#F8FAFC', fontWeight: '700' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Live Feed */}
        <div className="card" style={{ gridColumn: '1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', animation: 'pulseGlow 1.5s infinite' }} />
              Live Activity Feed
            </div>
            <div style={{ fontSize: '11px', color: '#475569' }}>Auto-refreshing every 4s</div>
          </div>
          <LiveLog />
        </div>

        {/* Sources Panel */}
        <div className="card">
          <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk', marginBottom: '16px' }}>Data Sources</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sources.map(src => (
              <div key={src.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(18,18,30,0.5)', border: `1px solid ${src.active ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.05)'}`, opacity: src.active ? 1 : 0.5 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${src.color}18`, color: src.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', flexShrink: 0 }}>
                  {src.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>{src.name}</div>
                  <div style={{ fontSize: '11px', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{src.desc}</div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: src.color, flexShrink: 0 }}>+{src.found}</div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: src.active ? '#10B981' : '#475569', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Alerts */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.08), rgba(18,18,30,0.8))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageCircle size={22} color="#25D366" />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>WhatsApp Alert Engine</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Instant notifications when Scout finds a high-match opportunity</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: whatsappEnabled ? '#25D366' : '#475569', fontWeight: '600' }}>{whatsappEnabled ? 'Enabled' : 'Disabled'}</span>
            <div
              onClick={() => setWhatsappEnabled(!whatsappEnabled)}
              style={{
                width: '44px', height: '24px', borderRadius: '12px',
                background: whatsappEnabled ? '#25D366' : 'rgba(99,102,241,0.2)',
                position: 'relative', cursor: 'pointer', transition: 'background 0.3s',
                border: '1px solid rgba(99,102,241,0.2)',
              }}>
              <div style={{
                position: 'absolute', top: '3px',
                left: whatsappEnabled ? '23px' : '3px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: 'white', transition: 'left 0.3s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px', display: 'block' }}>WhatsApp Number</label>
            <input className="input" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px', display: 'block' }}>Minimum Match Score to Alert</label>
            <select style={{ background: 'rgba(18,18,30,0.8)', border: '1px solid rgba(99,102,241,0.2)', color: '#94A3B8', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', outline: 'none', width: '100%' }}>
              <option>75% and above</option><option>80% and above</option><option>90% and above</option>
            </select>
          </div>
        </div>

        {/* Sample WhatsApp Message */}
        <div style={{ marginTop: '16px', background: 'rgba(18,18,30,0.6)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(37,211,102,0.15)' }}>
          <div style={{ fontSize: '11px', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Preview Message</div>
          <div style={{ display: 'inline-block', background: 'rgba(37,211,102,0.1)', borderRadius: '12px 12px 2px 12px', padding: '12px 16px', maxWidth: '80%' }}>
            <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.6' }}>
              🚀 <strong style={{ color: '#25D366' }}>Optra Scout found a match for you!</strong><br />
              <strong style={{ color: '#F8FAFC' }}>Full-Stack Intern @ Sarvam AI</strong><br />
              💰 ₹40,000/mo · Remote OK · 94% match<br />
              ⏰ Deadline: Aug 10 (19 days left)<br /><br />
              Your tailored resume is ready. Apply in 1 click:<br />
              <span style={{ color: '#6366F1' }}>optra.ai/apply/sarvam-ai-intern</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
