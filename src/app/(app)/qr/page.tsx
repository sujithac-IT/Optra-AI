'use client';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import {
  QrCode, Download, Copy, CheckCircle, Smartphone, Briefcase,
  Trophy, Globe, Link2, Zap, Star, Shield, ExternalLink, Eye
} from 'lucide-react';

const qrTypes = [
  {
    id: 'resume',
    label: 'Resume QR',
    icon: <Briefcase size={20} />,
    color: '#6366F1',
    desc: 'Add to your printed resume. Recruiters scan to see your live proof-of-work dashboard.',
    url: 'https://optra.ai/p/rahulsharma',
    features: ['Live GitHub projects', 'DigiLocker verified CGPA', 'Face-verified identity', 'Optra Score 782'],
  },
  {
    id: 'apply',
    label: 'Scan-to-Apply',
    icon: <Zap size={20} />,
    color: '#06B6D4',
    desc: 'For campus fairs. Companies put this at their booth — students scan to submit verified profile instantly.',
    url: 'https://optra.ai/apply/sarvam-ai-intern',
    features: ['Instant profile submit', 'No form filling', 'Verified credentials auto-attached', 'Confirmation via WhatsApp'],
  },
  {
    id: 'hackathon',
    label: 'Hackathon Badge',
    icon: <Trophy size={20} />,
    color: '#10B981',
    desc: 'Encrypted digital badge for offline hackathon check-in with face-verified attendance.',
    url: 'https://optra.ai/badge/ethindia2026/RS001',
    features: ['Face-verified check-in', 'Anti-impersonation', 'Instant team confirmation', 'Real-time attendance log'],
  },
];

function QRPreview({ url, color, label }: { url: string; color: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {/* QR Code */}
      <div style={{ padding: '16px', background: 'white', borderRadius: '16px', boxShadow: `0 0 40px ${color}40` }}>
        <QRCode value={url} size={180} fgColor="#0A0A0F" />
      </div>

      {/* Branding */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#F8FAFC', marginBottom: '4px' }}>Rahul Sharma · {label}</div>
        <div style={{ fontSize: '11px', color: '#475569', fontFamily: 'JetBrains Mono, monospace', wordBreak: 'break-all', maxWidth: '220px' }}>{url}</div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={copy} style={{ padding: '8px 16px', borderRadius: '8px', background: `${color}15`, border: `1px solid ${color}33`, color, fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {copied ? <><CheckCircle size={13} /> Copied!</> : <><Copy size={13} /> Copy URL</>}
        </button>
        <button style={{ padding: '8px 16px', borderRadius: '8px', background: `${color}15`, border: `1px solid ${color}33`, color, fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Download size={13} /> Download
        </button>
      </div>
    </div>
  );
}

function TalentDashboardPreview() {
  return (
    <div style={{ background: '#12121E', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '20px', padding: '24px', maxWidth: '420px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: 'white' }}>RS</div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>Rahul Sharma</div>
          <div style={{ fontSize: '11px', color: '#10B981' }}>✓ Optra Verified · VIT Vellore</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '22px', fontWeight: '900', fontFamily: 'Space Grotesk', background: 'linear-gradient(135deg, #6366F1, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>782</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        {[
          { label: 'CGPA', value: '8.4', sub: 'DigiLocker Verified', color: '#10B981' },
          { label: 'GitHub Stars', value: '234', sub: '50+ merged PRs', color: '#F59E0B' },
          { label: 'Hackathon Wins', value: '2', sub: 'ETHIndia 2025 🏆', color: '#6366F1' },
          { label: 'Face Verified', value: '99.2%', sub: 'Liveness passed', color: '#06B6D4' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} style={{ background: 'rgba(18,18,30,0.8)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(99,102,241,0.08)' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', color, fontFamily: 'Space Grotesk' }}>{value}</div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#94A3B8' }}>{label}</div>
            <div style={{ fontSize: '10px', color: '#475569' }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '12px', color: '#475569', marginBottom: '8px', fontWeight: '600' }}>Top Skills</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL'].map(s => (
            <span key={s} style={{ fontSize: '11px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818CF8', padding: '3px 10px', borderRadius: '20px' }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px', padding: '10px 14px', fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Shield size={12} color="#10B981" /> All credentials verified via DigiLocker & AI face check
      </div>
    </div>
  );
}

export default function QRPage() {
  const [activeType, setActiveType] = useState(qrTypes[0]);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px' }}>Smart QR Engine</h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>Dynamic QR codes that link to your live, verified talent dashboard</p>
      </div>

      {/* Type Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {qrTypes.map(type => (
          <div
            key={type.id}
            onClick={() => setActiveType(type)}
            style={{
              padding: '20px', borderRadius: '16px', cursor: 'pointer',
              background: activeType.id === type.id ? `${type.color}12` : 'rgba(18,18,30,0.6)',
              border: `1px solid ${activeType.id === type.id ? `${type.color}44` : 'rgba(99,102,241,0.12)'}`,
              transition: 'all 0.2s',
            }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${type.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: type.color, marginBottom: '12px' }}>
              {type.icon}
            </div>
            <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>{type.label}</div>
            <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>{type.desc.slice(0, 70)}...</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: QR Generator */}
        <div className="card">
          <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Space Grotesk', marginBottom: '20px' }}>Generate {activeType.label}</div>

          <QRPreview url={activeType.url} color={activeType.color} label={activeType.label} />

          <div style={{ marginTop: '24px', borderTop: '1px solid rgba(99,102,241,0.1)', paddingTop: '20px' }}>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>When Scanned, Recruiter Sees</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeType.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94A3B8' }}>
                  <CheckCircle size={13} color={activeType.color} /> {f}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowPreview(!showPreview)}
            style={{ marginTop: '20px', width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#818CF8', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Eye size={15} /> {showPreview ? 'Hide' : 'Preview'} Talent Dashboard
          </button>
        </div>

        {/* Right: Talent Dashboard Preview or Use Cases */}
        <div>
          {showPreview ? (
            <div>
              <div style={{ fontSize: '13px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Smartphone size={14} /> Recruiter sees this when they scan your QR
              </div>
              <TalentDashboardPreview />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ borderLeft: '3px solid #6366F1' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={16} color="#6366F1" /> On Printed Resume
                </div>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>Print the QR on your resume. When a recruiter scans it, they land on your verified Optra dashboard — live projects, verified CGPA, GitHub metrics.</p>
              </div>
              <div className="card" style={{ borderLeft: '3px solid #06B6D4' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={16} color="#06B6D4" /> At Campus Fairs
                </div>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>Companies place a booth QR. Students scan and instantly submit their verified Optra profile — no forms, no PDFs, no manual entry.</p>
              </div>
              <div className="card" style={{ borderLeft: '3px solid #10B981' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={16} color="#10B981" /> Hackathon Check-in
                </div>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>Encrypted QR badge for offline hackathons. Scan to verify identity via face recognition, log attendance, and confirm team in real-time.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
