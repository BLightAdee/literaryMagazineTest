import React, { useState, useMemo } from 'react';
import { Issue } from '../types/magazine';
import { IssueCard } from '../components/issues/IssueCard';
import { Search, Filter, BookOpen, Calendar, Sparkles, Layers, RotateCcw } from 'lucide-react';

interface IssuesPageProps {
  issues: Issue[];
  onReadIssue: (issue: Issue) => void;
}

export const IssuesPage: React.FC<IssuesPageProps> = ({ issues, onReadIssue }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  // Extract unique academic years for filtering
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    issues.forEach(i => years.add(i.academicYear));
    return ['All', ...Array.from(years)];
  }, [issues]);

  // Filter issues and ensure sorted by most recent
  const filteredIssues = useMemo(() => {
    return issues
      .filter(issue => {
        // Status filter: only published for public
        if (issue.status !== 'published') return false;

        // Semester filter
        if (selectedSemester !== 'All' && issue.semester !== selectedSemester) {
          return false;
        }

        // Year filter
        if (selectedYear !== 'All' && issue.academicYear !== selectedYear) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = issue.title.toLowerCase().includes(q);
          const matchTheme = issue.theme.toLowerCase().includes(q);
          const matchForeword = issue.foreword.toLowerCase().includes(q);
          const matchPieces = issue.pieces.some(p => 
            p.title.toLowerCase().includes(q) || 
            p.author.name.toLowerCase().includes(q) ||
            p.genre.toLowerCase().includes(q)
          );
          return matchTitle || matchTheme || matchForeword || matchPieces;
        }

        return true;
      })
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  }, [issues, searchQuery, selectedSemester, selectedYear]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSemester('All');
    setSelectedYear('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container text-primary text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Complete Collection</span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl text-editorial-ink tracking-tight">
          Archive of Editions
        </h1>

        <p className="text-editorial-muted text-sm sm:text-base font-serif-editorial max-w-2xl mx-auto leading-relaxed">
          Browse through all published volumes of <em>Our Lady Magazine</em>, organized chronologically by most recent release. Explore decades of student poems, short stories, and artwork.
        </p>
      </div>

      {/* Material 3 Expressive Search & Filter Bar */}
      <div className="bg-surface-container-low p-4 sm:p-5 rounded-3xl border border-editorial-border shadow-m3-1 space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-editorial-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, theme, author name, or poem..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container-lowest border border-editorial-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm outline-none transition"
            />
          </div>

          {/* Semester Pill Selectors */}
          <div className="md:col-span-4 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['All', 'Fall', 'Winter', 'Spring'].map(semester => (
              <button
                key={semester}
                onClick={() => setSelectedSemester(semester)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  selectedSemester === semester
                    ? 'bg-primary text-white shadow-m3-1'
                    : 'bg-surface-container text-editorial-muted hover:text-editorial-ink'
                }`}
              >
                {semester}
              </button>
            ))}
          </div>

          {/* Academic Year Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl bg-surface-container-lowest border border-editorial-border text-xs font-semibold text-editorial-ink outline-none"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year === 'All' ? 'All Years' : year}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Results summary & Active filter tags */}
        <div className="flex items-center justify-between text-xs text-editorial-muted pt-2 border-t border-editorial-border/60">
          <span>
            Showing <strong>{filteredIssues.length}</strong> {filteredIssues.length === 1 ? 'edition' : 'editions'} (sorted by most recent)
          </span>

          {(searchQuery || selectedSemester !== 'All' || selectedYear !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset filters
            </button>
          )}
        </div>

      </div>

      {/* Issues Grid */}
      {filteredIssues.length === 0 ? (
        <div className="bg-surface-container-low rounded-3xl p-12 text-center border border-editorial-border space-y-4">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary mx-auto flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-editorial-ink">No editions matched your search</h3>
          <p className="text-xs text-editorial-muted font-serif-editorial max-w-sm mx-auto">
            Try adjusting your search terms or clearing your semester filter to view past volumes.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold shadow-m3-1"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onReadIssue={onReadIssue}
            />
          ))}
        </div>
      )}

    </div>
  );
};
