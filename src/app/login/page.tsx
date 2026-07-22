'use client';
import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, Certificate } from '@/context/AuthContext';
import {
  Eye, EyeOff, User, Mail, Phone, Lock, Upload, CheckCircle2,
  ArrowRight, ArrowLeft, Mic, MicOff, X, FileText, Globe
} from 'lucide-react';

const ALL_SKILLS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Vue.js', 'Angular',
  'Node.js', 'Express', 'FastAPI', 'Django', 'Python', 'Java',
  'Go', 'Rust', 'C++', 'SQL', 'PostgreSQL', 'MongoDB',
  'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Azure',
  'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow',
  'System Design', 'DSA', 'GraphQL', 'Redis', 'Git', 'Linux',
];

const LANGUAGES = [
  { code: 'en-US', label: 'English' },
  { code: 'hi-IN', label: 'हिंदी' },
  { code: 'ta-IN', label: 'தமிழ்' },
  { code: 'te-IN', label: 'తెలుగు' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ' },
  { code: 'ml-IN', label: 'മലയാളം' },
  { code: 'bn-IN', label: 'বাংলা' },
  { code: 'es-ES', label: 'Español' },
  { code: 'fr-FR', label: 'Français' },
];

const STEP_LABELS = ['Account', 'Skills', 'Certificates', 'Complete'];

type Mode = 'login' | 'signup';

function speakFemale(text: string, lang = 'en-US') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.pitch = 1.3;
  utter.rate = 0.95;

  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const female = voices.find(v =>
      v.lang.startsWith(lang.split('-')[0]) &&
      (v.name.toLowerCase().includes('female') ||
       v.name.toLowerCase().includes('zira') ||
       v.name.toLowerCase().includes('samantha') ||
       v.name.toLowerCase().includes('google uk english female') ||
       v.name.toLowerCase().includes('aria') ||
       v.name.toLowerCase().includes('hazel'))
    ) || voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (female) utter.voice = female;
    window.speechSynthesis.speak(utter);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', setVoice, { once: true });
  } else {
    setVoice();
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [mode, setMode] = useState<Mode>('login');
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('en-US');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Certificates
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice input
  const [listening, setListening] = useState(false);
  const [voiceField, setVoiceField] = useState<string | null>(null);

  // Login mode
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [loginError, setLoginError] = useState('');

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleFileRead = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        setCerts(prev => [...prev, {
          name: file.name.replace(/\.[^.]+$/, ''),
          fileName: file.name,
          dataUrl: e.target?.result as string,
        }]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileRead(e.dataTransfer.files);
  };

  const startVoiceInput = (field: string) => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = false;
    rec.onstart = () => { setListening(true); setVoiceField(field); };
    rec.onresult = (e: any) => {
      const t = e.results[0][0].transcript;
      if (field === 'name') setName(t);
      if (field === 'college') setCollege(t);
      setListening(false); setVoiceField(null);
    };
    rec.onerror = () => { setListening(false); setVoiceField(null); };
    rec.onend = () => { setListening(false); setVoiceField(null); };
    rec.start();
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email';
    if (!phone.match(/^\+?[0-9]{10,13}$/)) e.phone = 'Enter a valid phone number';
    if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLoginSubmit = () => {
    // Demo: accept any credentials, or check localStorage
    const stored = localStorage.getItem('optra_user_session');
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === loginEmail) {
        router.push('/dashboard');
        speakFemale(`Welcome back ${user.name}! You are now logged in.`, lang);
        return;
      }
    }
    setLoginError('Account not found. Please sign up first.');
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && selectedSkills.length === 0) {
      setErrors({ skills: 'Please select at least one skill' });
      return;
    }
    setErrors({});
    setStep(s => s + 1);
    if (step === 1) speakFemale(`Great ${name}! Now let's validate your technical skills.`, lang);
    if (step === 2) speakFemale('Excellent! Please upload your proof certificates or achievements.', lang);
    if (step === 3) {
      const score = 600 + selectedSkills.length * 12 + certs.length * 20;
      login({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        college: college.trim() || undefined,
        year: year || undefined,
        skills: selectedSkills,
        certificates: certs,
        language: lang,
        optraScore: Math.min(score, 1000),
      });
      speakFemale(`Congratulations ${name}! Your Optra profile is ready. Welcome to your career dashboard!`, lang);
      setTimeout(() => router.push('/dashboard'), 2500);
    }
  };

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: '100%', padding: '13px 14px 13px 44px', borderRadius: '12px',
    border: `1.5px solid ${err ? '#EA4335' : 'var(--border, #E2E8F0)'}`,
    background: 'rgba(255,255,255,0.06)', color: '#0F172A',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
  });

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0F4C81 100%)',
      fontFamily: 'Inter, Space Grotesk, sans-serif', padding: '20px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background decorative orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,115,232,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,168,83,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Language Selector */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', padding: '8px 14px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)' }}>
        <Globe size={14} color="rgba(255,255,255,0.8)" />
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: '600', outline: 'none', cursor: 'pointer' }}
        >
          {LANGUAGES.map(l => <option key={l.code} value={l.code} style={{ background: '#1E293B' }}>{l.label}</option>)}
        </select>
      </div>

      {/* Main Card */}
      <div style={{
        width: '100%', maxWidth: '480px',
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
        borderRadius: '28px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        animation: 'scaleUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1A73E8 0%, #0D47A1 50%, #34A853 100%)',
          padding: '32px 36px 28px',
          color: 'white',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '900' }}>O</div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.5px' }}>Optra AI</div>
              <div style={{ fontSize: '11px', opacity: 0.85, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '700' }}>Career Intelligence Platform</div>
            </div>
          </div>

          {mode === 'signup' ? (
            <>
              {/* Step Progress */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                {STEP_LABELS.map((label, i) => (
                  <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div style={{ height: '3px', borderRadius: '4px', background: i + 1 <= step ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.25)', transition: 'all 0.4s ease' }} />
                    <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: i + 1 <= step ? 1 : 0.5 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '18px', fontWeight: '700' }}>
                {step === 1 && 'Create Your Account'}
                {step === 2 && 'Validate Your Skills'}
                {step === 3 && 'Upload Certificates'}
                {step === 4 && 'Profile Ready!'}
              </div>
            </>
          ) : (
            <div style={{ fontSize: '22px', fontWeight: '700' }}>Welcome back</div>
          )}
        </div>

        {/* Form Body */}
        <div style={{ padding: '28px 36px 32px' }}>

          {/* ─── LOGIN MODE ─── */}
          {mode === 'login' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input style={inputStyle()} placeholder="Email address" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} type="email" />
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input style={inputStyle()} placeholder="Password" value={loginPwd} onChange={e => setLoginPwd(e.target.value)} type={showPwd ? 'text' : 'password'} />
                <button onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {showPwd ? <EyeOff size={16} color="#94A3B8" /> : <Eye size={16} color="#94A3B8" />}
                </button>
              </div>
              {loginError && <div style={{ fontSize: '12px', color: '#EA4335', fontWeight: '600' }}>{loginError}</div>}
              <button onClick={handleLoginSubmit} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #1A73E8, #0D47A1)', color: 'white', border: 'none', fontSize: '15px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
                Sign In <ArrowRight size={18} />
              </button>
              <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748B' }}>
                Don&apos;t have an account?{' '}
                <button onClick={() => { setMode('signup'); setStep(1); }} style={{ background: 'none', border: 'none', color: '#1A73E8', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>Create Account</button>
              </div>
            </div>
          )}

          {/* ─── SIGNUP STEP 1: Account Details ─── */}
          {mode === 'signup' && step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Name */}
              <div>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input style={inputStyle(errors.name)} placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                  <button onClick={() => startVoiceInput('name')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: listening && voiceField === 'name' ? '#EA4335' : 'rgba(26,115,232,0.1)', border: 'none', borderRadius: '8px', padding: '5px', cursor: 'pointer', display: 'flex' }}>
                    {listening && voiceField === 'name' ? <MicOff size={14} color="white" /> : <Mic size={14} color="#1A73E8" />}
                  </button>
                </div>
                {errors.name && <div style={{ fontSize: '11px', color: '#EA4335', marginTop: '4px', marginLeft: '4px' }}>{errors.name}</div>}
              </div>
              {/* Email */}
              <div>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input style={inputStyle(errors.email)} placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} type="email" />
                </div>
                {errors.email && <div style={{ fontSize: '11px', color: '#EA4335', marginTop: '4px', marginLeft: '4px' }}>{errors.email}</div>}
              </div>
              {/* Phone */}
              <div>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input style={inputStyle(errors.phone)} placeholder="Phone Number (e.g. +91 98765 43210)" value={phone} onChange={e => setPhone(e.target.value)} type="tel" />
                </div>
                {errors.phone && <div style={{ fontSize: '11px', color: '#EA4335', marginTop: '4px', marginLeft: '4px' }}>{errors.phone}</div>}
              </div>
              {/* College + Year */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input style={inputStyle()} placeholder="College / University" value={college} onChange={e => setCollege(e.target.value)} />
                </div>
                <select
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  style={{ ...inputStyle(), paddingLeft: '14px', appearance: 'none' }}
                >
                  <option value="">Year of Study</option>
                  {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Working Professional'].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              {/* Password */}
              <div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input style={inputStyle(errors.password)} placeholder="Create Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} type={showPwd ? 'text' : 'password'} />
                  <button onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {showPwd ? <EyeOff size={16} color="#94A3B8" /> : <Eye size={16} color="#94A3B8" />}
                  </button>
                </div>
                {errors.password && <div style={{ fontSize: '11px', color: '#EA4335', marginTop: '4px', marginLeft: '4px' }}>{errors.password}</div>}
              </div>

              <button onClick={nextStep} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #1A73E8, #0D47A1)', color: 'white', border: 'none', fontSize: '15px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
                Continue <ArrowRight size={18} />
              </button>
              <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748B' }}>
                Already have an account?{' '}
                <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: '#1A73E8', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>Sign In</button>
              </div>
            </div>
          )}

          {/* ─── SIGNUP STEP 2: Skills ─── */}
          {mode === 'signup' && step === 2 && (
            <div>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>
                Select all the technologies you are proficient in. This powers your Optra Score and job matching.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '280px', overflowY: 'auto', padding: '4px' }}>
                {ALL_SKILLS.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    style={{
                      padding: '7px 14px', borderRadius: '20px', fontSize: '12.5px', fontWeight: '600',
                      cursor: 'pointer', border: '1.5px solid',
                      borderColor: selectedSkills.includes(skill) ? '#1A73E8' : '#E2E8F0',
                      background: selectedSkills.includes(skill) ? 'rgba(26,115,232,0.1)' : 'transparent',
                      color: selectedSkills.includes(skill) ? '#1A73E8' : '#475569',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {selectedSkills.includes(skill) && '✓ '}{skill}
                  </button>
                ))}
              </div>
              {errors.skills && <div style={{ fontSize: '11px', color: '#EA4335', marginTop: '8px' }}>{errors.skills}</div>}
              <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '10px' }}>{selectedSkills.length} skills selected</div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: '13px', borderRadius: '12px', background: '#F1F5F9', border: 'none', color: '#64748B', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={nextStep} style={{ flex: 2, padding: '13px', borderRadius: '12px', background: 'linear-gradient(135deg, #1A73E8, #0D47A1)', color: 'white', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ─── SIGNUP STEP 3: Certificates ─── */}
          {mode === 'signup' && step === 3 && (
            <div>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>
                Upload proof certificates, marksheets, or achievements. Each certificate adds to your Optra Score.
              </p>

              {/* Drag & Drop Zone */}
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${isDragging ? '#1A73E8' : '#CBD5E1'}`,
                  borderRadius: '16px', padding: '28px 20px', textAlign: 'center',
                  background: isDragging ? 'rgba(26,115,232,0.05)' : '#F8FAFC',
                  cursor: 'pointer', transition: 'all 0.2s', marginBottom: '14px',
                }}
              >
                <Upload size={28} color={isDragging ? '#1A73E8' : '#94A3B8'} style={{ margin: '0 auto 10px' }} />
                <div style={{ fontSize: '13px', fontWeight: '600', color: isDragging ? '#1A73E8' : '#475569' }}>
                  Drag & drop or click to upload
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>PDF, JPG, PNG, DOCX supported</div>
                <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.docx" style={{ display: 'none' }} onChange={e => handleFileRead(e.target.files)} />
              </div>

              {/* Uploaded Files */}
              {certs.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px', maxHeight: '140px', overflowY: 'auto' }}>
                  {certs.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                      <FileText size={16} color="#1A73E8" />
                      <span style={{ flex: 1, fontSize: '12px', fontWeight: '600', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.fileName}</span>
                      <CheckCircle2 size={14} color="#188038" />
                      <button onClick={() => setCerts(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <X size={14} color="#94A3B8" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: '13px', borderRadius: '12px', background: '#F1F5F9', border: 'none', color: '#64748B', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={nextStep} style={{ flex: 2, padding: '13px', borderRadius: '12px', background: 'linear-gradient(135deg, #34A853, #1A73E8)', color: 'white', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  Complete Profile <ArrowRight size={16} />
                </button>
              </div>
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#94A3B8', marginTop: '10px' }}>
                {certs.length === 0 ? 'You can skip this step and add certificates later' : `${certs.length} certificate${certs.length > 1 ? 's' : ''} ready`}
              </div>
            </div>
          )}

          {/* ─── SIGNUP STEP 4: Complete ─── */}
          {mode === 'signup' && step === 4 && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #34A853, #1A73E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle2 size={38} color="white" />
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'Space Grotesk, sans-serif', color: '#0F172A', marginBottom: '8px' }}>
                Welcome, {name.split(' ')[0]}!
              </div>
              <div style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6', marginBottom: '20px' }}>
                Your Optra profile is ready. Redirecting to your personalized dashboard...
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1A73E8', animation: `pulseGlow 1.2s ease-in-out ${i * 0.3}s infinite` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
