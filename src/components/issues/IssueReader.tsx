import React, { useState } from 'react';
import { Issue, Piece, Genre } from '../../types/magazine';
import { 
  X, ChevronLeft, ChevronRight, BookOpen, Feather, 
  Palette, Type, Sun, Moon, Coffee, Bookmark, Share2, 
  Award, Sparkles, User, Info, Check, Quote
} from 'lucide-react';

interface IssueReaderProps {
  issue: Issue;
  onClose: () => void;
  initialPieceId?: string;
}

type ReaderTheme = 'paper' | 'sepia' | 'dark';
type ReaderFont = 'serif' | 'sans';
type FontSize = 'sm' | 'base' | 'lg' | 'xl';

export const IssueReader: React.FC<IssueReaderProps> = ({ issue, onClose, initialPieceId }) => {
  const [selectedPieceIndex, setSelectedPieceIndex] = useState(() => {
    if (initialPieceId) {
      const idx = issue.pieces.findIndex(p => p.id === initialPieceId);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });

  const [activeGenreFilter, setActiveGenreFilter] = useState<Genre | 'All'>('All');
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>('paper');
  const [readerFont, setReaderFont] = useState<ReaderFont>('serif');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showToc, setShowToc] = useState(false);

  const filteredPieces = activeGenreFilter === 'All' 
    ? issue.pieces 
    : issue.pieces.filter(p => p.genre === activeGenreFilter);

  const currentPiece = issue.pieces[selectedPieceIndex] || issue.pieces[0];

  const handleNext = () => {
    if (selectedPieceIndex < issue.pieces.length - 1) {
      setSelectedPieceIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (selectedPieceIndex > 0) {
      setSelectedPieceIndex(prev => prev - 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Theme styling classes
  const themeStyles = {
    paper: 'bg-[#FAF8F5] text-[#1C1917] border-[#E7E2D8]',
    sepia: 'bg-[#F4ECD8] text-[#382E26] border-[#DECBA4]',
    dark: 'bg-[#18181B] text-[#F4F4F5] border-[#27272A]',
  }[readerTheme];

  const containerStyles = {
    paper: 'bg-white border-[#E7E2D8]',
    sepia: 'bg-[#FCF7EB] border-[#DECBA4]',
    dark: 'bg-[#27272A] border-[#3F3F46]',
  }[readerTheme];

  const fontClass = readerFont === 'serif' ? 'font-serif-editorial' : 'font-sans';

  const fontSizeClass = {
    sm: 'text-base sm:text-lg leading-relaxed',
    base: 'text-lg sm:text-xl leading-relaxed',
    lg: 'text-xl sm:text-2xl leading-loose',
    xl: 'text-2xl sm:text-3xl leading-loose',
  }[fontSize];

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${themeStyles} overflow-hidden transition-colors duration-300`}>
      
      {/* Top Reading Navigation Bar */}
      <header className={`h-16 px-4 sm:px-6 border-b flex items-center justify-between shrink-0 ${containerStyles} transition-colors`}>
        
        {/* Left: Issue Meta & TOC Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
            title="Back to Magazine"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="hidden sm:block border-l border-current/20 pl-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {issue.semester} {issue.academicYear} • Vol. {issue.volume} No. {issue.issueNumber}
            </span>
            <h1 className="text-sm font-bold truncate max-w-[200px] md:max-w-xs">
              {issue.title}
            </h1>
          </div>
        </div>

        {/* Center: Piece Selector / TOC Indicator */}
        <button
          onClick={() => setShowToc(!showToc)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 text-xs font-semibold transition"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Piece {selectedPieceIndex + 1} of {issue.pieces.length}</span>
        </button>

        {/* Right: Customization Controls (Font, Theme, Share) */}
        <div className="flex items-center gap-2">
          
          {/* Typography Switcher */}
          <div className="hidden md:flex items-center bg-black/5 dark:bg-white/10 rounded-full p-1 gap-1">
            <button
              onClick={() => setReaderFont(readerFont === 'serif' ? 'sans' : 'serif')}
              className="px-2.5 py-1 rounded-full text-xs font-semibold transition flex items-center gap-1"
              title="Toggle Serif/Sans"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="capitalize">{readerFont}</span>
            </button>

            {/* Font Size controls */}
            <div className="flex items-center border-l border-current/20 pl-1">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 text-xs rounded ${fontSize === 'sm' ? 'font-bold underline' : 'opacity-70'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-1.5 py-0.5 text-xs rounded ${fontSize === 'base' ? 'font-bold underline' : 'opacity-70'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 text-xs rounded ${fontSize === 'lg' ? 'font-bold underline' : 'opacity-70'}`}
              >
                A+
              </button>
            </div>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-full p-1 gap-1">
            <button
              onClick={() => setReaderTheme('paper')}
              className={`p-1.5 rounded-full transition ${readerTheme === 'paper' ? 'bg-white shadow text-black' : 'opacity-70'}`}
              title="Classic Paper"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setReaderTheme('sepia')}
              className={`p-1.5 rounded-full transition ${readerTheme === 'sepia' ? 'bg-[#F4ECD8] shadow text-[#382E26]' : 'opacity-70'}`}
              title="Warm Sepia"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setReaderTheme('dark')}
              className={`p-1.5 rounded-full transition ${readerTheme === 'dark' ? 'bg-[#27272A] shadow text-white' : 'opacity-70'}`}
              title="Nocturne Dark"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Share Link */}
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition text-xs flex items-center gap-1"
            title="Copy Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
          </button>

        </div>

      </header>

      {/* Main Reading Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Table of Contents Drawer */}
        {showToc && (
          <aside className={`w-80 border-r ${containerStyles} p-5 overflow-y-auto shrink-0 transition-all absolute md:relative inset-y-0 left-0 z-30 shadow-xl md:shadow-none`}>
            <div className="flex items-center justify-between pb-4 border-b border-current/10 mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider">Table of Contents</h3>
              <button onClick={() => setShowToc(false)} className="p-1 rounded-full hover:bg-black/5">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Genre Filter */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(['All', 'Poetry', 'Fiction', 'Essay', 'Visual Art'] as const).map(genre => (
                <button
                  key={genre}
                  onClick={() => setActiveGenreFilter(genre)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                    activeGenreFilter === genre
                      ? 'bg-primary text-white'
                      : 'bg-black/5 dark:bg-white/10 hover:bg-black/10'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredPieces.map((piece) => {
                const actualIndex = issue.pieces.findIndex(p => p.id === piece.id);
                const isSelected = actualIndex === selectedPieceIndex;
                return (
                  <button
                    key={piece.id}
                    onClick={() => {
                      setSelectedPieceIndex(actualIndex);
                      setShowToc(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition ${
                      isSelected
                        ? 'bg-primary/10 border border-primary font-bold'
                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] opacity-70 mb-1">
                      <span>{piece.genre}</span>
                      {piece.medium && <span>{piece.medium}</span>}
                    </div>
                    <div className="font-serif italic text-sm">{piece.title}</div>
                    <div className="text-xs opacity-80 mt-1">by {piece.author.name}</div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Center Editorial Reader Container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 py-10 md:py-16">
          <article className="max-w-2xl mx-auto space-y-8">
            
            {/* Piece Header */}
            <header className="space-y-4 border-b border-current/10 pb-8">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary-container text-primary font-bold text-xs">
                  {currentPiece.genre}
                </span>
                {currentPiece.medium && (
                  <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-medium opacity-80">
                    {currentPiece.medium}
                  </span>
                )}
                {currentPiece.awards?.map(award => (
                  <span key={award} className="px-3 py-1 rounded-full bg-secondary-container text-secondary-onContainer font-bold text-xs flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {award}
                  </span>
                ))}
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-tight">
                {currentPiece.title}
              </h1>

              {/* Author Masthead */}
              <div className="flex items-center gap-3.5 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm font-serif">
                  {currentPiece.author.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">
                    {currentPiece.author.name}
                  </h3>
                  <p className="text-xs opacity-75">
                    {currentPiece.author.grade}
                  </p>
                </div>
              </div>

            </header>

            {/* Visual Art Rendering */}
            {currentPiece.genre === 'Visual Art' && currentPiece.artUrl && (
              <div className="space-y-4 my-6">
                <div className="rounded-2xl overflow-hidden shadow-m3-3 border border-current/10 bg-black/5">
                  <img
                    src={currentPiece.artUrl}
                    alt={currentPiece.title}
                    className="w-full h-auto max-h-[600px] object-contain mx-auto"
                  />
                </div>
                <p className="text-xs text-center italic opacity-75">
                  {currentPiece.title} • {currentPiece.medium} • {currentPiece.author.name}
                </p>
              </div>
            )}

            {/* Piece Body Content */}
            <div className={`${fontClass} ${fontSizeClass} whitespace-pre-line tracking-normal space-y-4 leading-relaxed`}>
              {currentPiece.content}
            </div>

            {/* Author Bio & Statement Footer */}
            {currentPiece.author.bio && (
              <div className={`mt-14 p-5 rounded-2xl border ${containerStyles} space-y-2`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  About the Contributor
                </h4>
                <p className="text-xs font-serif-editorial leading-relaxed opacity-85">
                  {currentPiece.author.bio}
                </p>
              </div>
            )}

            {/* Bottom Navigator */}
            <nav className="pt-10 border-t border-current/10 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={selectedPieceIndex === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition ${
                  selectedPieceIndex === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 hover:scale-105 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Piece</span>
              </button>

              <span className="text-xs font-mono opacity-60">
                {selectedPieceIndex + 1} / {issue.pieces.length}
              </span>

              <button
                onClick={handleNext}
                disabled={selectedPieceIndex === issue.pieces.length - 1}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition ${
                  selectedPieceIndex === issue.pieces.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-blue-900 hover:scale-105 active:scale-95 shadow-m3-1'
                }`}
              >
                <span>Next Piece</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>

          </article>
        </main>

      </div>

    </div>
  );
};
