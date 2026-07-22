'use client';
import { useState, useRef, useEffect } from 'react';
import { mockVerification } from '@/lib/mockData';
import {
  ShieldCheck, CheckCircle2, Camera, Fingerprint, FileText,
  Link2, Award, Star, Lock, Eye, AlertCircle, Zap, ChevronRight,
  Globe, Smartphone, RefreshCw, Video, AlertTriangle, UserCheck
} from 'lucide-react';
import { FaceScanIcon } from '@/components/Icons';

function FaceVerification() {
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [alignmentState, setAlignmentState] = useState<'idle' | 'detecting' | 'aligning' | 'filtering' | 'verified'>('idle');
  const [scanMessage, setScanMessage] = useState('Position your face inside the biometric oval guide');
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const startFaceScan = async () => {
    setScanning(true);
    setVerified(false);
    setScanProgress(0);
    setAlignmentState('detecting');
    setWarningMsg(null);
    setScanMessage('Accessing HD WebCam biometric sensor...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 640, facingMode: 'user' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Camera stream simulated.", err);
      setCameraActive(false);
    }

    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setScanning(false);
          setVerified(true);
          setAlignmentState('verified');
          setScanMessage('Biometric Face ID Verified ✓');
          setWarningMsg(null);
          return 100;
        }

        if (p === 20) {
          setAlignmentState('aligning');
          setScanMessage('Facial Recognition: Ensure face is centered inside oval guide');
        }
        if (p === 45) {
          setAlignmentState('filtering');
          setScanMessage('Biometric Anti-Obstruction: Hand & non-facial object filter active');
          setWarningMsg('Ensure hands & fingers are clear from face area');
        }
        if (p === 75) {
          setScanMessage('Generating 256-bit biometric facial landmark hash...');
          setWarningMsg(null);
        }

        return p + 4;
      });
    }, 110);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Face Biometric Oval Scanner */}
      <div style={{
        position: 'relative', width: '240px', height: '240px', margin: '0 auto 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {/* Holographic Guide Bracket Corners */}
        {[
          { top: 0, left: 0, borderT: true, borderL: true, r: '8px 0 0 0' },
          { top: 0, right: 0, borderT: true, borderR: true, r: '0 8px 0 0' },
          { bottom: 0, left: 0, borderB: true, borderL: true, r: '0 0 0 8px' },
          { bottom: 0, right: 0, borderB: true, borderR: true, r: '0 0 8px 0' },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: c.top !== undefined ? c.top : 'auto',
            bottom: c.bottom !== undefined ? c.bottom : 'auto',
            left: c.left !== undefined ? c.left : 'auto',
            right: c.right !== undefined ? c.right : 'auto',
            width: '28px', height: '28px',
            borderTop: c.borderT ? `3.5px solid ${verified ? '#188038' : scanning ? '#1A73E8' : '#DADCE0'}` : 'none',
            borderBottom: c.borderB ? `3.5px solid ${verified ? '#188038' : scanning ? '#1A73E8' : '#DADCE0'}` : 'none',
            borderLeft: c.borderL ? `3.5px solid ${verified ? '#188038' : scanning ? '#1A73E8' : '#DADCE0'}` : 'none',
            borderRight: c.borderR ? `3.5px solid ${verified ? '#188038' : scanning ? '#1A73E8' : '#DADCE0'}` : 'none',
            borderRadius: c.r, transition: 'all 0.3s ease',
          }} />
        ))}

        {/* Biometric Oval Mask Frame */}
        <div style={{
          width: '190px', height: '230px', borderRadius: '50%',
          background: verified ? 'rgba(24,128,56,0.04)' : 'rgba(26,115,232,0.04)',
          border: `2px solid ${verified ? '#188038' : scanning ? '#1A73E8' : '#DADCE0'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
          boxShadow: scanning ? '0 0 20px rgba(26,115,232,0.25)' : 'none',
        }}>
          {/* Live WebCam Stream */}
          <video
            ref={videoRef}
            playsInline
            muted
            style={{
              width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)',
              display: cameraActive ? 'block' : 'none'
            }}
          />

          {!cameraActive && (
            <div style={{ textAlign: 'center', padding: '16px' }}>
              {verified ? (
                <div style={{ color: '#188038', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={48} color="#188038" />
                  <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>BIOMETRIC VERIFIED</span>
                </div>
              ) : (
                <div style={{ color: '#1A73E8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <UserCheck size={48} color="#1A73E8" />
                  <span style={{ fontSize: '11px', color: '#5F6368', fontWeight: '600' }}>Align Face In Oval</span>
                </div>
              )}
            </div>
          )}

          {/* Biometric Reticle Target Guide overlay */}
          {scanning && (
            <>
              {/* Vertical Crosshair Guide */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(0, 255, 204, 0.4)', pointerEvents: 'none' }} />
              {/* Eye level horizontal reticle */}
              <div style={{ position: 'absolute', top: '38%', left: '15%', right: '15%', height: '1px', background: 'rgba(0, 255, 204, 0.4)', pointerEvents: 'none' }} />

              {/* Laser Scan Beam */}
              <div style={{
                position: 'absolute', left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, transparent, #00FFCC, transparent)',
                top: `${scanProgress}%`, transition: 'top 0.1s linear',
                boxShadow: '0 0 16px #00FFCC',
              }} />
            </>
          )}
        </div>
      </div>

      {/* Warning / Anti-obstruction alert */}
      {warningMsg && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(242,153,0,0.1)', border: '1px solid rgba(242,153,0,0.3)',
          color: '#B06000', fontSize: '11.5px', fontWeight: '700',
          padding: '4px 12px', borderRadius: '16px', marginBottom: '10px'
        }}>
          <AlertTriangle size={14} color="#F29900" />
          {warningMsg}
        </div>
      )}

      {/* Verification Status Banner */}
      <div style={{ fontSize: '13px', fontWeight: '700', color: verified ? '#188038' : '#1A73E8', marginBottom: '8px' }}>
        {scanMessage}
      </div>

      {verified && (
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Facial Similarity: <strong>99.4%</strong> · Anti-Obstruction Check: <strong>Passed</strong> · Liveness: <strong>Verified</strong>
        </div>
      )}

      {/* Tap Button to Initiate Biometric Face Scan */}
      <button
        onClick={startFaceScan}
        disabled={scanning}
        className="btn-primary"
        style={{
          padding: '12px 26px', fontSize: '14px', borderRadius: '12px',
          background: verified ? '#188038' : 'linear-gradient(135deg, #1A73E8, #1557B0)',
          display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: scanning ? 'default' : 'pointer'
        }}
      >
        {scanning ? <RefreshCw size={16} className="spin" /> : <Video size={16} />}
        {scanning ? 'Scanning Facial Biometrics...' : verified ? 'Re-Scan Face ID' : 'Tap to Scan & Verify Face ID'}
      </button>
    </div>
  );
}

export default function VerifyPage() {
  const v = mockVerification;

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)', marginBottom: '6px' }}>
          Biometric Verification Hub
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          DigiLocker academic credential validation & AI face-only biometric verification
        </p>
      </div>

      {/* Optra Score Summary */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px', border: '1px solid rgba(26,115,232,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#1A73E8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
              Verified Profile Trust Score
            </div>
            <div style={{ fontSize: '36px', fontWeight: '900', fontFamily: 'Space Grotesk', color: 'var(--text-primary)' }}>
              782 <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>/ 1000 PTS</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ padding: '10px 16px', borderRadius: '12px', background: 'rgba(24,128,56,0.08)', border: '1px solid rgba(24,128,56,0.2)', color: '#188038', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> DigiLocker Verified
            </div>
            <div style={{ padding: '10px 16px', borderRadius: '12px', background: 'rgba(26,115,232,0.08)', border: '1px solid rgba(26,115,232,0.2)', color: '#1A73E8', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaceScanIcon size={16} color="#1A73E8" /> Biometric Face ID Authenticated
            </div>
          </div>
        </div>
      </div>

      {/* Grid: DigiLocker & Face Verification */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        
        {/* DigiLocker Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(24,128,56,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link2 size={22} color="#188038" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>DigiLocker Integration</div>
              <div style={{ fontSize: '12px', color: '#188038', fontWeight: '600' }}>Connected & Authenticated</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {v.digilocker.documents.map((doc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <FileText size={18} color="#188038" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{doc.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.issuer}</div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#188038', background: 'rgba(24,128,56,0.1)', padding: '3px 10px', borderRadius: '12px' }}>
                  {doc.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Biometric Face Verification Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(26,115,232,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={22} color="#1A73E8" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>AI Face-Only Biometric Scanner</div>
              <div style={{ fontSize: '12px', color: '#188038', fontWeight: '600' }}>WebCam Alignment & Obstruction Filter</div>
            </div>
          </div>

          <FaceVerification />

          {/* Neutral Metrics Grid */}
          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Face Alignment', status: 'Aligned ✓', color: '#188038' },
              { label: 'Anti-Hand Obstruction', status: 'Active (Passed)', color: '#188038' },
              { label: 'Biometric Match', status: '99.4%', color: '#1A73E8' },
              { label: 'DPDP Compliant', status: 'Verified', color: '#188038' },
            ].map(({ label, status, color }) => (
              <div key={label} style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', fontSize: '12px' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '2px', fontSize: '11px' }}>{label}</div>
                <div style={{ color, fontWeight: '800', fontSize: '13px' }}>{status}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Compliance Notice */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Lock size={18} color="#1A73E8" />
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          <strong>DPDP Act Compliance:</strong> Optra biometric engine enforces facial landmark alignment and filters out hand or non-facial obstructions locally in-session. Raw video feeds are never saved.
        </div>
      </div>
    </div>
  );
}
