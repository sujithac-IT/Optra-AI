'use client';
import { useState, useRef, useEffect } from 'react';
import { mockStudentProfile, mockOpportunities } from '@/lib/mockData';
import {
  Send, Sparkles, Bot, FileText, Upload, CheckCircle, ArrowRight,
  Target, Code, BookOpen, AlertTriangle, Download, RefreshCw, Copy, Check, User
} from 'lucide-react';
import { GeminiIcon, WhatsAppIcon, LinkedInIcon, UnstopIcon } from '@/components/Icons';

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
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#1A73E8" stroke="#34A853" strokeWidth="1.5" />
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
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello Rahul! 👋 I am **Optra AI Copilot Engine**, your personal career strategist powered by Google AI models.

I have loaded your profile (**VIT Vellore · Optra Score: 782/1000**). 

Here is how I can assist you today:
- 🚀 **Resume & ATS Check**: Evaluate your resume against top LinkedIn & Unstop jobs.
- 🎯 **3-Day Roadmap**: Generate a targeted learning plan for your dream company.
- 💡 **Interview Prep**: Practice System Design & Coding questions.
- 💼 **Job Finder**: Recommend live internships matching your stack (React, Python, Node.js).

What would you like to explore first?`,
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
    "🚀 Analyze my resume for SDE role @ Google",
    "💼 Recommend top LinkedIn & Unstop internships for React/Python",
    "🎯 Give me a 3-day roadmap for System Design & Docker",
    "📝 Generate AI-tailored ATS bullet points for my portfolio"
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

    // Dynamic AI Intelligence Engine Response
    setTimeout(() => {
      let aiResponse = "";
      const lower = messageText.toLowerCase();

      if (lower.includes('resume') || lower.includes('ats')) {
        aiResponse = `### 📄 ATS Resume & Gap Analysis for SDE Role

I have evaluated your profile against **Software Development Engineer (SDE-1)** benchmarks:

**Overall ATS Score**: **91 / 100** (High Match)

#### Key Strengths Identified:
1. **Full-Stack Competency**: Strong React (88%) and Node.js (80%) foundations.
2. **Production Impact**: Built React/Node apps serving 500+ active users.
3. **Verification Status**: DigiLocker CGPA 8.4 + WebCam Face ID verified.

#### Critical Skill Gaps to Fix:
- 🔴 **Docker / Containerization**: Currently at **45%** (Need: **75%**).
- 🟡 **System Design (HLD)**: Currently at **40%** (Need: **70%**).

