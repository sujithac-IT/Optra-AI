'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, ChevronDown } from 'lucide-react';

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
      content: 'Hi! I am Optra AI, your personal career assistant. How can I help you today? You can ask me to find internships, review your resume, or suggest hackathons.'
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

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your profile, I recommend looking at the 'Explore' section.",
        "I can help with that. Are you looking for roles in Frontend, Backend, or AI/ML?",
        "I found 3 new hackathons that perfectly match your tech stack. Let me know if you want the links!",
        "Your resume looks solid, but adding more metrics to your work experience could boost your ATS score."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      let aiContent = randomResponse;
      if (userMessage.content.toLowerCase().includes('internship')) {
        aiContent = "I see you're looking for internships. I've updated your Explore feed with the latest Software Engineering internships. Should we filter by remote only?";
      } else if (userMessage.content.toLowerCase().includes('hackathon')) {
        aiContent = "Hackathons are great for building your portfolio. ETHIndia and Smart India Hackathon registrations are currently open!";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--indigo), var(--cyan))',
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
          width: '380px',
          height: '600px',
          maxHeight: '80vh',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, var(--indigo), var(--cyan))',
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
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '15px' }}>Optra AI</div>
                <div style={{ fontSize: '12px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 5px #10B981' }} />
                  Online
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
                display: 'flex',
                opacity: 0.8,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
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
                gap: '12px',
                alignItems: 'flex-end'
              }}>
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, var(--indigo), var(--cyan))',
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
                  background: msg.role === 'user' ? 'var(--indigo)' : 'var(--bg-card)',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                  maxWidth: '80%',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  boxShadow: msg.role === 'user' ? '0 4px 12px rgba(26,115,232,0.2)' : '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--indigo), var(--cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <Bot size={16} />
                </div>
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  padding: '16px',
                  borderRadius: '16px',
                  borderBottomLeftRadius: '4px',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center'
                }}>
                  <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', animation: 'typing 1.4s infinite 0s' }} />
                  <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', animation: 'typing 1.4s infinite 0.2s' }} />
                  <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', animation: 'typing 1.4s infinite 0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              padding: '8px 16px',
              borderRadius: '24px',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--indigo)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            >
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
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? 'var(--indigo)' : 'var(--border)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: input.trim() ? 'pointer' : 'default',
                  transition: 'background 0.3s, transform 0.2s',
                  transform: input.trim() ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <Send size={14} style={{ marginLeft: '2px' }} />
              </button>
            </div>
            <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Optra AI can make mistakes. Check important info.
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes typing {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
