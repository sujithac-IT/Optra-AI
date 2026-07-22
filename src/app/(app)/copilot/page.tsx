'use client';
import { useState, useRef, useEffect } from 'react';
import { mockStudentProfile, mockOpportunities } from '@/lib/mockData';
import {
  Send, Sparkles, Bot, FileText, Upload, CheckCircle2, ArrowRight,
  Target, Code, BookOpen, AlertTriangle, Download, RefreshCw, Copy, Check, User
} from 'lucide-react';
import { GeminiIcon, WhatsAppIcon, LinkedInIcon, UnstopIcon } from '@/components/Icons';
import VoiceoverAssistant, { speakText } from '@/components/VoiceoverAssistant';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  codeSnippet?: string;
};

const RadarChart = ({ skills }: { skills: typeof mockStudentProfile.skills }) => {
  const cx = 160, cy = 160, r = 120;
  const n = skills.length;
  const points = skills.map((s, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const pct = s.level / 100;
    return {
      x: cx + r * pct * Math.cos(angle),
      y: cy + r * pct * Math.sin(angle),
      lx: cx + (r + 28) * Math.cos(angle),
      ly: cy + (r + 28) * Math.sin(angle),
      ax: cx + r * Math.cos(angle),
      ay: cy + r * Math.sin(angle),
    };
  });
  const polygon = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg width="320" height="320" style={{ overflow: 'visible' }}>
      {[0.25, 0.5, 0.75, 1].map(f => (
        <polygon key={f} points={skills.map((_, i) => {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          return `${cx + r * f * Math.cos(angle)},${cy + r * f * Math.sin(angle)}`;
        }).join(' ')} fill="none" stroke="rgba(26,115,232,0.15)" strokeWidth="1" />
      ))}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.ax} y2={p.ay} stroke="rgba(26,115,232,0.15)" strokeWidth="1" />
      ))}
      <polygon points={polygon} fill="rgba(26,115,232,0.15)" stroke="#1A73E8" strokeWidth="2.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#1A73E8" stroke="#188038" strokeWidth="1.5" />
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="Inter">
          {skills[i].name}
        </text>
      ))}
    </svg>
  );
};

export default function CopilotPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'matrix'>('chat');
  const [selectedModel, setSelectedModel] = useState<'optra-3.6' | 'gemini-pro' | 'deepseek-r1'>('optra-3.6');
  const [language, setLanguage] = useState('en-US');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello Rahul. I am the Optra AI Copilot Engine, powered by Google AI models.

Profile loaded: VIT Vellore · Optra Score: 782/1000.

How I can assist you:
- Resume & ATS Compatibility: Evaluate your resume against LinkedIn & Unstop jobs.
- Coursera & Google Roadmap: Generate targeted learning paths with YouTube video tutorials.
- Technical & System Design Interviews: Practice coding and system architecture questions.
- Job Search: Recommend live internships matching React, Python, and Node.js.

What would you like to explore?`,
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const promptSuggestions = [
    "Analyze my resume for SDE role at Google",
    "Recommend top LinkedIn & Unstop internships for React/Python",
    "Generate a targeted 3-day roadmap for System Design and Docker",
    "Generate ATS bullet points for my portfolio"
  ];

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: attachedFile ? `[Attached File: ${attachedFile}] ${messageText}` : messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setAttachedFile(null);
    setIsTyping(true);

    // AI Response Engine
    setTimeout(() => {
      let aiResponse = "";
      const lower = messageText.toLowerCase();

      if (lower.includes('resume') || lower.includes('ats')) {
        aiResponse = `### ATS Resume & Profile Gap Analysis for SDE Role

Evaluated profile against Software Development Engineer (SDE-1) standards:

Overall ATS Match Score: 91 / 100

Key Technical Strengths:
1. Full-Stack Foundation: React (88%) and Node.js (80%).
2. Production Track Record: Built production React/Node applications serving 500+ users.
3. Profile Trust: Verified DigiLocker CGPA 8.4 + WebCam Face ID authentication.

Identified Skill Gaps:
- Docker Containerization: Current 45% (Required: 75%).
- System Design Architecture: Current 40% (Required: 70%).

