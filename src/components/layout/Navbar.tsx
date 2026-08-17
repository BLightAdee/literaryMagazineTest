import React, { useState } from 'react';
import { BookOpen, Sparkles, LogIn, LogOut, PlusCircle, Search, Feather, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPage: 'home' | 'issues' | 'about' | 'editor' | 'login';
  onNavigate: (page: 'home' | 'issues' | 'about' | 'editor' | 'login') => void;
  onOpenNewIssueModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenNewIssueModal }) => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Feather },
    { id: 'issues', label: 'All Issues', icon: BookOpen },
    { id: 'about', label: 'About & Masthead', icon: Sparkles },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-editorial-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Monogram */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-m3-2 group-hover:scale-105 group-active:scale-95 transition-all duration-300 var(--ease-spring-bounce)">
              <span className="font-serif font-bold text-xl tracking-tighter">OL</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl sm:text-2xl text-editorial-ink tracking-tight flex items-center gap-1.5">
                Our Lady <span className="font-serif italic font-normal text-primary">Magazine</span>
              </span>
              <p className="text-[11px] font-medium tracking-wider uppercase text-editorial-muted">
                Notre Dame Literary Journal • Est. 1991
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Material 3 Expressive Pill Container */}
          <nav className="hidden md:flex items-center gap-1.5 bg-surface-container/70 p-1.5 rounded-full border border-editorial-border/60 shadow-inner">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-white shadow-m3-2 font-semibold'
                      : 'text-editorial-muted hover:text-editorial-ink hover:bg-surface-container-high/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-secondary-container' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('editor')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    currentPage === 'editor'
                      ? 'bg-secondary text-white shadow-m3-2'
                      : 'bg-secondary-container text-secondary-onContainer hover:bg-amber-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  Editor Studio
                </button>

                {onOpenNewIssueModal && (
                  <button
                    onClick={onOpenNewIssueModal}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-blue-900 shadow-m3-1 transition-all"
                  >
                    <PlusCircle className="w-4 h-4" />
                    New Issue
                  </button>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-editorial-border">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-8 h-8 rounded-full border border-primary/20 object-cover"
                  />
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-2 rounded-full text-editorial-muted hover:text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-editorial-border bg-surface-container-low text-editorial-ink text-sm font-medium hover:bg-surface-container-high hover:border-primary/30 transition-all duration-300"
              >
                <LogIn className="w-4 h-4 text-primary" />
                Editor Portal
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-surface-container text-editorial-ink hover:bg-surface-container-high"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-editorial-border space-y-2 bg-surface/95 backdrop-blur rounded-2xl mb-3 px-3 shadow-m3-3">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left font-medium text-sm ${
                  currentPage === item.id
                    ? 'bg-primary text-white'
                    : 'text-editorial-ink hover:bg-surface-container'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-editorial-border mt-2">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onNavigate('editor');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-secondary-container text-secondary-onContainer font-semibold text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Editor Studio
                    </span>
                    <span className="text-xs text-editorial-muted">{currentUser?.role}</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out ({currentUser?.name})
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-editorial-ink text-sm font-semibold"
                >
                  <LogIn className="w-4 h-4 text-primary" />
                  Editor Portal Login
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
