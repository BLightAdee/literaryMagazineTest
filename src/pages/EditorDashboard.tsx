import React, { useState } from 'react';
import { Issue, SubmissionDraft } from '../types/magazine';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';
import { 
  PlusCircle, Edit3, Trash2, Globe, Eye, EyeOff, 
  Layers, Feather, Sparkles, BookOpen, Inbox, 
  User, CheckCircle, Clock, ShieldCheck, RefreshCw
} from 'lucide-react';

interface EditorDashboardProps {
  issues: Issue[];
  onRefreshIssues: () => void;
  onOpenCreateIssue: () => void;
  onEditIssue: (issue: Issue) => void;
  onPreviewIssue: (issue: Issue) => void;
}

export const EditorDashboard: React.FC<EditorDashboardProps> = ({
  issues,
  onRefreshIssues,
  onOpenCreateIssue,
  onEditIssue,
  onPreviewIssue,
}) => {
  const { currentUser } = useAuth();
  const [activeView, setActiveView] = useState<'issues' | 'submissions'>('issues');
  const submissions = storage.getSubmissions();

  const totalPieces = issues.reduce((acc, i) => acc + i.pieces.length, 0);
  const publishedCount = issues.filter(i => i.status === 'published').length;
  const draftCount = issues.filter(i => i.status === 'draft').length;

  const handleToggleStatus = (issue: Issue) => {
    const nextStatus = issue.status === 'published' ? 'draft' : 'published';
    storage.updateIssue(issue.id, { status: nextStatus });
    onRefreshIssues();
  };

  const handleDeleteIssue = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      storage.deleteIssue(id);
      onRefreshIssues();
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset issues archive to original factory default editions?')) {
      storage.resetToDefault();
      onRefreshIssues();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editor Welcome Banner */}
      <div className="bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-editorial-border shadow-m3-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-primary shadow-m3-1"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-secondary-container text-secondary-onContainer text-[11px] font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              <span>{currentUser?.role}</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-editorial-ink">
              Welcome, {currentUser?.name}
            </h1>
            <p className="text-xs text-editorial-muted">
              Notre Dame Literary Board • Production Control Suite
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCreateIssue}
            className="px-6 py-3 rounded-full bg-primary text-white font-semibold text-xs sm:text-sm hover:bg-blue-900 shadow-m3-2 active:scale-95 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-secondary-container" />
            <span>New Issue Edition</span>
          </button>
          
          <button
            onClick={handleResetData}
            title="Reset to initial default editions"
            className="p-3 rounded-full bg-surface-container border border-editorial-border text-editorial-muted hover:text-editorial-ink transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-editorial-border shadow-m3-1 space-y-1">
          <span className="text-xs font-bold text-editorial-muted uppercase tracking-wider">Total Editions</span>
          <p className="font-display font-bold text-3xl text-editorial-ink">{issues.length}</p>
          <p className="text-[11px] text-editorial-muted">{publishedCount} live, {draftCount} in draft</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-editorial-border shadow-m3-1 space-y-1">
          <span className="text-xs font-bold text-editorial-muted uppercase tracking-wider">Published Pieces</span>
          <p className="font-display font-bold text-3xl text-primary">{totalPieces}</p>
          <p className="text-[11px] text-editorial-muted">Poetry, stories & artwork</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-editorial-border shadow-m3-1 space-y-1">
          <span className="text-xs font-bold text-editorial-muted uppercase tracking-wider">Submissions Received</span>
          <p className="font-display font-bold text-3xl text-secondary">{submissions.length}</p>
          <p className="text-[11px] text-editorial-muted">From student body</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-editorial-border shadow-m3-1 space-y-1">
          <span className="text-xs font-bold text-editorial-muted uppercase tracking-wider">Active Volume</span>
          <p className="font-display font-bold text-3xl text-tertiary">Vol. 34</p>
          <p className="text-[11px] text-editorial-muted">Academic Year 2025–26</p>
        </div>

      </div>

      {/* Switcher Navigation */}
      <div className="flex items-center gap-2 border-b border-editorial-border pb-4">
        <button
          onClick={() => setActiveView('issues')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-2 ${
            activeView === 'issues'
              ? 'bg-primary text-white shadow-m3-1'
              : 'bg-surface-container text-editorial-muted hover:text-editorial-ink'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Magazine Issues ({issues.length})</span>
        </button>

        <button
          onClick={() => setActiveView('submissions')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-2 ${
            activeView === 'submissions'
              ? 'bg-primary text-white shadow-m3-1'
              : 'bg-surface-container text-editorial-muted hover:text-editorial-ink'
          }`}
        >
          <Inbox className="w-3.5 h-3.5" />
          <span>Student Submissions ({submissions.length})</span>
        </button>
      </div>

      {/* VIEW 1: ISSUES MANAGEMENT */}
      {activeView === 'issues' && (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest rounded-3xl border border-editorial-border overflow-hidden shadow-m3-1">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                
                <thead className="bg-surface-container-low text-editorial-muted uppercase tracking-wider text-[11px] border-b border-editorial-border">
                  <tr>
                    <th className="py-4 px-6">Issue Edition</th>
                    <th className="py-4 px-6">Semester / Year</th>
                    <th className="py-4 px-6">Pieces</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-editorial-border/60">
                  {issues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-surface-container-low/50 transition-colors">
                      
                      {/* Title & Cover */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={issue.coverImage}
                            alt={issue.title}
                            className="w-12 h-12 rounded-xl object-cover border border-editorial-border shrink-0"
                          />
                          <div>
                            <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider">
                              Vol. {issue.volume} • No. {issue.issueNumber}
                            </span>
                            <h3 className="font-serif italic font-bold text-sm text-editorial-ink">
                              {issue.title}
                            </h3>
                            <p className="text-[11px] text-editorial-muted truncate max-w-xs">
                              Theme: {issue.theme}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Semester / Year */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-editorial-ink">
                          {issue.semester} {issue.academicYear}
                        </div>
                        <div className="text-[11px] text-editorial-muted">
                          Pub: {issue.publishedDate}
                        </div>
                      </td>

                      {/* Pieces Count */}
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-editorial-ink font-semibold text-xs">
                          {issue.pieces.length} {issue.pieces.length === 1 ? 'piece' : 'pieces'}
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleStatus(issue)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] transition ${
                            issue.status === 'published'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                        >
                          {issue.status === 'published' ? (
                            <>
                              <Globe className="w-3 h-3" />
                              <span>Live</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => onPreviewIssue(issue)}
                          className="p-2 rounded-full hover:bg-surface-container text-editorial-muted hover:text-primary transition"
                          title="Preview Issue Reader"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onEditIssue(issue)}
                          className="p-2 rounded-full hover:bg-surface-container text-editorial-muted hover:text-secondary transition"
                          title="Edit Issue Details & Pieces"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteIssue(issue.id, issue.title)}
                          className="p-2 rounded-full hover:bg-red-50 text-editorial-muted hover:text-red-600 transition"
                          title="Delete Issue"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SUBMISSIONS REVIEW */}
      {activeView === 'submissions' && (
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <div className="bg-surface-container-low p-12 rounded-3xl border border-editorial-border text-center space-y-3">
              <Inbox className="w-10 h-10 text-editorial-muted mx-auto" />
              <h3 className="font-display font-bold text-lg text-editorial-ink">No student submissions yet</h3>
              <p className="text-xs text-editorial-muted font-serif-editorial max-w-sm mx-auto">
                Submissions from the public student form will appear here for editorial board review.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {submissions.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest p-6 rounded-3xl border border-editorial-border shadow-m3-1 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary-container text-primary font-bold text-xs">
                      {sub.genre}
                    </span>
                    <span className="text-[11px] text-editorial-muted">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif italic font-bold text-lg text-editorial-ink">
                      "{sub.title}"
                    </h3>
                    <p className="text-xs text-editorial-muted">
                      by <strong>{sub.studentName}</strong> • {sub.grade} ({sub.studentEmail})
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-container-low text-xs font-serif-editorial whitespace-pre-line max-h-40 overflow-y-auto leading-relaxed border border-editorial-border/60">
                    {sub.content}
                  </div>

                  <div className="pt-2 border-t border-editorial-border flex items-center justify-between">
                    <span className="text-[11px] text-editorial-muted">
                      {sub.content.split(/\s+/).length} words
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Pending Editorial Selection
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
