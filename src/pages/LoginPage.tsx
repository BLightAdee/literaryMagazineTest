import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_EDITORS } from '../services/mockData';
import { 
  ShieldCheck, Lock, Mail, ArrowRight, Sparkles, 
  School, Check, AlertCircle, KeyRound, UserCheck 
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToHome }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('editor@ourlady.edu');
  const [password, setPassword] = useState('notredame2026');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      onLoginSuccess();
    } else {
      setErrorMsg(result.message || 'Login failed. Please check credentials.');
    }
  };

  const handleQuickLogin = async (editorEmail: string) => {
    setEmail(editorEmail);
    setPassword('notredame2026');
    setIsLoading(true);
    const result = await login(editorEmail, 'notredame2026');
    setIsLoading(false);
    if (result.success) {
      onLoginSuccess();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* Top Brand Banner */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-3xl bg-primary text-white mx-auto flex items-center justify-center font-serif font-bold text-2xl shadow-m3-2">
          OL
        </div>
        <h1 className="font-display font-bold text-3xl text-editorial-ink">
          Editor Portal Login
        </h1>
        <p className="text-xs text-editorial-muted font-serif-editorial">
          Sign in to the Notre Dame High School Literary Board publishing suite
        </p>
      </div>

      {/* Main Login Form Card */}
      <div className="bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-editorial-border shadow-m3-2 space-y-6">
        
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1.5">
              School Editor Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-editorial-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="editor@ourlady.edu"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-lowest border border-editorial-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-editorial-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-lowest border border-editorial-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-full bg-primary text-white font-semibold text-xs sm:text-sm shadow-m3-2 hover:bg-blue-900 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-secondary-container" />
                <span>Enter Publishing Studio</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Quick-Pills */}
        <div className="border-t border-editorial-border pt-5 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-editorial-muted uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Instant Demo Logins:</span>
          </div>

          <div className="space-y-2">
            {INITIAL_EDITORS.slice(0, 3).map((ed) => (
              <button
                key={ed.id}
                type="button"
                onClick={() => handleQuickLogin(ed.email)}
                className="w-full p-2.5 rounded-2xl bg-surface-container-lowest border border-editorial-border/80 hover:border-primary/50 hover:bg-surface-container transition flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <img src={ed.avatar} alt={ed.name} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-editorial-ink group-hover:text-primary transition-colors">
                      {ed.name}
                    </p>
                    <p className="text-[10px] text-editorial-muted">{ed.role}</p>
                  </div>
                </div>
                <UserCheck className="w-3.5 h-3.5 text-primary opacity-60 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="text-center">
        <button
          onClick={onBackToHome}
          className="text-xs font-medium text-editorial-muted hover:text-primary transition"
        >
          &larr; Return to Public Magazine Home
        </button>
      </div>

    </div>
  );
};
