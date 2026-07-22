'use client';
import { useState } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Globe } from 'lucide-react';

export const LANGUAGES = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'hi-IN', name: 'Hindi (हिंदी)' },
  { code: 'ta-IN', name: 'Tamil (தமிழ்)' },
  { code: 'te-IN', name: 'Telugu (తెలుగు)' },
  { code: 'kn-IN', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ml-IN', name: 'Malayalam (മലയാളം)' },
  { code: 'bn-IN', name: 'Bengali (বাংলা)' },
  { code: 'es-ES', name: 'Spanish (Español)' },
  { code: 'fr-FR', name: 'French (Français)' },
];

// Selects the best available female voice for the given language
function getBestFemaleVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const langCode = lang.split('-')[0];

  // Priority: exact female voice for the language → any voice for the language → any female
  const preferredFemaleNames = [
    'google uk english female', 'microsoft zira', 'samantha', 'aria',
    'hazel', 'moira', 'tessa', 'female', 'femme', 'woman',
  ];

  // Try to find a female voice matching the language
  for (const preferred of preferredFemaleNames) {
    const match = voices.find(v =>
      v.lang.toLowerCase().startsWith(langCode) &&
      v.name.toLowerCase().includes(preferred)
    );
    if (match) return match;
  }

  // Fallback: any voice for the language
  const langMatch = voices.find(v => v.lang.toLowerCase().startsWith(langCode));
  if (langMatch) return langMatch;

  // Last resort: any English female
  return voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ?? null;
}

export function speakText(text: string, lang: string = 'en-US') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  // Strip markdown and links for clean audio
  const cleanText = text
    .replace(/[*#`_~]/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang;
  utterance.rate = 0.95;
  utterance.pitch = 1.25; // Slightly higher pitch for a natural female tone

  const doSpeak = () => {
    const voice = getBestFemaleVoice(lang);
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', doSpeak, { once: true });
  } else {
    doSpeak();
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function startListening(
  lang: string,
  onResult: (transcript: string) => void,
  onStateChange: (listening: boolean) => void
) {
  if (typeof window === 'undefined') return;
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) {
    alert('Speech recognition is not supported in this browser. Please type your query.');
    return;
  }
  const recognition = new SR();
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onstart = () => onStateChange(true);
  recognition.onresult = (e: any) => {
    onResult(e.results[0][0].transcript);
    onStateChange(false);
  };
  recognition.onerror = () => onStateChange(false);
  recognition.onend = () => onStateChange(false);
  try { recognition.start(); } catch { onStateChange(false); }
}

export default function VoiceoverAssistant({
  currentLanguage,
  onLanguageChange,
  onVoiceInput,
  textToSpeak,
}: {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onVoiceInput?: (transcript: string) => void;
  textToSpeak?: string;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (textToSpeak) {
      speakText(textToSpeak, currentLanguage);
      setIsSpeaking(true);
    }
  };

  const handleMicClick = () => {
    if (isListening) { setIsListening(false); return; }
    if (onVoiceInput) {
      startListening(currentLanguage, onVoiceInput, setIsListening);
    }
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '20px', border: '1px solid var(--border)' }}>
      {/* Language Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Globe size={14} color="#1A73E8" />
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          style={{
            background: 'transparent', border: 'none', color: 'var(--text-primary)',
            fontSize: '12px', fontWeight: '600', outline: 'none', cursor: 'pointer'
          }}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
      </div>

      {/* Speaker Button */}
      {textToSpeak && (
        <button
          onClick={toggleSpeech}
          title={isSpeaking ? 'Stop Voiceover' : 'Read Response Aloud (Female Voice)'}
          style={{
            background: isSpeaking ? '#188038' : 'rgba(26,115,232,0.1)',
            border: 'none', borderRadius: '50%', width: '28px', height: '28px',
            color: isSpeaking ? 'white' : '#1A73E8', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      )}

      {/* Mic Input Button */}
      {onVoiceInput && (
        <button
          onClick={handleMicClick}
          title={isListening ? 'Listening... Speak now' : 'Speak query via microphone'}
          style={{
            background: isListening ? '#EA4335' : 'rgba(26,115,232,0.1)',
            border: 'none', borderRadius: '50%', width: '28px', height: '28px',
            color: isListening ? 'white' : '#1A73E8', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: isListening ? 'pulseGlow 1s infinite' : 'none',
          }}
        >
          {isListening ? <MicOff size={14} /> : <Mic size={14} />}
        </button>
      )}
    </div>
  );
}
