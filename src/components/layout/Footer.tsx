import React from 'react';
import { Heart, Sparkles, BookOpen, Feather, School, Compass, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'issues' | 'about' | 'editor' | 'login') => void;
  onOpenSubmission?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSubmission }) => {
  return (
    <footer className="bg-surface-container border-t border-editorial-border mt-20 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-editorial-border/80">
          
          {/* Col 1: About Magazine */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-serif font-bold text-lg shadow-m3-1">
                OL
              </div>
              <h3 className="font-display font-bold text-2xl text-editorial-ink tracking-tight">
                Our Lady <span className="font-serif italic font-normal text-primary">Magazine</span>
              </h3>
            </div>
            <p className="text-editorial-muted text-sm leading-relaxed max-w-md">
              The premier student-run literary & arts publication of Notre Dame High School. Dedicated to amplifying youth voices across poetry, short fiction, personal essays, and classical/digital arts.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-primary">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-primary">
                <School className="w-3.5 h-3.5" />
                Notre Dame High School
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-secondary-onContainer">
                <Sparkles className="w-3.5 h-3.5" />
                Est. 1991
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-semibold text-editorial-ink text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="text-editorial-muted hover:text-primary transition flex items-center gap-2"
                >
                  <Feather className="w-3.5 h-3.5 text-secondary" />
                  Latest Issue Showcase
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('issues')} 
                  className="text-editorial-muted hover:text-primary transition flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-secondary" />
                  Archive of Editions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="text-editorial-muted hover:text-primary transition flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-secondary" />
                  Masthead & Mission
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('login')} 
                  className="text-editorial-muted hover:text-primary transition flex items-center gap-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-primary" />
                  Editor Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Submissions Callout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-editorial-ink text-sm tracking-wider uppercase">
              Student Submissions
            </h4>
            <p className="text-editorial-muted text-xs leading-relaxed">
              We accept poetry, flash fiction, personal non-fiction, photography, and paintings from all enrolled students every semester.
            </p>
            {onOpenSubmission && (
              <button
                onClick={onOpenSubmission}
                className="w-full py-2.5 px-4 rounded-full bg-primary text-white text-xs font-semibold hover:bg-blue-900 shadow-m3-1 hover:shadow-m3-2 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Feather className="w-3.5 h-3.5 text-secondary-container" />
                Submit Your Work
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar & Vibe Coded Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-editorial-muted">
          <div>
            &copy; {new Date().getFullYear()} Our Lady Magazine • Notre Dame High School Literary Board. All rights reserved.
          </div>

          {/* Mandatory Vibe Coded Disclaimer Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-highest/80 border border-editorial-border font-medium text-editorial-ink text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Crafted with passion • <strong>Vibe Coded</strong> with Material 3 Expressive</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
