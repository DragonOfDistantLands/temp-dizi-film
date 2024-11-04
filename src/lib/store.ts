import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'dark' | 'light';
  language: 'tr' | 'en';
  setTheme: (theme: 'dark' | 'light') => void;
  setLanguage: (lang: 'tr' | 'en') => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      language: 'tr',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-storage',
    }
  )
);