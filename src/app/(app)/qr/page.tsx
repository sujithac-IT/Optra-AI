'use client';
import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import {
  QrCode, Download, Copy, CheckCircle, Smartphone, Briefcase,
  Trophy, Globe, Link2, Zap, Star, Shield, ExternalLink, Eye,
  Mail, Phone, GraduationCap, Award, UserCheck
} from 'lucide-react';
import { useUser } from '@/context/AuthContext';
import { getInitials } from '@/lib/utils';


const qrTypes = [
  {
    id: 'resume',
    label: 'Resume QR',
    icon: <Briefcase size={20} />,
    color: '#6366F1',
    desc: 'Add to your printed resume. Recruiters scan to see your live proof-of-work dashboard.',
  },
  {
    id: 'apply',
    label: 'Scan-to-Apply',
    icon: <Zap size={20} />,
    color: '#06B6D4',
    desc: 'For campus fairs. Companies put this at their booth — students scan to submit verified profile instantly.',
  },
  {
    id: 'hackathon',
    label: 'Hackathon Badge',
    icon: <Trophy size={20} />,
    color: '#10B981',
    desc: 'Encrypted digital badge for offline hackathon check-in with face-verified attendance.',
  },
];

function QRPreview({ url, color, label, userName }: { url: string; color: string; label: string; userName: string }) {
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);

  const copy = () => {
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = svgRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const a = document.createElement('a');
    a.download = `optra-qr-${userName.toLowerCase().replace(/\s/g, '-')}.svg`;
    a.href = svgUrl;
    a.click();
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {/* QR Code */}
      <div ref={svgRef} style={{ padding: '16px', background: 'white', borderRadius: '16px', boxShadow: `0 0 40px ${color}40` }}>
        <QRCode value={url} size={180} fgColor="#0A0A0F" />
      </div>

      {/* Branding */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{userName} · {label}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', wordBreak: 'break-all', maxWidth: '220px' }}>{url}</div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={copy} style={{ padding: '8px 16px', borderRadius: '8px', background: `${color}15`, border: `1px solid ${color}33`, color, fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {copied ? <><CheckCircle size={13} /> Copied!</> : <><Copy size={13} /> Copy URL</>}
        </button>
        <button onClick={handleDownload} style={{ padding: '8px 16px', borderRadius: '8px', background: `${color}15`, border: `1px solid ${color}33`, color, fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Download size={13} /> Download
        </button>
      </div>
    </div>
  );
}

function ResumePreview({ user }: {
  user: {
    name: string;
    email?: string;
    phone?: string;
    college?: string;
    year?: string;
    skills: string[];
    optraScore?: number;
    certificates?: { name: string; fileName: string }[];
  }
}) {
  const initials = getInitials(user.name);
  const score = user.optraScore ?? 782;

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}>
      {/* Google 4-color accent header */}
      <div style={{ display: 'flex', height: '4px' }}>
        <div style={{ flex: 1, background: '#4285F4' }} />
        <div style={{ flex: 1, background: '#EA4335' }} />
        <div style={{ flex: 1, background: '#FBBC05' }} />
        <div style={{ flex: 1, background: '#34A853' }} />
      </div>

      {/* Header Section */}
      <div style={{ padding: '20px 24px 16px', background: 'linear-gradient(135deg, #F8FAFF, #FAFFFE)', borderBottom: '1px solid #E8EAED' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A73E8, #8E24AA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: '800', color: 'white', flexShrink: 0,
          }}>{initials}</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#202124', margin: 0, fontFamily: 'Space Grotesk, sans-serif' }}>{user.name}</h2>
            {user.college && (
              <div style={{ fontSize: '12px', color: '#5F6368', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <GraduationCap size={12} /> {user.college}{user.year ? ` · ${user.year}` : ''}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <div style={{ fontSize: '11px', color: '#188038', fontWeight: '700', background: 'rgba(24,128,56,0.08)', border: '1px solid rgba(24,128,56,0.25)', padding: '2px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <UserCheck size={10} /> Optra Verified
              </div>
              <div style={{ fontSize: '11px', color: '#1A73E8', fontWeight: '700', background: 'rgba(26,115,232,0.08)', border: '1px solid rgba(26,115,232,0.25)', padding: '2px 8px', borderRadius: '12px' }}>
                Score: {score} / 1000
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
          {user.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: '#5F6368' }}>
              <Mail size={11} color="#1A73E8" /> {user.email}
            </div>
          )}
          {user.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: '#5F6368' }}>
              <Phone size={11} color="#1A73E8" /> {user.phone}
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      {user.skills?.length > 0 && (
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #E8EAED' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#1A73E8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
            Verified Skills
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {user.skills.slice(0, 10).map(skill => (
              <span key={skill} style={{
                fontSize: '11.5px', fontWeight: '600',
                background: 'rgba(26,115,232,0.07)', border: '1px solid rgba(26,115,232,0.2)',
                color: '#1A73E8', padding: '4px 10px', borderRadius: '20px',
              }}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Certificates */}
      {user.certificates && user.certificates.length > 0 && (
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #E8EAED' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#188038', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
            Proof Certificates ({user.certificates.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {user.certificates.slice(0, 4).map((cert, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#3C4043' }}>
                <Award size={13} color="#188038" />
                <span style={{ fontWeight: '600' }}>{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optra Metrics */}
      <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        {[
          { label: 'Optra Score', value: `${score}`, sub: 'out of 1000', color: '#1A73E8' },
          { label: 'Face ID', value: '99.4%', sub: 'Biometric verified', color: '#188038' },
          { label: 'DigiLocker', value: '✓', sub: 'Credentials verified', color: '#34A853' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} style={{ background: '#F8F9FA', borderRadius: '10px', padding: '10px 12px', border: '1px solid #E8EAED', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '800', color, fontFamily: 'Space Grotesk' }}>{value}</div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#3C4043', marginTop: '2px' }}>{label}</div>
            <div style={{ fontSize: '9px', color: '#70757A', marginTop: '1px' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 24px 14px', display: 'flex', alignItems: 'center', gap: '6px', background: '#F8F9FA' }}>
        <Shield size={12} color="#188038" />
        <span style={{ fontSize: '10.5px', color: '#5F6368' }}>All credentials verified by <strong>Optra AI</strong> via DigiLocker & biometric face check</span>
      </div>
    </div>
  );
}

export default function QRPage() {
  const { user } = useUser();
  const [activeType, setActiveType] = useState(qrTypes[0]);
  const [showPreview, setShowPreview] = useState(false);

  const displayName = user?.name ?? 'Your Name';
  const slug = displayName.toLowerCase().replace(/\s+/g, '');
  const baseUrl = process.env.NEXT_PUBLIC_QR_BASE_URL ?? 'https://optra.ai/p';

  const getUrl = (typeId: string) => {
    if (typeId === 'resume') return `${baseUrl}/${slug}`;
    if (typeId === 'apply') return `${baseUrl}/apply/${slug}`;
    return `${baseUrl}/badge/${slug}`;
  };

  const features = {
    resume: [
      `${displayName}'s live verified skills`,
      user?.college ? `DigiLocker verified — ${user.college}` : 'DigiLocker verified credentials',
      'Face-verified biometric identity',
      `Optra Score: ${user?.optraScore ?? 782} / 1000`,
    ],
    apply: ['Instant profile submit — no forms', 'Verified credentials auto-attached', 'Confirmation via WhatsApp'],
    hackathon: ['Face-verified check-in', 'Anti-impersonation filter', 'Real-time attendance log'],
  };

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '6px' }}>Smart QR Engine</h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Dynamic QR codes linked to <strong>{displayName}</strong>'s live verified talent dashboard
        </p>
      </div>

      {/* Type Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {qrTypes.map(type => (
          <div
            key={type.id}
            onClick={() => setActiveType(type)}
            style={{
              padding: '20px', borderRadius: '16px', cursor: 'pointer',
              background: activeType.id === type.id ? 'var(--bg-card)' : 'var(--bg-secondary)',
              border: `1px solid ${activeType.id === type.id ? 'var(--border-bright)' : 'var(--border)'}`,
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

          <QRPreview url={getUrl(activeType.id)} color={activeType.color} label={activeType.label} userName={displayName} />

          <div style={{ marginTop: '24px', borderTop: '1px solid rgba(99,102,241,0.1)', paddingTop: '20px' }}>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>When Scanned, Recruiter Sees</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(features[activeType.id as keyof typeof features] ?? []).map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94A3B8' }}>
                  <CheckCircle size={13} color={activeType.color} /> {f}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowPreview(!showPreview)}
            style={{ marginTop: '20px', width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#818CF8', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Eye size={15} /> {showPreview ? 'Hide' : 'Preview'} Resume Profile
          </button>
        </div>

        {/* Right: Resume Profile Preview or Use Cases */}
        <div>
          {showPreview ? (
            <div>
              <div style={{ fontSize: '13px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Smartphone size={14} /> Recruiter sees this when they scan your QR code
              </div>
              {user ? (
                <ResumePreview user={user} />
              ) : (
                <div style={{ padding: '24px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                  Please log in to see your personalised profile.
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ borderLeft: '3px solid #6366F1' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={16} color="#6366F1" /> On Printed Resume
                </div>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>Print the QR on your resume. When a recruiter scans it, they land on {displayName}'s verified Optra dashboard — live projects, verified CGPA, GitHub metrics.</p>
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
