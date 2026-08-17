import React from 'react';
import { Issue, Piece } from '../types/magazine';
import { IssueCard } from '../components/issues/IssueCard';
import { 
  Sparkles, Feather, BookOpen, Compass, ArrowRight, 
  Quote, Award, Heart, School, Send, Calendar, Check
} from 'lucide-react';

interface HomePageProps {
  issues: Issue[];
  onReadIssue: (issue: Issue, pieceId?: string) => void;
  onNavigate: (page: 'home' | 'issues' | 'about' | 'editor' | 'login') => void;
  onOpenSubmission: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  issues,
  onReadIssue,
  onNavigate,
  onOpenSubmission,
}) => {
  const latestIssue = issues.find(i => i.status === 'published') || issues[0];
  const recentIssues = issues.filter(i => i.id !== latestIssue?.id).slice(0, 3);
  const featuredPieces = latestIssue?.pieces || [];

  return (
    <div className="space-y-20 sm:space-y-24 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tagline Pill */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-secondary-onContainer text-xs font-bold tracking-wide shadow-sm hover:scale-105 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Notre Dame High School • Volume 34 (2025–2026)</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl text-editorial-ink tracking-tight leading-[1.15]">
              Where High School Voices <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-primary">Echo in Print & Light</span>
            </h1>

            <p className="text-editorial-muted text-base sm:text-lg font-serif-editorial max-w-2xl mx-auto leading-relaxed">
              Official literary and visual arts journal of Notre Dame High School. Dedicated to craft, inquiry, and the sacred beauty of student storytelling.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {latestIssue && (
                <button
                  onClick={() => onReadIssue(latestIssue)}
                  className="px-7 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-blue-900 shadow-m3-2 hover:shadow-m3-3 active:scale-95 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-secondary-container" />
                  <span>Read Current Issue</span>
                </button>
              )}
              <button
                onClick={onOpenSubmission}
                className="px-6 py-3.5 rounded-full bg-surface-container-high text-editorial-ink font-semibold text-sm hover:bg-surface-container-highest border border-editorial-border transition-all flex items-center gap-2"
              >
                <Feather className="w-4 h-4 text-primary" />
                <span>Submit Work</span>
              </button>
            </div>
          </div>

          {/* LATEST ISSUE HERO SHOWCASE */}
          {latestIssue && (
            <div className="mt-8">
              <IssueCard issue={latestIssue} onReadIssue={onReadIssue} featured={true} />
            </div>
          )}

        </div>
      </section>

      {/* FEATURED WORKS SECTION */}
      {featuredPieces.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                <Feather className="w-3.5 h-3.5" />
                <span>Selections from Vol. {latestIssue.volume} No. {latestIssue.issueNumber}</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-editorial-ink">
                Featured Student Pieces
              </h2>
            </div>

            <button
              onClick={() => onReadIssue(latestIssue)}
              className="text-xs font-bold text-primary hover:text-blue-800 flex items-center gap-1 group"
            >
              <span>Explore full table of contents</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPieces.slice(0, 3).map((piece) => (
              <div
                key={piece.id}
                onClick={() => onReadIssue(latestIssue, piece.id)}
                className="bg-surface-container-lowest p-6 rounded-3xl border border-editorial-border shadow-m3-1 hover:shadow-m3-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary-container text-primary font-bold text-xs">
                      {piece.genre}
                    </span>
                    {piece.readingTimeMinutes && (
                      <span className="text-[11px] text-editorial-muted">
                        {piece.readingTimeMinutes} min read
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif italic font-bold text-xl text-editorial-ink group-hover:text-primary transition-colors">
                    "{piece.title}"
                  </h3>

                  {piece.excerpt && (
                    <p className="text-xs text-editorial-muted font-serif-editorial leading-relaxed line-clamp-3">
                      {piece.excerpt}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-editorial-border/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-editorial-ink">{piece.author.name}</p>
                    <p className="text-[11px] text-editorial-muted">{piece.author.grade}</p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-surface-container-high group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      )}

      {/* ARCHIVE SPOTLIGHT SECTION */}
      {recentIssues.length > 0 && (
        <section className="bg-surface-container/60 py-16 border-y border-editorial-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Past Editions
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-editorial-ink">
                  Recent Magazine Archive
                </h2>
              </div>

              <button
                onClick={() => onNavigate('issues')}
                className="px-5 py-2 rounded-full bg-surface text-editorial-ink font-semibold text-xs border border-editorial-border hover:bg-surface-container-high transition flex items-center gap-1.5"
              >
                <span>View All ({issues.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue} onReadIssue={onReadIssue} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDITORIAL TRADITION & HERITAGE CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 shadow-m3-3 relative overflow-hidden">
          
          {/* Subtle Background Monogram */}
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 font-serif font-bold text-9xl select-none pointer-events-none">
            ND
          </div>

          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur text-white text-xs font-semibold">
              <School className="w-3.5 h-3.5 text-secondary-container" />
              <span>The Notre Dame Literary Tradition</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
              "To write is to discover the light waiting within our quietest corners."
            </h2>

            <p className="text-blue-100 text-sm sm:text-base font-serif-editorial leading-relaxed">
              Named after the Mother of Grace and the patroness of our school, <em>Our Lady Magazine</em> has published over thirty volumes of student-authored prose, sonnets, essays, and fine art since 1991. Every piece is curated and produced entirely by student editors.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 rounded-full bg-white text-primary font-semibold text-xs hover:bg-blue-50 shadow-m3-2 transition-all flex items-center gap-2"
              >
                <span>Read About Our Masthead & History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
