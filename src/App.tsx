import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { storage } from './services/storage';
import { Issue, Piece } from './types/magazine';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { IssuesPage } from './pages/IssuesPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { EditorDashboard } from './pages/EditorDashboard';
import { IssueReader } from './components/issues/IssueReader';
import { IssueEditorModal } from './components/editor/IssueEditorModal';
import { SubmissionModal } from './components/submissions/SubmissionModal';

export const MainAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<'home' | 'issues' | 'about' | 'editor' | 'login'>('home');
  const [issues, setIssues] = useState<Issue[]>([]);
  
  // Modals state
  const [activeReadingIssue, setActiveReadingIssue] = useState<Issue | null>(null);
  const [readingPieceId, setReadingPieceId] = useState<string | undefined>(undefined);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  const loadIssues = () => {
    const loaded = storage.getIssues();
    setIssues(loaded);
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleReadIssue = (issue: Issue, pieceId?: string) => {
    setActiveReadingIssue(issue);
    setReadingPieceId(pieceId);
  };

  const handleOpenCreateIssue = () => {
    setEditingIssue(null);
    setIsEditorModalOpen(true);
  };

  const handleEditIssue = (issue: Issue) => {
    setEditingIssue(issue);
    setIsEditorModalOpen(true);
  };

  const handleIssueSaved = () => {
    loadIssues();
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-editorial-ink selection:bg-primary-container selection:text-primary">
      
      {/* Material 3 Expressive Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === 'editor' && !isAuthenticated) {
            setCurrentPage('login');
          } else {
            setCurrentPage(page);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenNewIssueModal={isAuthenticated ? handleOpenCreateIssue : undefined}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            issues={issues}
            onReadIssue={handleReadIssue}
            onNavigate={(page) => setCurrentPage(page)}
            onOpenSubmission={() => setIsSubmissionModalOpen(true)}
          />
        )}

        {currentPage === 'issues' && (
          <IssuesPage
            issues={issues}
            onReadIssue={handleReadIssue}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenSubmission={() => setIsSubmissionModalOpen(true)}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={() => setCurrentPage('editor')}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'editor' && (
          isAuthenticated ? (
            <EditorDashboard
              issues={issues}
              onRefreshIssues={loadIssues}
              onOpenCreateIssue={handleOpenCreateIssue}
              onEditIssue={handleEditIssue}
              onPreviewIssue={handleReadIssue}
            />
          ) : (
            <LoginPage
              onLoginSuccess={() => setCurrentPage('editor')}
              onBackToHome={() => setCurrentPage('home')}
            />
          )
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(page) => {
          if (page === 'editor' && !isAuthenticated) {
            setCurrentPage('login');
          } else {
            setCurrentPage(page);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSubmission={() => setIsSubmissionModalOpen(true)}
      />

      {/* Full Immersive Issue Reader Modal */}
      {activeReadingIssue && (
        <IssueReader
          issue={activeReadingIssue}
          initialPieceId={readingPieceId}
          onClose={() => {
            setActiveReadingIssue(null);
            setReadingPieceId(undefined);
          }}
        />
      )}

      {/* Issue Editor Modal (Create / Edit Issue) */}
      <IssueEditorModal
        isOpen={isEditorModalOpen}
        existingIssue={editingIssue}
        onClose={() => {
          setIsEditorModalOpen(false);
          setEditingIssue(null);
        }}
        onSaved={handleIssueSaved}
      />

      {/* Student Submission Form Modal */}
      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />

    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

export default App;