\`\`\`javascript
// Suggested ATS Resume Bullet Point
"Engineered a scalable microservices architecture with FastAPI & Redis, reducing API latency by 40% under 1,000+ concurrent sessions."
\`\`\`

Would you like me to open the Coursera & Google learning roadmap for Docker and System Design?`;
      } else if (lower.includes('internship') || lower.includes('job') || lower.includes('linkedin') || lower.includes('unstop')) {
        aiResponse = `### Real-Time LinkedIn & Unstop Opportunities

Based on your verified skills and Optra Score (782), here are the top 3 live openings:

1. Google India — AI Engineer & Full-Stack Developer
   - Source: LinkedIn Jobs API
   - Match Score: 96%
   - Package: ₹18–25 LPA
   - Location: Bangalore / Hybrid

2. Flipkart GRiD 7.0 — Software Development Track
   - Source: Unstop Competition API
   - Match Score: 90%
   - Prize: ₹15 Lakhs + Pre-Placement Interview (PPI)

3. Microsoft India — Frontend Engineer Intern
   - Source: LinkedIn Jobs API
   - Match Score: 94%
   - Stipend: ₹50,000/mo

Select any role to generate a tailored 1-click application.`;
      } else {
        aiResponse = `Regarding your query:

I recommend focusing on FastAPI backend service integration, Docker container deployment, and system architecture.

You can request:
- System Design interview questions.
- Code optimization review.
- Cold outreach messages for LinkedIn technical recruiters.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      // Read AI response aloud using SpeechSynthesis Voiceover
      speakText(aiResponse, language);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            AI Copilot Workspace <span style={{ fontSize: '11px', fontWeight: '700', color: '#1A73E8', background: 'rgba(26,115,232,0.1)', padding: '3px 10px', borderRadius: '12px' }}>Google Engine 3.6</span>
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Conversational AI career assistant with real-time Multilingual Voiceover and Speech input</p>
        </div>

        {/* Tab Switcher & Voice Assistant Control */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <VoiceoverAssistant
            currentLanguage={language}
            onLanguageChange={setLanguage}
            onVoiceInput={(transcript) => handleSendMessage(transcript)}
            textToSpeak={messages[messages.length - 1]?.content}
          />

          <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <button
              onClick={() => setActiveTab('chat')}
              style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                background: activeTab === 'chat' ? '#1A73E8' : 'transparent',
                color: activeTab === 'chat' ? 'white' : 'var(--text-secondary)', border: 'none',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <Bot size={16} /> AI Chatbot Workspace
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                background: activeTab === 'matrix' ? '#1A73E8' : 'transparent',
                color: activeTab === 'matrix' ? 'white' : 'var(--text-secondary)', border: 'none',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <Target size={16} /> Skill Vector Matrix
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: ChatGPT / Gemini AI Chatbot Workspace */}
      {activeTab === 'chat' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
          
          {/* Main Chat Canvas */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '680px', padding: 0, overflow: 'hidden' }}>
            
            {/* Model Selector Bar */}
            <div style={{ padding: '12px 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GeminiIcon size={20} color="#1A73E8" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Select Model Architecture:</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { id: 'optra-3.6', label: 'Optra 3.6 Flash' },
                  { id: 'gemini-pro', label: 'Gemini Pro 1.5' },
                  { id: 'deepseek-r1', label: 'DeepSeek R1 Reasoning' },
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m.id as any)}
                    style={{
                      padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer',
                      background: selectedModel === m.id ? 'rgba(26,115,232,0.15)' : 'transparent',
                      border: `1px solid ${selectedModel === m.id ? '#1A73E8' : 'var(--border)'}`,
                      color: selectedModel === m.id ? '#1A73E8' : 'var(--text-muted)'
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {messages.map(msg => (
                <div key={msg.id} style={{
                  display: 'flex', gap: '14px',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: msg.role === 'user' ? '#1A73E8' : '#188038',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: '14px', fontWeight: '700'
                  }}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>

                  <div style={{
                    maxWidth: '82%', background: msg.role === 'user' ? 'rgba(26,115,232,0.08)' : 'var(--bg-secondary)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(26,115,232,0.25)' : 'var(--border)'}`,
                    borderRadius: '16px', padding: '16px 20px', fontSize: '14px', lineHeight: '1.6',
                    color: 'var(--text-primary)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {msg.content}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#1A73E8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={18} />
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', padding: '12px 18px', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw size={14} className="spin" /> Reasoning response...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Recommendation Pills */}
            <div style={{ padding: '10px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
              {promptSuggestions.map((ps, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(ps)}
                  style={{
                    whiteSpace: 'nowrap', padding: '6px 12px', borderRadius: '16px', fontSize: '11px', fontWeight: '600',
                    background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: '#1A73E8', cursor: 'pointer'
                  }}
                >
                  {ps}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div style={{ padding: '16px 20px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
              {attachedFile && (
                <div style={{ fontSize: '11px', color: '#1A73E8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={12} /> Attached: {attachedFile}
                  <button onClick={() => setAttachedFile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EA4335' }}>✕</button>
                </div>
              )}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label title="Attach File" style={{ cursor: 'pointer', padding: '10px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Upload size={16} color="var(--text-secondary)" />
                  <input type="file" accept=".pdf,.txt,.docx" onChange={e => e.target.files?.[0] && setAttachedFile(e.target.files[0].name)} style={{ display: 'none' }} />
                </label>

                <input
                  className="input"
                  placeholder="Ask Optra AI anything (or speak using mic button above)..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  style={{ flex: 1, padding: '12px 16px', fontSize: '14px', borderRadius: '24px' }}
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() && !attachedFile}
                  className="btn-primary"
                  style={{ borderRadius: '50%', width: '42px', height: '42px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Context Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card">
              <div style={{ fontSize: '14px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={16} color="#1A73E8" /> Profile Context
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Rahul Sharma</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>VIT Vellore · Optra Score: 782</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <span>Verified CGPA:</span><strong style={{ color: '#188038' }}>8.4</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <span>GitHub Repos:</span><strong>50+ Repos</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <span>Face ID Status:</span><strong style={{ color: '#188038' }}>Verified ✓</strong>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Skill Matrix */}
      {activeTab === 'matrix' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '20px' }}>
              Skill Vector Radar
            </div>
            <RadarChart skills={mockStudentProfile.skills} />
          </div>

          <div className="card">
            <div style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '16px' }}>
              Gap Analysis vs. Target Roles
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { skill: 'Docker Containerization', current: 45, needed: 75, status: 'high' },
                { skill: 'System Design Architecture', current: 40, needed: 70, status: 'high' },
                { skill: 'FastAPI Microservices', current: 75, needed: 80, status: 'ok' },
              ].map(g => (
                <div key={g.skill}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600' }}>{g.skill}</span>
                    <span style={{ fontSize: '11px', color: g.status === 'high' ? '#EA4335' : '#188038', fontWeight: '700' }}>
                      {g.status === 'high' ? 'High Gap' : 'Matched'}
                    </span>
                  </div>
                  <div className="progress-bar" style={{ height: '8px' }}>
                    <div className="progress-fill" style={{ width: `${g.current}%`, background: '#1A73E8' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
