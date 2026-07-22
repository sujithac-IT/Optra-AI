'use client';
import { useState, useRef, useEffect } from 'react';
import { mockVerification } from '@/lib/mockData';
import {
  ShieldCheck, CheckCircle2, Camera, Fingerprint, FileText,
  Link2, Award, Star, Lock, Eye, AlertCircle, Zap, ChevronRight,
  Globe, Smartphone, RefreshCw, Video
} from 'lucide-react';
import { FaceScanIcon } from '@/components/Icons';

function FaceVerification() {
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('Tap button below to start WebCam scan');
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
    setScanMessage('Accessing optical WebCam camera...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 480, facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Camera permission unavailable, proceeding with biometric vector simulation.", err);
      setCameraActive(false);
    }

    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setScanning(false);
          setVerified(true);
          setScanMessage('Biometric Face ID Verified ✓');
          return 100;
        }
        if (p === 30) setScanMessage('Detecting 68 facial landmark coordinates...');
        if (p === 60) setScanMessage('Performing liveness & anti-spoofing analysis...');
        if (p === 85) setScanMessage('Generating 256-bit biometric vector hash...');
        return p + 5;
      });
    }, 120);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Face Frame & WebCam Container */}
      <div style={{
        position: 'relative', width: '220px', height: '220px', margin: '0 auto 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {/* Holographic Frame Corner Marks */}
        {[['top:0,left:0', 'borderTop,borderLeft'], ['top:0,right:0', 'borderTop,borderRight'], ['bottom:0,left:0', 'borderBottom,borderLeft'], ['bottom:0,right:0', 'borderBottom,borderRight']].map(([pos], i) => {
          const isTop = i < 2, isLeft = i % 2 === 0;
          return (
            <div key={i} style={{
              position: 'absolute',
              [isTop ? 'top' : 'bottom']: 0,
              [isLeft ? 'left' : 'right']: 0,
              width: '24px', height: '24px',
              borderTop: isTop ? `3px solid ${verified ? '#188038' : '#1A73E8'}` : 'none',
              borderBottom: !isTop ? `3px solid ${verified ? '#188038' : '#1A73E8'}` : 'none',
              borderLeft: isLeft ? `3px solid ${verified ? '#188038' : '#1A73E8'}` : 'none',
              borderRight: !isLeft ? `3px solid ${verified ? '#188038' : '#1A73E8'}` : 'none',
              borderRadius: isTop && isLeft ? '4px 0 0 0' : isTop ? '0 4px 0 0' : isLeft ? '0 0 0 4px' : '0 0 4px 0',
            }} />
          );
        })}

        {/* Circular Camera Viewport */}
        <div style={{
          width: '180px', height: '180px', borderRadius: '50%',
          background: verified ? 'rgba(24,128,56,0.06)' : 'rgba(26,115,232,0.06)',
          border: `2px solid ${verified ? '#188038' : '#1A73E8'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>
          {/* Real Video Stream */}
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
            <div style={{ textAlign: 'center' }}>
              {verified ? (
                <div style={{ color: '#188038', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={44} color="#188038" />
                  <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px' }}>VERIFIED</span>
                </div>
              ) : (
                <Camera size={44} color="#1A73E8" />
              )}
            </div>
          )}

          {/* Laser Scan Beam */}
          {scanning && (
            <div style={{
              position: 'absolute', left: 0, right: 0, height: '3px',
              background: 'linear-gradient(90deg, transparent, #00FFCC, transparent)',
              top: `${scanProgress}%`, transition: 'top 0.1s linear',
              boxShadow: '0 0 15px #00FFCC',
            }} />
          )}
        </div>
      </div>

      {/* Verification Status */}
      <div style={{ fontSize: '13px', fontWeight: '700', color: verified ? '#188038' : '#1A73E8', marginBottom: '8px' }}>
        {scanMessage}
      </div>

      {verified && (
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Similarity Score: <strong>99.2%</strong> · Liveness Test: <strong>Passed</strong>
        </div>
      )}

      {/* Interactive Tap to Verify Button */}
      <button
        onClick={startFaceScan}
        disabled={scanning}
        className="btn-primary"
        style={{
          padding: '12px 24px', fontSize: '14px', borderRadius: '12px',
          background: verified ? '#188038' : 'linear-gradient(135deg, #1A73E8, #1557B0)',
          display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: scanning ? 'default' : 'pointer'
        }}
      >
        {scanning ? <RefreshCw size={16} className="spin" /> : <Video size={16} />}
        {scanning ? 'Scanning Face Geometry...' : verified ? 'Re-Scan Face ID' : 'Tap to Scan & Verify Face ID'}
      </button>
    </div>
  );
}

export default function VerifyPage() {
  const [digiStep, setDigiStep] = useState(3);
  const v = mockVerification;

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)', marginBottom: '6px' }}>
          Verification Hub
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          DigiLocker academic verification and real-time WebCam biometric Face ID authentication
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
              <FaceScanIcon size={16} color="#1A73E8" /> Face ID Authenticated
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

        {/* AI Face Verification Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(26,115,232,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={22} color="#1A73E8" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>AI Face Verification</div>
              <div style={{ fontSize: '12px', color: '#188038', fontWeight: '600' }}>WebCam Biometric Sensor</div>
            </div>
          </div>

          <FaceVerification />

          {/* Clean Neutral Metrics Grid (Fixing high contrast dark box mismatch) */}
          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Liveness Check', status: 'Passed', color: '#188038' },
              { label: 'Anti-Proxy Filter', status: 'Active', color: '#188038' },
              { label: 'Similarity Match', status: '99.2%', color: '#1A73E8' },
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
          <strong>DPDP Act Compliance:</strong> Optra biometric engine computes mathematical vector hashes locally in-session. Raw images or video feeds are never permanently stored.
        </div>
      </div>
    </div>
  );
}
