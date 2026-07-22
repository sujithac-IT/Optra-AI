'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ChevronDown, Mic, MicOff, Volume2 } from 'lucide-react';
import { useUser } from '@/context/AuthContext';
import { speakText, stopSpeaking, startListening, LANGUAGES } from '@/components/VoiceoverAssistant';
import { Globe } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

// AI response engine — contextual, user-aware, multilingual-friendly
function generateResponse(query: string, userName: string, userSkills: string[]): string {
  const lower = query.toLowerCase().trim();

  // Greeting
  if (/^(hi|hello|hey|namaste|vanakkam|namaskar|hola|bonjour|ola|yo)\b/.test(lower)) {
    return `Hello ${userName}! I'm Aria, your Optra AI career assistant. I'm here to help you with your Optra Score, job search, resume tips, learning roadmap, and much more. What can I help you with today?`;
  }

  // Name / identity
  if (lower.includes('your name') || lower.includes('who are you') || lower.includes('what are you')) {
    return `I'm Aria — your personal AI career assistant powered by Optra's career intelligence engine. I'm trained to help Indian tech talent like you land the best opportunities. Ask me anything!`;
  }

  // Score
  if (lower.includes('score') || lower.includes('optra score') || lower.includes('rating')) {
    return `Your current Optra Score reflects your verified credentials, skills, and activity. Based on your profile with ${userSkills.length} verified skills and uploaded certificates, you're in the top tier! Head to the Dashboard to see your full score breakdown and upload your resume to recalculate.`;
  }

  // Jobs / opportunities
  if (lower.includes('job') || lower.includes('opening') || lower.includes('hiring') || lower.includes('placement')) {
    return `Great timing, ${userName}! Based on your skills in ${userSkills.slice(0, 3).join(', ')}, I found active opportunities: 1) Google India — AI Engineer (₹18–25 LPA, 96% match), 2) Microsoft India — Frontend Intern (₹50,000/mo, 94% match), 3) Sarvam AI — Backend Intern (₹45,000/mo). Check the Explore tab for direct applications!`;
  }

  // Internship
  if (lower.includes('intern') || lower.includes('internship') || lower.includes('stipend')) {
    return `There are ${userSkills.includes('React') || userSkills.includes('Python') ? '3 high-match' : 'several'} active internships matching your profile: Microsoft Frontend (₹50K/mo), Sarvam AI Backend (₹45K/mo), and Flipkart GRiD hackathon with ₹15L prize. Go to Explore → Internship filter to apply in one click!`;
  }

  // Hackathon / competition
  if (lower.includes('hackathon') || lower.includes('competition') || lower.includes('unstop') || lower.includes('contest')) {
    return `Active competitions on Unstop: 1) TCS National Tech Challenge 2026 (₹50L prize + PPI) — 21 days left, 2) Flipkart GRiD 7.0 (₹15L prize + Interview Call) — 17 days left, 3) Uber HackTag AI Edition (₹20L pool) — 30 days left. Your profile has an 88–92% match score for all three!`;
  }

  // Roadmap / learning
  if (lower.includes('roadmap') || lower.includes('learn') || lower.includes('course') || lower.includes('tutorial')) {
    return `Your personalized learning roadmap has 3 priority modules: 1) Docker Containerization (Module 1 — 12 hrs), 2) System Design HLD (Module 2 — 8 hrs), 3) LeetCode 50 Mediums (Module 3). Each module links to free YouTube tutorials. Check your Dashboard for the full roadmap with YouTube video links!`;
  }

  // Resume
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('ats')) {
    return `To optimize your resume, ${userName}: 1) Use strong action verbs ("built", "deployed", "optimized"), 2) Quantify every achievement (e.g., "reduced load time by 40%"), 3) Add your GitHub profile URL, 4) Match keywords to the job description. Upload your resume on the Dashboard and I'll calculate your updated Optra Score!`;
  }

  // Skills
  if (lower.includes('skill') || lower.includes('tech stack') || lower.includes('technology')) {
    if (userSkills.length > 0) {
      const missing = ['Docker', 'System Design', 'AWS', 'Machine Learning'].filter(s => !userSkills.includes(s));
      return `Your current verified skills: ${userSkills.slice(0, 6).join(', ')}. To boost your Optra Score, I recommend adding: ${missing.slice(0, 3).join(', ')}. These are the top requested skills in active job postings this month!`;
    }
    return `Strengthen your profile by adding high-demand skills: React, Python, TypeScript, Docker, and System Design. Each verified skill adds up to 30 points to your Optra Score!`;
  }

  // Face ID / verification
  if (lower.includes('face') || lower.includes('verify') || lower.includes('digilocker') || lower.includes('kyc')) {
    return `Your Face ID and DigiLocker verification adds 120 trust points to your Optra Score and unlocks Verified Optra Direct jobs (exclusive roles not available elsewhere). Head to the Verify tab to complete biometric authentication — it takes under 30 seconds!`;
  }

  // WhatsApp / OTP
  if (lower.includes('whatsapp') || lower.includes('otp') || lower.includes('sms')) {
    return `WhatsApp verification is active on your account! Any OTP or application alerts will be sent to your registered phone. You'll receive instant notifications when recruiters view your Optra profile. Check your phone for the latest status.`;
  }

  // LinkedIn
  if (lower.includes('linkedin')) {
    return `Your LinkedIn profile is synced with Optra's live job feed. ${userSkills.includes('React') ? 'There are 12 React roles' : 'Multiple roles'} matching your skills currently active. Enable LinkedIn Easy Apply via your Optra Score to get auto-filled applications. Go to Explore → LinkedIn Jobs!`;
  }

  // Salary / package
  if (lower.includes('salary') || lower.includes('package') || lower.includes('ctc') || lower.includes('lpa')) {
    return `Based on your skill level, current market rates are: Entry-level (0–1 yr) ₹6–14 LPA, Mid-level (2–3 yrs) ₹14–28 LPA, Senior (4+ yrs) ₹28–50 LPA. With your Optra Verified profile, you negotiate from a position of trust — employers know your credentials are real!`;
  }

  // Interview prep
  if (lower.includes('interview') || lower.includes('prep') || lower.includes('prepare')) {
    return `Interview preparation roadmap for ${userName}: 1) DSA — Practice 50 LeetCode Medium (2 weeks), 2) System Design — Study Grokking System Design (1 week), 3) Behavioral — STAR method stories (2 days), 4) Company Research — glassdoor + LinkedIn insights. Want me to generate a mock interview question?`;
  }

  // Thank you
  if (lower.includes('thank') || lower.includes('thanks') || lower.includes('dhanyavaad') || lower.includes('shukriya')) {
    return `You're welcome, ${userName}! I'm always here whenever you need career guidance. Don't forget to check the Explore tab for new opportunities that just went live. Best of luck!`;
  }

  // Help
  if (lower.includes('help') || lower.includes('what can you do') || lower.includes('features')) {
    return `I can help you with:\n• Your Optra Score & how to improve it\n• Live job & internship openings (LinkedIn + Unstop)\n• Hackathon alerts and competitions\n• Resume & ATS optimization tips\n• Learning roadmap with YouTube tutorials\n• Face ID verification & DigiLocker\n• Interview prep & skill gap analysis\n\nJust ask me anything, ${userName}!`;
  }

  // Default smart response
  return `That's a great question, ${userName}! Based on your profile with ${userSkills.length} verified skills, I'd recommend exploring the Dashboard for your personalized insights. Is there a specific area — jobs, roadmap, or verification — where you'd like me to dig deeper?`;
}

