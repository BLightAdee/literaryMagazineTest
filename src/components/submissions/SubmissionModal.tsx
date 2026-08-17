import React, { useState } from 'react';
import { Genre, SubmissionDraft } from '../../types/magazine';
import { storage } from '../../services/storage';
import { X, Send, Feather, Sparkles, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [grade, setGrade] = useState("Junior, Class of '27");
  const [genre, setGenre] = useState<Genre>('Poetry');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [artistStatement, setArtistStatement] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !title.trim() || !content.trim()) {
      alert('Please fill in your name, title, and piece content.');
      return;
    }

    const draft: SubmissionDraft = {
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim() || `${studentName.toLowerCase().replace(/\s+/g, '.')}@student.ourlady.edu`,
      grade,
      genre,
      title: title.trim(),
      content: content.trim(),
      artistStatement: artistStatement.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    storage.saveSubmission(draft);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-surface rounded-3xl border border-editorial-border shadow-m3-4 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-editorial-border bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-container text-primary flex items-center justify-center font-bold">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-editorial-ink">
                Submit Your Literary or Art Piece
              </h2>
              <p className="text-xs text-editorial-muted">
                Our Lady Magazine • Notre Dame Student Submissions Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container text-editorial-muted hover:text-editorial-ink transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center shadow-m3-1">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-2xl text-editorial-ink">
                Submission Received!
              </h3>
              <p className="text-sm text-editorial-muted max-w-md mx-auto font-serif-editorial leading-relaxed">
                Thank you, <strong>{studentName}</strong>! Your piece "<em>{title}</em>" has been submitted to the editorial board for the upcoming edition. You will receive review updates at <strong>{studentEmail || 'your school email'}</strong>.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-xs shadow-m3-1 hover:bg-blue-900 transition"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Guidelines Banner */}
            <div className="p-3.5 rounded-2xl bg-secondary-container/60 border border-secondary/20 flex items-start gap-3 text-xs text-secondary-onContainer">
              <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <div>
                <strong>Submission Period Open:</strong> We welcome poetry (up to 3 poems), short stories / personal essays (under 2,500 words), and high-resolution visual artwork.
              </div>
            </div>

            {/* Author Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-editorial-border text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1">
                  School Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. mlin27@notredame.edu"
                  value={studentEmail}
                  onChange={e => setStudentEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-editorial-border text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Grade & Genre */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1">
                  Grade / Class
                </label>
                <select
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-editorial-border text-xs outline-none"
                >
                  <option value="Freshman, Class of '29">Freshman (Class of '29)</option>
                  <option value="Sophomore, Class of '28">Sophomore (Class of '28)</option>
                  <option value="Junior, Class of '27">Junior (Class of '27)</option>
                  <option value="Senior, Class of '26">Senior (Class of '26)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1">
                  Genre *
                </label>
                <select
                  value={genre}
                  onChange={e => setGenre(e.target.value as Genre)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-editorial-border text-xs outline-none"
                >
                  <option value="Poetry">Poetry</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Essay">Personal Essay / Non-Fiction</option>
                  <option value="Visual Art">Visual Art / Photography</option>
                </select>
              </div>
            </div>

            {/* Piece Title */}
            <div>
              <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1">
                Title of Piece *
              </label>
              <input
                type="text"
                required
                placeholder="Give your poem or story a title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-editorial-border text-xs outline-none focus:border-primary"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider">
                  Text / Stanzas / Artist Statement *
                </label>
                <span className="text-[11px] text-editorial-muted font-mono">
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </span>
              </div>
              <textarea
                rows={7}
                required
                placeholder={
                  genre === 'Poetry'
                    ? "Paste your poem with line breaks and formatting..."
                    : genre === 'Visual Art'
                    ? "Describe your visual artwork, medium, dimensions, and artist statement (or image link)..."
                    : "Paste your story or essay draft here..."
                }
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-editorial-border text-xs font-serif-editorial outline-none focus:border-primary leading-relaxed"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 border-t border-editorial-border flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs font-semibold text-editorial-muted hover:bg-surface-container transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-xs shadow-m3-2 hover:bg-blue-900 active:scale-95 transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Editorial Board</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