\`\`\`javascript
// Suggested ATS Resume Bullet Point
"Engineered a scalable microservices architecture with FastAPI & Redis, reducing API response times by 40% under 1,000+ concurrent sessions."
\`\`\`

Would you like me to generate a tailored 3-day roadmap to bridge the Docker & System Design gap?`;
      } else if (lower.includes('internship') || lower.includes('job') || lower.includes('linkedin') || lower.includes('unstop')) {
        aiResponse = `### 💼 Real-Time Job & Internship Recommendations

Based on your verified skills and Optra Score (782), here are the top 3 live openings from **LinkedIn API** and **Unstop API**:

1. **Google India — AI Engineer & Full-Stack Developer**
   - **Source**: LinkedIn Jobs API
   - **Match Score**: **96%**
   - **Stipend/Package**: ₹18–25 LPA
   - **Location**: Bangalore / Hybrid
   - **Direct Link**: [Apply on LinkedIn](https://linkedin.com/jobs/view/google-ai-dev)

2. **Flipkart GRiD 7.0 — Software Development Track**
   - **Source**: Unstop Competition API
   - **Match Score**: **90%**
   - **Prize**: ₹15 Lakhs + Pre-Placement Interview (PPI)
   - **Deadline**: 17 days left

3. **Microsoft India — Frontend Engineer Intern**
   - **Source**: LinkedIn Jobs API
   - **Match Score**: **94%**
   - **Stipend**: ₹50,000/mo

Would you like me to tailor your resume specifically for Google or Flipkart GRiD?`;
      } else if (lower.includes('roadmap') || lower.includes('system design') || lower.includes('docker')) {
        aiResponse = `### 🎯 Targeted 3-Day Accelerated Roadmap

To qualify for Tier-1 SDE roles and boost your Optra score above 850:

#### 📅 **Day 1: Docker Containerization**
- **Action**: Write a multi-stage \`Dockerfile\` for your Next.js frontend and FastAPI backend.
- **Deliverable**: Create a \`docker-compose.yml\` and push the image to Docker Hub.
- **Recommended Resource**: TechWorld with Nana (Docker Crash Course).

#### 📅 **Day 2: System Design (High-Level Architecture)**
- **Action**: Learn caching strategies (Redis), Load Balancers (Nginx), and database indexing.
- **Deliverable**: Draw an HLD diagram for an AI Chatbot infrastructure.
- **Recommended Resource**: Gaurav Sen System Design Primer.

#### 📅 **Day 3: One-Click Application**
- **Action**: Update your GitHub README with Docker badges and apply to Sarvam AI & Google India.`;
      } else {
        aiResponse = `That is a great query! Based on your target role as **Full Stack AI Developer**:

I recommend focusing on **FastAPI backend integration**, **Docker container deployment**, and **LLM prompt engineering**. 

You can ask me to:
- Generate interview coding problems (DSA/System Design).
- Review your project architecture.
- Draft a cold message for recruiters on LinkedIn.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
      {/* Top Header & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', fontFamily: 'Space Grotesk', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            AI Copilot Workspace <span style={{ fontSize: '11px', fontWeight: '700', color: '#1A73E8', background: 'rgba(26,115,232,0.1)', padding: '3px 10px', borderRadius: '12px' }}>Google Engine 3.6</span>
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Conversational AI assistant like ChatGPT & Gemini trained on real-time career & ATS intelligence</p>
        </div>

        {/* Tab Switcher */}
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
            <Bot size={16} /> AI Chatbot Mode
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
            <Target size={16} /> Skill Matrix & Gap Engine
          </button>
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
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Select AI Model:</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { id: 'optra-3.6', label: 'Optra 3.6 Flash (Fast)' },
                  { id: 'gemini-pro', label: 'Gemini Pro 1.5' },
                  { id: 'deepseek-r1', label: 'DeepSeek R1 Architecture' },
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
                    background: msg.role === 'user' ? '#1A73E8' : 'linear-gradient(135deg, #1A73E8, #34A853)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: '14px', fontWeight: '700'
                  }}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>

                  <div style={{
                    maxWidth: '82%', background: msg.role === 'user' ? 'rgba(26,115,232,0.1)' : 'var(--bg-secondary)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(26,115,232,0.3)' : 'var(--border)'}`,
                    borderRadius: '16px', padding: '16px 20px', fontSize: '14px', lineHeight: '1.6',
                    color: 'var(--text-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
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
                    <RefreshCw size={14} className="spin" /> Optra AI is reasoning...
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
                    background: 'rgba(26,115,232,0.06)', border: '1px solid rgba(26,115,232,0.2)', color: '#1A73E8', cursor: 'pointer'
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
                <label title="Attach Resume or Document" style={{ cursor: 'pointer', padding: '10px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Upload size={16} color="var(--text-secondary)" />
                  <input type="file" accept=".pdf,.txt,.docx" onChange={e => e.target.files?.[0] && setAttachedFile(e.target.files[0].name)} style={{ display: 'none' }} />
                </label>

                <input
                  className="input"
                  placeholder="Ask Optra AI anything (e.g. review my resume, find jobs, system design)..."
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
            {/* Candidate Context Card */}
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

            {/* Quick Actions */}
            <div className="card">
              <div style={{ fontSize: '14px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '14px' }}>AI Shortcuts</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => handleSendMessage("Generate ATS resume for Sarvam AI")} className="btn-secondary" style={{ width: '100%', fontSize: '12px', textAlign: 'left', padding: '8px 12px' }}>
                  📝 Tailor Resume for SDE
                </button>
                <button onClick={() => handleSendMessage("Show me high-match LinkedIn jobs")} className="btn-secondary" style={{ width: '100%', fontSize: '12px', textAlign: 'left', padding: '8px 12px' }}>
                  💼 Search LinkedIn API Jobs
                </button>
                <button onClick={() => handleSendMessage("Practice system design interview questions")} className="btn-secondary" style={{ width: '100%', fontSize: '12px', textAlign: 'left', padding: '8px 12px' }}>
                  💻 Mock System Design Interview
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Skill Matrix & Gap Engine */}
      {activeTab === 'matrix' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '20px' }}>
              Your Skill Vector Radar
            </div>
            <RadarChart skills={mockStudentProfile.skills} />
          </div>

          <div className="card">
            <div style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'Space Grotesk', marginBottom: '16px' }}>
              Gap Analysis vs. Target Jobs
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { skill: 'Docker / Containerization', current: 45, needed: 75, status: 'high' },
                { skill: 'System Design (HLD)', current: 40, needed: 70, status: 'high' },
                { skill: 'FastAPI Backend', current: 75, needed: 80, status: 'ok' },
              ].map(g => (
                <div key={g.skill}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600' }}>{g.skill}</span>
                    <span style={{ fontSize: '11px', color: g.status === 'high' ? '#EA4335' : '#188038', fontWeight: '700' }}>
                      {g.status === 'high' ? '🔴 High Gap' : '✓ Good Match'}
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

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
