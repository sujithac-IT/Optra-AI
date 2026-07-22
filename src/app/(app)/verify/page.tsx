'use client';
import { useState, useEffect } from 'react';
import { mockVerification } from '@/lib/mockData';
import {
  ShieldCheck, CheckCircle, Camera, Fingerprint, FileText,
  Link2, Award, Star, Lock, Eye, AlertCircle, Zap, ChevronRight,
  Globe, Smartphone
} from 'lucide-react';

function FaceVerification() {
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(true);
  const [scanPct, setScanPct] = useState(0);

  const startScan = () => {
    setScanning(true);
    setDone(false);
    setScanPct(0);
    const interval = setInterval(() => {
      setScanPct(p => {
        if (p >= 100) { clearInterval(interval); setScanning(false); setDone(true); return 100; }
        return p + 2;
      });
    }, 50);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Face Frame */}
      <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Corners */}
        {[['top:0,left:0', 'borderTop,borderLeft'], ['top:0,right:0', 'borderTop,borderRight'], ['bottom:0,left:0', 'borderBottom,borderLeft'], ['bottom:0,right:0', 'borderBottom,borderRight']].map(([pos], i) => {
          const isTop = i < 2, isLeft = i % 2 === 0;
          return (
            <div key={i} style={{
              position: 'absolute',
              [isTop ? 'top' : 'bottom']: 0,
              [isLeft ? 'left' : 'right']: 0,
              width: '24px', height: '24px',
              borderTop: isTop ? `3px solid ${done ? '#10B981' : '#6366F1'}` : 'none',
              borderBottom: !isTop ? `3px solid ${done ? '#10B981' : '#6366F1'}` : 'none',
              borderLeft: isLeft ? `3px solid ${done ? '#10B981' : '#6366F1'}` : 'none',
              borderRight: !isLeft ? `3px solid ${done ? '#10B981' : '#6366F1'}` : 'none',
              borderRadius: isTop && isLeft ? '4px 0 0 0' : isTop ? '0 4px 0 0' : isLeft ? '0 0 0 4px' : '0 0 4px 0',
            }} />
          );
        })}

        {/* Camera Feed */}
        <div style={{
          width: '160px', height: '160px', borderRadius: '50%',
          background: done ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.1)',
          border: `2px solid ${done ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>
          {done ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '4px' }}>👤</div>
              <div style={{ fontSize: '10px', color: '#10B981', fontWeight: '700' }}>VERIFIED</div>
            </div>
          ) : scanning ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '4px' }}>👁️</div>
              <div style={{ fontSize: '11px', color: '#6366F1' }}>{scanPct}%</div>
            </div>
          ) : (
            <Camera size={40} color="#475569" />
          )}

          {/* Scan Line */}
          {scanning && (
            <div style={{
              position: 'absolute', left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, transparent, #6366F1, transparent)',
              top: `${scanPct}%`, transition: 'top 0.05s',
              boxShadow: '0 0 10px rgba(99,102,241,0.8)',
            }} />
          )}
        </div>
      </div>

      {done ? (
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#10B981', marginBottom: '4px' }}>Face Verified ✓</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '12px' }}>Similarity Score: 99.2% · Liveness: Passed</div>
          <div style={{ fontSize: '11px', color: '#475569' }}>Last verified: July 20, 2026</div>
        </div>
      ) : (
        <button onClick={startScan} style={{ padding: '10px 24px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: 'white', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}>
          {scanning ? 'Scanning...' : 'Start Face Scan'}
        </button>
      )}
    </div>
  );
}

export default function VerifyPage() {
  const [digiStep, setDigiStep] = useState(3); // 0=connect, 1=otp, 2=consent, 3=done
  const v = mockVerification;

  const scoreTotal = v.optraScore.breakdown.reduce((a, b) => a + b.score, 0);
  const scoreMax = v.optraScore.breakdown.reduce((a, b) => a + b.max, 0);

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px' }}>
          Verification Hub <span style={{ fontSize: '14px', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '4px 12px', borderRadius: '20px', marginLeft: '8px', border: '1px solid rgba(16,185,129,0.25)' }}>Optra Verified ✓</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>DigiLocker credentials + AI face verification = 100% verified Optra profile</p>
      </div>

      {/* Optra Score Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '20px', padding: '28px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center', minWidth: '100px' }}>
          <div style={{ fontSize: '48px', fontWeight: '900', fontFamily: 'Space Grotesk', background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {v.optraScore.total}
          </div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>Optra Score / 1000</div>
        </div>
        <div style={{ flex: 1, minWidth: '240px' }}>
          {v.optraScore.breakdown.map(b => (
            <div key={b.label} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>
                <span>{b.label}</span><span style={{ color: b.color }}>{b.score}/{b.max}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(b.score / b.max) * 100}%`, background: `linear-gradient(90deg, ${b.color}, ${b.color}88)` }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', minWidth: '120px' }}>
          <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>Rank</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#F59E0B' }}>Top 8%</div>
          <div style={{ fontSize: '12px', color: '#475569' }}>of all students</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* DigiLocker */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link2 size={22} color="#10B981" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>DigiLocker</div>
              <div style={{ fontSize: '12px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} /> Connected
              </div>
            </div>
          </div>

          {digiStep === 3 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {v.digilocker.documents.map((doc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <FileText size={16} color="#10B981" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{doc.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{doc.issuer}</div>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '3px 8px', borderRadius: '8px' }}>{doc.score}</div>
                  <CheckCircle size={14} color="#10B981" />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Connect DigiLocker', 'Verify OTP', 'Grant Consent', 'Documents Fetched'].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: i <= digiStep ? 1 : 0.4 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: i < digiStep ? '#10B981' : i === digiStep ? '#6366F1' : 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: 'white', flexShrink: 0 }}>
                    {i < digiStep ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: '13px', color: i <= digiStep ? '#F8FAFC' : '#475569' }}>{step}</span>
                </div>
              ))}
              <button onClick={() => setDigiStep(Math.min(3, digiStep + 1))} className="btn-primary" style={{ marginTop: '8px', padding: '10px' }}>
                {digiStep === 0 ? 'Connect DigiLocker' : digiStep === 1 ? 'Verify OTP (1234)' : 'Grant Consent'}
              </button>
            </div>
          )}
        </div>

        {/* Face Verification */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={22} color="#6366F1" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>AI Face Verification</div>
              <div style={{ fontSize: '12px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} /> Verified
              </div>
            </div>
          </div>
          <FaceVerification />
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Liveness Check', status: 'Passed', color: '#10B981' },
              { label: 'Anti-Proxy', status: 'Active', color: '#10B981' },
              { label: 'Match Score', status: '99.2%', color: '#6366F1' },
              { label: 'DPDP Compliant', status: 'Yes', color: '#10B981' },
            ].map(({ label, status, color }) => (
              <div key={label} style={{ padding: '8px', borderRadius: '8px', background: 'rgba(18,18,30,0.6)', border: '1px solid rgba(99,102,241,0.08)', fontSize: '11px' }}>
                <div style={{ color: '#475569', marginBottom: '2px' }}>{label}</div>
                <div style={{ color, fontWeight: '700' }}>{status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Badge Section */}
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 40px rgba(16,185,129,0.4)' }}>
          <ShieldCheck size={40} color="white" />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '8px' }}>Optra Verified Profile</h2>
        <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '400px', margin: '0 auto 20px' }}>
          Your profile is 100% verified. Recruiters can trust your credentials, CGPA, and identity without any manual checks.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['DigiLocker Verified', 'AI Face Cleared', 'CGPA 8.4 Authentic', 'APAAR ID Linked'].map(badge => (
            <div key={badge} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#6EE7B7', fontWeight: '600' }}>
              <CheckCircle size={14} /> {badge}
            </div>
          ))}
        </div>
      </div>

      {/* DPDP Compliance */}
      <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '14px', padding: '16px 20px', marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <Lock size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.6' }}>
          <strong style={{ color: '#FCD34D' }}>DPDP Act Compliance:</strong> Optra stores only mathematical face embeddings (not raw images or video). All biometric data is processed in-session and deleted immediately. You may revoke access at any time under <em>Settings → Privacy</em>.
        </div>
      </div>
    </div>
  );
}
