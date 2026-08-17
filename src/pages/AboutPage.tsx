import React from 'react';
import { EditorUser } from '../types/magazine';
import { INITIAL_EDITORS } from '../services/mockData';
import { 
  School, Sparkles, Feather, BookOpen, Award, 
  HelpCircle, CheckCircle2, Heart, Send, ShieldCheck
} from 'lucide-react';

interface AboutPageProps {
  onOpenSubmission: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenSubmission }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Intro */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container text-secondary-onContainer text-xs font-bold uppercase tracking-wider">
          <School className="w-3.5 h-3.5 text-secondary" />
          <span>Our Story & Tradition</span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl text-editorial-ink tracking-tight">
          About Our Lady Magazine
        </h1>

        <p className="text-editorial-muted text-base sm:text-lg font-serif-editorial max-w-2xl mx-auto leading-relaxed">
          Founded in 1991, <em>Our Lady Magazine</em> is the official, award-winning student literary and arts journal of Notre Dame High School.
        </p>
      </div>

      {/* Origin & Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5 bg-surface-container-lowest p-8 rounded-3xl border border-editorial-border shadow-m3-1">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Namesake & Purpose
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-editorial-ink">
            Named in Honor of Notre Dame
          </h2>
          <p className="text-sm font-serif-editorial text-editorial-muted leading-relaxed">
            Our school takes its name from Notre Dame—"Our Lady." In that same spirit of devotion to truth, contemplative beauty, and intellectual courage, the magazine was established over thirty years ago to give high school writers a sanctuary for expression.
          </p>
          <p className="text-sm font-serif-editorial text-editorial-muted leading-relaxed">
            We publish twice annually: a Fall/Winter edition reflecting on beginnings, memory, and season changes; and a Spring edition celebrating senior reflections, renewal, and graduating horizons.
          </p>
        </div>

        <div className="bg-primary-container/40 p-8 rounded-3xl border border-primary/20 space-y-6">
          <h3 className="font-display font-bold text-xl text-primary">
            Our Editorial Commitments
          </h3>
          <ul className="space-y-4 text-xs sm:text-sm text-editorial-ink">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                1
              </div>
              <div>
                <strong>Blind Peer Review:</strong> All student submissions are evaluated anonymously by student editors and faculty advisors to ensure fair and merit-based selection.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                2
              </div>
              <div>
                <strong>Interdisciplinary Synergy:</strong> We unite creative writing with classical and modern fine arts, allowing poems and paintings to converse on every page.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                3
              </div>
              <div>
                <strong>Student-Led Craft:</strong> From typography selection to cover curation and line-editing, the publication is entirely designed and curated by students.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Editorial Masthead */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Volume 34 Board
          </span>
          <h2 className="font-display font-bold text-3xl text-editorial-ink">
            Editorial Masthead (2025–2026)
          </h2>
          <p className="text-xs text-editorial-muted font-serif-editorial">
            Meet the student editors and faculty advisor behind this year’s editions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_EDITORS.map((editor) => (
            <div
              key={editor.id}
              className="bg-surface-container-lowest p-6 rounded-3xl border border-editorial-border shadow-m3-1 hover:shadow-m3-2 transition-all flex items-center gap-4"
            >
              <img
                src={editor.avatar}
                alt={editor.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20 shrink-0"
              />
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-primary text-[10px] font-bold">
                  {editor.role}
                </span>
                <h3 className="font-bold text-sm text-editorial-ink">
                  {editor.name}
                </h3>
                <p className="text-[11px] text-editorial-muted">
                  {editor.grade || 'English Faculty'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Guidelines & FAQ */}
      <div className="bg-surface-container-low p-8 sm:p-12 rounded-3xl border border-editorial-border space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Guidelines & FAQ
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-editorial-ink">
            Submitting to Our Lady Magazine
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-editorial-border space-y-2">
            <h4 className="font-bold text-editorial-ink flex items-center gap-2">
              <Feather className="w-4 h-4 text-primary" />
              Poetry Submissions
            </h4>
            <p className="text-editorial-muted font-serif-editorial leading-relaxed">
              Submit up to three poems in any form (free verse, sonnets, villanelles, haiku). Please check formatting and stanza breaks carefully.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-editorial-border space-y-2">
            <h4 className="font-bold text-editorial-ink flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Fiction & Personal Non-Fiction
            </h4>
            <p className="text-editorial-muted font-serif-editorial leading-relaxed">
              Short stories, excerpts, and personal essays up to 2,500 words. Flash fiction under 500 words is especially encouraged.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-editorial-border space-y-2">
            <h4 className="font-bold text-editorial-ink flex items-center gap-2">
              <Award className="w-4 h-4 text-secondary" />
              Visual Arts & Photography
            </h4>
            <p className="text-editorial-muted font-serif-editorial leading-relaxed">
              High-resolution scans or photographs of oil, watercolor, charcoal, printmaking, digital illustration, and 35mm film photography.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-editorial-border space-y-2">
            <h4 className="font-bold text-editorial-ink flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-secondary" />
              Who Can Submit?
            </h4>
            <p className="text-editorial-muted font-serif-editorial leading-relaxed">
              Any student currently enrolled in grades 9 through 12 at Notre Dame High School is eligible to submit work regardless of prior experience.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onOpenSubmission}
            className="px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm shadow-m3-2 hover:bg-blue-900 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-secondary-container" />
            <span>Open Student Submission Form</span>
          </button>
        </div>

      </div>

    </div>
  );
};
