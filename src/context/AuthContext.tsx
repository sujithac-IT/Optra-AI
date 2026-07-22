'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Certificate = {
  name: string;
  fileName: string;
  dataUrl: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  college?: string;
  year?: string;
  skills: string[];
  certificates: Certificate[];
  language: string;
  optraScore: number;
};

type AuthContextType = {
  user: UserProfile | null;
  isLoading: boolean;
  login: (profile: UserProfile) => void;
  logout: () => void;
  updateLanguage: (lang: string) => void;
  updateSkills: (skills: string[]) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  updateLanguage: () => {},
  updateSkills: () => {},
});

const STORAGE_KEY = 'optra_user_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateLanguage = (lang: string) => {
    if (!user) return;
    const updated = { ...user, language: lang };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateSkills = (skills: string[]) => {
    if (!user) return;
    const updated = { ...user, skills };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateLanguage, updateSkills }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  return useContext(AuthContext);
}

// Get user initials for avatar
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join('');
}
