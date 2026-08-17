import React from 'react';
import { Issue } from '../../types/magazine';
import { Calendar, BookOpen, Feather, Sparkles, ArrowRight, Palette, Award } from 'lucide-react';

interface IssueCardProps {
  issue: Issue;
  onReadIssue: (issue: Issue) => void;
  featured?: boolean;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onReadIssue, featured = false }) => {
  const poetryCount = issue.pieces.filter(p => p.genre === 'Poetry').length;
  const fictionCount = issue.pieces.filter(p => p.genre === 'Fiction' || p.genre === 'Essay' || p.genre === 'Non-Fiction').length;
  const artCount = issue.pieces.filter(p => p.genre === 'Visual Art').length;

  if (featured) {
    return (
      <div className="relative bg-surface-container-low rounded-3xl border border-editorial-border overflow-hidden shadow-m3-2 hover:shadow-m3-hover transition-all duration-500 group">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* Cover Art Box */}
          <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-[460px] overflow-hidden bg-editorial-ink">
            <img
              src={issue.coverImage}
              alt={issue.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            {/* Badges on Cover */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-secondary text-white font-bold text-xs shadow-m3-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Latest Edition
              </span>
              <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white font-medium text-xs border border-white/20">
                Vol. {issue.volume} • No. {issue.issueNumber}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs text-white/80 font-medium">Cover Art by</p>
              <p className="text-sm font-semibold tracking-wide flex items-center gap-1.5 text-secondary-container">
                <Palette className="w-3.5 h-3.5" />
                {issue.coverArtist}
              </p>
            </div>
          </div>

          {/* Details & Contents Box */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="flex items-center gap-3 text-xs font-semibold text-editorial-muted uppercase tracking-wider">
                <span className="inline-flex items-center gap-1 text-primary">
                  <Calendar className="w-3.5 h-3.5" />
                  {issue.semester} {issue.academicYear}
                </span>
                <span>•</span>
                <span>Theme: {issue.theme}</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl text-editorial-ink leading-tight tracking-tight">
                {issue.title}
              </h2>

              <p className="text-editorial-muted text-sm sm:text-base font-serif-editorial leading-relaxed line-clamp-3">
                "{issue.foreword}"
              </p>

              {/* Contents Pill Counter */}
              <div className="flex flex-wrap gap-2 pt-2">
                {poetryCount > 0 && (
                  <span className="px-3 py-1 rounded-full bg-primary-container text-primary text-xs font-semibold flex items-center gap-1.5">
                    <Feather className="w-3 h-3" />
                    {poetryCount} {poetryCount === 1 ? 'Poem' : 'Poems'}
                  </span>
                )}
                {fictionCount > 0 && (
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-secondary-onContainer text-xs font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" />
                    {fictionCount} {fictionCount === 1 ? 'Story' : 'Stories'}
                  </span>
                )}
                {artCount > 0 && (
                  <span className="px-3 py-1 rounded-full bg-tertiary-container text-tertiary-onContainer text-xs font-semibold flex items-center gap-1.5">
                    <Palette className="w-3 h-3" />
                    {artCount} {artCount === 1 ? 'Artwork' : 'Artworks'}
                  </span>
                )}
              </div>

              {/* Sample Works Preview */}
              <div className="border-t border-editorial-border/60 pt-4 space-y-2">
                <p className="text-xs font-bold text-editorial-muted uppercase tracking-wider">Featured Pieces Inside:</p>
                <div className="space-y-1.5">
                  {issue.pieces.slice(0, 3).map(piece => (
                    <div key={piece.id} className="flex items-center justify-between text-xs text-editorial-ink py-1">
                      <span className="font-serif italic font-medium truncate max-w-[240px] sm:max-w-xs">
                        "{piece.title}"
                      </span>
                      <span className="text-editorial-muted text-[11px] shrink-0 font-medium">
                        by {piece.author.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Read Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => onReadIssue(issue)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-blue-900 shadow-m3-2 hover:shadow-m3-3 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 group/btn"
              >
                <span>Read Full Issue</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // Standard Archive Card
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-editorial-border overflow-hidden shadow-m3-1 hover:shadow-m3-hover transition-all duration-400 hover:-translate-y-1.5 flex flex-col group">
      
      {/* Cover Image Header */}
      <div className="relative h-56 overflow-hidden bg-editorial-ink">
        <img
          src={issue.coverImage}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white font-medium text-xs border border-white/20">
            Vol. {issue.volume} • No. {issue.issueNumber}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-[11px] text-white/80 font-medium">{issue.semester} {issue.academicYear}</p>
          <h3 className="font-display font-bold text-lg text-white truncate">
            {issue.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-primary">
            Theme: <span className="text-editorial-ink font-normal">{issue.theme}</span>
          </div>
          <p className="text-xs text-editorial-muted font-serif-editorial line-clamp-3 leading-relaxed">
            {issue.foreword}
          </p>
        </div>

        {/* Footer Meta & Button */}
        <div className="pt-3 border-t border-editorial-border/60 flex items-center justify-between">
          <span className="text-xs text-editorial-muted font-medium">
            {issue.pieces.length} {issue.pieces.length === 1 ? 'piece' : 'pieces'}
          </span>

          <button
            onClick={() => onReadIssue(issue)}
            className="px-4 py-2 rounded-full bg-primary-container text-primary font-semibold text-xs hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-1.5"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
