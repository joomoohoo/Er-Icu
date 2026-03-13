import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

type Language = 'en' | 'ar';
type Theme = 'light' | 'dark';
export type ColorScheme = 'red' | 'blue' | 'emerald' | 'purple' | 'amber';

export interface ColorSchemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}

export const colorSchemes: Record<ColorScheme, ColorSchemeConfig> = {
  red: {
    primary: '#dc2626',
    secondary: '#991b1b',
    accent: '#ef4444',
    glow: 'rgba(220, 38, 38, 0.15)'
  },
  blue: {
    primary: '#2563eb',
    secondary: '#1e3a8a',
    accent: '#3b82f6',
    glow: 'rgba(37, 99, 235, 0.15)'
  },
  emerald: {
    primary: '#059669',
    secondary: '#064e3b',
    accent: '#10b981',
    glow: 'rgba(5, 150, 105, 0.15)'
  },
  purple: {
    primary: '#9333ea',
    secondary: '#581c87',
    accent: '#a855f7',
    glow: 'rgba(147, 51, 234, 0.15)'
  },
  amber: {
    primary: '#d97706',
    secondary: '#78350f',
    accent: '#f59e0b',
    glow: 'rgba(217, 119, 6, 0.15)'
  }
};

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  activeScheme: ColorSchemeConfig;
  t: typeof translations.en;
  isOffline: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [theme] = useState<Theme>('dark');
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => (localStorage.getItem('colorScheme') as ColorScheme) || 'red');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
    const root = document.documentElement;
    const scheme = colorSchemes[colorScheme];
    root.style.setProperty('--primary-color', scheme.primary);
    root.style.setProperty('--secondary-color', scheme.secondary);
    root.style.setProperty('--accent-color', scheme.accent);
    root.style.setProperty('--glow-color', scheme.glow);
  }, [colorScheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    document.body.classList.add('dark');
    root.style.colorScheme = 'dark';
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const t = translations[lang];
  const activeScheme = colorSchemes[colorScheme];

  return (
    <AppContext.Provider value={{ lang, setLang, theme, colorScheme, setColorScheme, activeScheme, t, isOffline }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
