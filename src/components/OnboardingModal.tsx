'use client';
import { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, Phone, Camera, Sparkles, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { WhatsAppIcon, FaceScanIcon } from '@/components/Icons';

export default function OnboardingModal({ isOpen, onClose, onVerified }: { isOpen: boolean; onClose: () => void; onVerified?: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    targetRole: 'Full Stack Engineer / AI Specialist',
  });
  
  // WhatsApp OTP state
  const [otp, setOtp] = useState(['8', '4', '9', '2', '0', '1']);
  const [showWhatsAppToast, setShowWhatsAppToast] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // WebCam state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'complete' | 'failed'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('Position face in circle');

  useEffect(() => {
    if (step === 3 && isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step, isOpen]);

  const startCamera = async () => {
    try {
      setScanStatus('scanning');
      setScanMessage('Accessing optical camera...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      runBiometricScan();
    } catch (err) {
      console.warn("Camera permission unavailable, switching to simulated biometric scan.", err);
      setCameraActive(false);
      runBiometricScan();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const runBiometricScan = () => {
    setScanStatus('scanning');
    setScanProgress(10);
    setScanMessage('Initializing facial landmark mesh...');

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanStatus('complete');
          setScanMessage('Biometric Signature Authenticated ✓');
          return 100;
        }
        if (prev === 30) setScanMessage('Detecting 68 facial vector coordinates...');
        if (prev === 60) setScanMessage('Performing liveness verification...');
        if (prev === 85) setScanMessage('Generating cryptographic biometric token...');
        return prev + 5;
      });
    }, 150);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    // Trigger WhatsApp notification toast simulation
    setShowWhatsAppToast(true);
  };

  const handleOtpVerify = () => {
    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setStep(3);
    }, 1200);
  };

  const handleCompleteAll = () => {
    setStep(4);
    if (typeof window !== 'undefined') {
      localStorage.setItem('optra_verified', 'true');
    }
    if (onVerified) onVerified();
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      {/* WhatsApp Floating Instant Intimation Toast */}
      {showWhatsAppToast && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 100000,
          background: '#075E54', color: 'white', padding: '16px 20px', borderRadius: '16px',
          boxShadow: '0 12px 36px rgba(7,94,84,0.4)', border: '1px solid #128C7E',
          maxWidth: '380px', animation: 'slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <WhatsAppIcon size={22} color="#25D366" />
            <span style={{ fontWeight: '700', fontSize: '14px' }}>WhatsApp Instant Alert</span>
            <button onClick={() => setShowWhatsAppToast(false)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
          <div style={{ fontSize: '13px', lineHeight: '1.4', background: 'rgba(0,0,0,0.2)', padding: '10px 12px', borderRadius: '10px' }}>
            💬 <strong>Optra AI Security</strong>: Hello {formData.name.split(' ')[0]}! Your login OTP code is <strong style={{ color: '#25D366', fontSize: '15px' }}>849201</strong>. Keep this safe.
          </div>
        </div>
      )}

      {/* Main Modal Container */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '24px', width: '100%', maxWidth: '540px', overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)', animation: 'scaleUp 0.3s ease'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px', background: 'linear-gradient(135deg, #1A73E8, #188038)',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaceScanIcon size={24} color="white" />
            <div>
              <div style={{ fontWeight: '700', fontSize: '17px', fontFamily: 'Space Grotesk' }}>Realtime Verification Engine</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>Phone OTP via WhatsApp & Biometric Face ID</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
          {[
            { n: 1, label: 'Profile' },
            { n: 2, label: 'WhatsApp OTP' },
            { n: 3, label: 'WebCam Face ID' },
          ].map(s => (
            <div key={s.n} style={{
              flex: 1, padding: '12px 8px', textAlign: 'center', fontSize: '12px', fontWeight: '600',
              color: step >= s.n ? '#1A73E8' : 'var(--text-muted)',
              borderBottom: `2px solid ${step >= s.n ? '#1A73E8' : 'transparent'}`,
              transition: 'all 0.3s'
            }}>
              {step > s.n ? '✓ ' : `${s.n}. `}{s.label}
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          {/* STEP 1: Basic Profile */}
          {step === 1 && (
            <form onSubmit={handlePhoneSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Full Name</label>
                <input className="input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Phone Number (WhatsApp Instant Intimation)</label>
                <div style={{ position: 'relative' }}>
                  <input className="input" style={{ paddingLeft: '40px' }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                  <WhatsAppIcon size={18} color="#25D366" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#188038', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ✓ Instant WhatsApp notification alert will be dispatched to this number
                </div>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Target Career Role</label>
                <input className="input" value={formData.targetRole} onChange={e => setFormData({ ...formData, targetRole: e.target.value })} required />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '14px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
                <Phone size={16} /> Send WhatsApp Verification Code
              </button>
            </form>
          )}

          {/* STEP 2: WhatsApp OTP */}
          {step === 2 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <WhatsAppIcon size={30} color="#25D366" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>WhatsApp Verification Code</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                We sent a 6-digit code to <strong>{formData.phone}</strong> via WhatsApp.
              </p>

              {/* OTP Boxes */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
                {otp.map((digit, i) => (
                  <input key={i} type="text" maxLength={1} value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                    }}
                    style={{
                      width: '46px', height: '52px', textAlign: 'center', fontSize: '20px', fontWeight: '700',
                      borderRadius: '12px', border: '2px solid #1A73E8', background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                ))}
              </div>

              <button onClick={handleOtpVerify} disabled={isVerifyingOtp} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {isVerifyingOtp ? <RefreshCw size={18} className="spin" /> : <ShieldCheck size={18} />}
                {isVerifyingOtp ? 'Verifying OTP...' : 'Verify OTP & Proceed to Face ID'}
              </button>
            </div>
          )}

          {/* STEP 3: Realtime WebCam Face ID */}
          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Realtime Face ID Scanner</div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Hold steady in front of your WebCam for biometric identification</p>

              {/* Video Camera & Holographic Overlay */}
              <div style={{
                position: 'relative', width: '240px', height: '240px', margin: '0 auto 20px',
                borderRadius: '50%', overflow: 'hidden', border: '4px solid #1A73E8',
                boxShadow: '0 0 30px rgba(26,115,232,0.4)', background: '#0F172A'
              }}>
                <video ref={videoRef} playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />

                {!cameraActive && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0F172A', color: 'white' }}>
                    <Camera size={40} color="#1A73E8" style={{ marginBottom: '8px' }} />
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>Biometric Feed Simulated</div>
                  </div>
                )}

                {/* Laser Scanning Animation Overlay */}
                <div style={{
                  position: 'absolute', top: `${scanProgress}%`, left: 0, right: 0, height: '3px',
                  background: 'linear-gradient(90deg, transparent, #00FFCC, transparent)',
                  boxShadow: '0 0 15px #00FFCC', transition: 'top 0.15s linear'
                }} />

                {/* Biometric Face Target Marks */}
                <div style={{ position: 'absolute', inset: '20px', borderRadius: '50%', border: '2px dashed rgba(0,255,204,0.4)', animation: 'spin 10s linear infinite' }} />
              </div>

              {/* Status Tracker */}
              <div style={{ fontSize: '13px', fontWeight: '600', color: scanStatus === 'complete' ? '#188038' : '#1A73E8', marginBottom: '12px' }}>
                {scanMessage}
              </div>

              {/* Progress Bar */}
              <div className="progress-bar" style={{ height: '8px', marginBottom: '20px' }}>
                <div className="progress-fill" style={{ width: `${scanProgress}%`, background: scanStatus === 'complete' ? '#188038' : 'linear-gradient(90deg, #1A73E8, #34A853)' }} />
              </div>

              {scanStatus === 'complete' && (
                <button onClick={handleCompleteAll} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px', background: '#188038', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <CheckCircle size={18} /> Confirm Verification & Enter Dashboard
                </button>
              )}
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(24,128,56,0.12)', border: '2px solid #188038', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#188038' }}>
                <CheckCircle size={40} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'Space Grotesk', color: '#188038', marginBottom: '8px' }}>Optra Verification Success!</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Your phone (+91 98765 43210) and WebCam Face ID signature have been cryptographically verified.
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