export default function Chatbot() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(user?.language ?? 'en-US');
  const [messages, setMessages] = useState<Message[]>(() => [{
    id: 'welcome',
    role: 'assistant',
    content: `Hello${user ? ` ${user.name.split(' ')[0]}` : ''}! I'm Aria, your Optra AI career assistant. I can help with your Optra Score, jobs, roadmap, resume tips, and more. Ask me anything — in any language!`,
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // Update welcome message when user changes
  useEffect(() => {
    if (user) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Hello ${user.name.split(' ')[0]}! I'm Aria, your Optra AI career assistant powered by Google AI. I can help with your Optra Score, live job openings, resume tips, and learning roadmap. Ask me anything!`,
      }]);
    }
  }, [user?.name]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiContent = generateResponse(
        text.trim(),
        user?.name?.split(' ')[0] ?? 'there',
        user?.skills ?? []
      );
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: aiContent };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Auto-read the response with female voice
      speakText(aiContent, language);
      setIsSpeaking(true);
      const wordCount = aiContent.split(' ').length;
      setTimeout(() => setIsSpeaking(false), wordCount * 400 + 500);
    }, 900);
  };

  const handleMicClick = () => {
    if (isListeningMic) { setIsListeningMic(false); return; }
    startListening(
      language,
      (transcript) => { handleSend(transcript); },
      setIsListeningMic
    );
  };

  const handleStopSpeak = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const quickActions = [
    { label: 'My Optra Score', text: 'What is my Optra Score?' },
    { label: 'Live Jobs', text: 'Show me job openings matching my skills' },
    { label: 'Hackathons', text: 'What hackathons are open now?' },
    { label: 'Learning Roadmap', text: 'Show me my learning roadmap' },
    { label: 'Resume Tips', text: 'How can I improve my resume?' },
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: '24px', right: '24px',
            width: '62px', height: '62px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A73E8, #34A853)',
            color: 'white', border: 'none',
            boxShadow: '0 8px 30px rgba(26,115,232,0.4)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Sparkles size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '400px', height: '640px', maxHeight: '84vh',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: '24px', boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', zIndex: 9999, overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #1A73E8, #34A853)',
            color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '12px' }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px', fontFamily: 'Space Grotesk' }}>Aria — Optra AI</div>
                <div style={{ fontSize: '11px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isSpeaking ? '#FBBC05' : '#00FFCC', boxShadow: `0 0 6px ${isSpeaking ? '#FBBC05' : '#00FFCC'}` }} />
                  {isSpeaking ? 'Speaking...' : 'Google AI Engine · Female Voice'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {/* Language Switcher in header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '4px 8px' }}>
                <Globe size={12} color="white" />
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '11px', fontWeight: '600', outline: 'none', cursor: 'pointer' }}
                >
                  {LANGUAGES.map(l => <option key={l.code} value={l.code} style={{ background: '#1A73E8' }}>{l.name.split(' ')[0]}</option>)}
                </select>
              </div>
              {/* Stop speaking */}
              {isSpeaking && (
                <button onClick={handleStopSpeak} title="Stop speaking" style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '6px', color: 'white', cursor: 'pointer', display: 'flex' }}>
                  <Volume2 size={14} />
                </button>
              )}
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                <ChevronDown size={24} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--bg-secondary)' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: '10px', alignItems: 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #1A73E8, #34A853)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    <Bot size={16} />
                  </div>
                )}
                <div style={{
                  background: msg.role === 'user' ? '#1A73E8' : 'var(--bg-card)',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                  maxWidth: '82%', fontSize: '13.5px', lineHeight: '1.55',
                  whiteSpace: 'pre-line',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#1A73E8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={16} />
                </div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span>Aria is thinking</span>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1A73E8', animation: `pulseGlow 1s ease-in-out ${i * 0.3}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {quickActions.map(({ label, text }) => (
              <button
                key={label}
                onClick={() => handleSend(text)}
                style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', background: 'rgba(26,115,232,0.08)', border: '1px solid rgba(26,115,232,0.2)', color: '#1A73E8', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: '600' }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '12px 16px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              padding: '6px 14px', borderRadius: '24px',
            }}>
              {/* Mic Button */}
              <button
                onClick={handleMicClick}
                title={isListeningMic ? 'Listening — speak now' : `Speak in ${LANGUAGES.find(l => l.code === language)?.name.split(' ')[0] ?? 'any language'}`}
                style={{
                  background: isListeningMic ? '#EA4335' : 'transparent',
                  border: 'none', padding: '4px', borderRadius: '50%',
                  color: isListeningMic ? 'white' : '#94A3B8',
                  cursor: 'pointer', display: 'flex', flexShrink: 0,
                  animation: isListeningMic ? 'pulseGlow 1s infinite' : 'none',
                }}
              >
                {isListeningMic ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <input
                type="text"
                placeholder={isListeningMic ? 'Listening...' : 'Ask Aria anything...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '13.5px' }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? '#1A73E8' : 'var(--border)',
                  color: 'white', border: 'none', borderRadius: '50%',
                  width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: input.trim() ? 'pointer' : 'default',
                }}
              >
                <Send size={14} />
              </button>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '6px' }}>
              Powered by Google AI · Female Voice · {LANGUAGES.find(l => l.code === language)?.name.split(' ')[0] ?? 'English'} Mode
            </div>
          </div>
        </div>
      )}
    </>
  );
}
