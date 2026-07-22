'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ChevronDown, RefreshCw } from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi Rahul! 👋 I am Optra AI, your personal career assistant powered by Google AI. Ask me anything about your Optra score, LinkedIn/Unstop jobs, or resume analysis!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI Response Engine
    setTimeout(() => {
      let aiContent = "";
      const lower = userMessage.content.toLowerCase();

      if (lower.includes('whatsapp') || lower.includes('otp')) {
        aiContent = "💬 WhatsApp Verification alert sent! Check your phone (+91 98765 43210) for your 6-digit OTP code (849201).";
      } else if (lower.includes('score') || lower.includes('optra')) {
        aiContent = "Your current Optra Score is 782/1000 (Top 5% Applicant Pool). Upload your updated resume on the Dashboard to recalculate!";
      } else if (lower.includes('job') || lower.includes('linkedin') || lower.includes('unstop')) {
        aiContent = "I found 3 active openings matching your stack: 1) Google India SDE (LinkedIn API), 2) Flipkart GRiD 7.0 (Unstop API), 3) Microsoft Frontend Intern. Check the Explore tab!";
      } else if (lower.includes('roadmap')) {
        aiContent = "Your 3-day roadmap: Day 1: Master Docker containerization. Day 2: Practice System Design HLD. Day 3: Apply to top LinkedIn remote roles.";
      } else {
        aiContent = "Great question! I've updated your career vector matrix. Would you like me to tailor your ATS resume or search live LinkedIn jobs?";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '62px',
            height: '62px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A73E8, #34A853)',
            color: 'white',
            border: 'none',
            boxShadow: '0 8px 30px rgba(26,115,232,0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
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
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '390px',
          height: '620px',
          maxHeight: '82vh',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #1A73E8, #34A853)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '8px',
                borderRadius: '12px'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px', fontFamily: 'Space Grotesk' }}>Optra AI Assistant</div>
                <div style={{ fontSize: '11px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FFCC', boxShadow: '0 0 6px #00FFCC' }} />
                  Google AI Engine Active
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex'
              }}
            >
              <ChevronDown size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'var(--bg-secondary)'
          }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                display: 'flex',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                gap: '10px',
                alignItems: 'flex-start'
              }}>
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #1A73E8, #34A853)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}>
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
                  maxWidth: '82%',
                  fontSize: '13.5px',
                  lineHeight: '1.5',
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
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  Optra AI is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            <button onClick={() => handleSend("Calculate my Optra Score")} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', background: 'rgba(26,115,232,0.1)', border: '1px solid rgba(26,115,232,0.3)', color: '#1A73E8', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              📊 Optra Score
            </button>
            <button onClick={() => handleSend("Test WhatsApp alert")} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#188038', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              💬 WhatsApp Alert
            </button>
            <button onClick={() => handleSend("Show LinkedIn & Unstop jobs")} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', background: 'rgba(26,115,232,0.1)', border: '1px solid rgba(26,115,232,0.3)', color: '#1A73E8', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              💼 LinkedIn Jobs
            </button>
          </div>

          {/* Input Area */}
          <div style={{
            padding: '12px 16px',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              padding: '6px 14px',
              borderRadius: '24px',
            }}>
              <input
                type="text"
                placeholder="Ask Optra AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px'
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? '#1A73E8' : 'var(--border)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: input.trim() ? 'pointer' : 'default',
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
