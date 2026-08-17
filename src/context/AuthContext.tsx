import React, { createContext, useContext, useState, useEffect } from 'react';
import { EditorUser } from '../types/magazine';
import { INITIAL_EDITORS } from '../services/mockData';
import { storage } from '../services/storage';

interface AuthContextType {
  currentUser: EditorUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  availableEditors: EditorUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<EditorUser | null>(null);

  useEffect(() => {
    const session = storage.getSession();
    if (session) {
      setCurrentUser(session);
    }
  }, []);

  const login = async (email: string, _pass: string): Promise<{ success: boolean; message?: string }> => {
    // Simulated realistic delay for smooth transition
    await new Promise(res => setTimeout(res, 400));

    const normalized = email.trim().toLowerCase();
    const matched = INITIAL_EDITORS.find(ed => ed.email.toLowerCase() === normalized);

    if (matched) {
      setCurrentUser(matched);
      storage.setSession(matched);
      return { success: true };
    }

    // Allow any other @ourlady.edu or demo test
    if (normalized.includes('@')) {
      const customUser: EditorUser = {
        id: `editor-${Date.now()}`,
        email: normalized,
        name: normalized.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: 'Managing Editor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };
      setCurrentUser(customUser);
      storage.setSession(customUser);
      return { success: true };
    }

    return { success: false, message: 'Invalid credentials. Please use an editor email.' };
  };

  const logout = () => {
    setCurrentUser(null);
    storage.setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
        availableEditors: INITIAL_EDITORS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
