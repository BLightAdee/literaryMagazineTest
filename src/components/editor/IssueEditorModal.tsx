import React, { useState } from 'react';
import { Issue, Piece, Genre } from '../../types/magazine';
import { storage } from '../../services/storage';
import { 
  X, Plus, Trash2, Sparkles, Image, Feather, BookOpen, 
  Palette, Check, Eye, HelpCircle, UploadCloud, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface IssueEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (issue: Issue) => void;
  existingIssue?: Issue | null;
}

const COVER_PRESETS = [
  {
    name: 'Grotto Votive & Stone',
    url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&auto=format&fit=crop&q=80',
    artist: 'Marcus Chen (Grade 12)',
  },
  {
    name: 'Autumn Basilica Shadows',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    artist: 'Ananya Patel (Grade 11)',
  },
  {
    name: 'Spring Blossoms & Quad',
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&auto=format&fit=crop&q=80',
    artist: 'Elena Rostova (Class of 2025)',
  },
  {
    name: 'Gothic Library Arches',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    artist: 'Julian Vance (Class of 2026)',
  },
  {
    name: 'Stained Glass Abstract',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    artist: 'Genevieve Beaulieu (Grade 12)',
  },
];

export const IssueEditorModal: React.FC<IssueEditorModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  existingIssue,
}) => {
  if (!isOpen) return null;

  // Issue fields
  const [title, setTitle] = useState(existingIssue?.title || '');
  const [volume, setVolume] = useState<number>(existingIssue?.volume || 34);
  const [issueNumber, setIssueNumber] = useState<number>(existingIssue?.issueNumber || 3);
  const [semester, setSemester] = useState<'Fall' | 'Winter' | 'Spring' | 'Summer'>(existingIssue?.semester || 'Spring');
  const [academicYear, setAcademicYear] = useState(existingIssue?.academicYear || '2025-2026');
  const [theme, setTheme] = useState(existingIssue?.theme || '');
  const [foreword, setForeword] = useState(existingIssue?.foreword || '');
  const [coverImage, setCoverImage] = useState(existingIssue?.coverImage || COVER_PRESETS[0].url);
  const [coverArtist, setCoverArtist] = useState(existingIssue?.coverArtist || COVER_PRESETS[0].artist);
  const [status, setStatus] = useState<'published' | 'draft'>(existingIssue?.status || 'published');
  
  // Pieces
  const [pieces, setPieces] = useState<Piece[]>(existingIssue?.pieces || [
    {
      id: `p-${Date.now()}`,
      title: 'Vespers in the Snow',
      genre: 'Poetry',
      medium: 'Free verse',
      author: {
        id: `a-${Date.now()}`,
        name: 'Student Poet',
        grade: 'Junior, Class of ’27',
      },
      content: `The dusk settles like blue dust\nover the limestone gargoyles.\nWe walk with mittens clasped,\nwhispering old lines we memorized\nbefore the frost caught the trees.`,
    }
  ]);

  const [activeTab, setActiveTab] = useState<'details' | 'pieces' | 'preview'>('details');
  const [editingPieceIndex, setEditingPieceIndex] = useState<number | null>(null);

  // New piece temporary form
  const [newPieceTitle, setNewPieceTitle] = useState('');
  const [newPieceGenre, setNewPieceGenre] = useState<Genre>('Poetry');
  const [newPieceAuthor, setNewPieceAuthor] = useState('');
  const [newPieceGrade, setNewPieceGrade] = useState("Senior, Class of '26");
  const [newPieceMedium, setNewPieceMedium] = useState('');
  const [newPieceContent, setNewPieceContent] = useState('');
  const [newPieceArtUrl, setNewPieceArtUrl] = useState('');

  const handleAddPiece = () => {
    if (!newPieceTitle.trim() || !newPieceContent.trim()) {
      alert('Please provide at least a title and content for the piece.');
      return;
    }

    const created: Piece = {
      id: `piece-${Date.now()}`,
      title: newPieceTitle.trim(),
      genre: newPieceGenre,
      medium: newPieceMedium || undefined,
      artUrl: newPieceArtUrl || undefined,
      author: {
        id: `auth-${Date.now()}`,
        name: newPieceAuthor.trim() || 'Anonymous Student',
        grade: newPieceGrade || 'Notre Dame Student',
      },
      content: newPieceContent.trim(),
    };

    setPieces([...pieces, created]);
    setNewPieceTitle('');
    setNewPieceContent('');
    setNewPieceMedium('');
    setNewPieceArtUrl('');
    setNewPieceAuthor('');
  };

  const handleRemovePiece = (id: string) => {
    setPieces(pieces.filter(p => p.id !== id));
  };

  const handleSaveIssue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !theme.trim()) {
      alert('Please fill out the issue title and theme.');
      return;
    }

    const issueData = {
      title: title.trim(),
      volume: Number(volume),
      issueNumber: Number(issueNumber),
      semester,
      academicYear,
      theme: theme.trim(),
      foreword: foreword.trim() || `The ${semester} ${academicYear} edition of Our Lady Magazine.`,
      coverImage: coverImage.trim(),
      coverArtist: coverArtist.trim() || 'Staff Artist',
      publishedDate: existingIssue?.publishedDate || new Date().toISOString().split('T')[0],
      status,
      pieces,
    };

    let result: Issue;
    if (existingIssue) {
      result = storage.updateIssue(existingIssue.id, issueData);
    } else {
      result = storage.createIssue(issueData);
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1E3A8A', '#D97706', '#0F766E', '#FEF3C7'],
      });
    } catch (err) {
      // ignore
    }

    onSaved(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl border border-editorial-border shadow-m3-4 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-editorial-border bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary-container text-secondary-onContainer flex items-center justify-center font-bold">
              <Layers className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-editorial-ink">
                {existingIssue ? 'Edit Issue Edition' : 'Publish New Issue Edition'}
              </h2>
              <p className="text-xs text-editorial-muted">
                Our Lady Magazine Editorial Production Studio
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

        {/* Tab Navigation */}
        <div className="flex border-b border-editorial-border px-6 bg-surface-container/50 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2.5 rounded-t-xl font-semibold text-xs transition-all ${
              activeTab === 'details'
                ? 'bg-surface text-primary border-t-2 border-primary shadow-sm'
                : 'text-editorial-muted hover:text-editorial-ink'
            }`}
          >
            1. Issue Overview & Cover
          </button>
          <button
            onClick={() => setActiveTab('pieces')}
            className={`px-4 py-2.5 rounded-t-xl font-semibold text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'pieces'
                ? 'bg-surface text-primary border-t-2 border-primary shadow-sm'
                : 'text-editorial-muted hover:text-editorial-ink'
            }`}
          >
            <span>2. Pieces & Articles</span>
            <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
              {pieces.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2.5 rounded-t-xl font-semibold text-xs transition-all ${
              activeTab === 'preview'
                ? 'bg-surface text-primary border-t-2 border-primary shadow-sm'
                : 'text-editorial-muted hover:text-editorial-ink'
            }`}
          >
            3. Issue Preview
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: ISSUE DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              
              {/* Row 1: Title & Theme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1.5">
                    Issue Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Echoes of the Grotto"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-surface-container-lowest border border-editorial-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1.5">
                    Issue Theme / Motif *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vigil, Memory & Renewal"
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-surface-container-lowest border border-editorial-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Row 2: Volume, Number, Semester, Year */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1.5">
                    Volume
                  </label>
                  <input
                    type="number"
                    value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-editorial-border text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1.5">
                    Issue No.
                  </label>
                  <input
                    type="number"
                    value={issueNumber}
                    onChange={e => setIssueNumber(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-editorial-border text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1.5">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={e => setSemester(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-editorial-border text-sm outline-none"
                  >
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1.5">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={e => setAcademicYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-editorial-border text-sm outline-none"
                  />
                </div>
              </div>

              {/* Foreword / Editor's Note */}
              <div>
                <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider mb-1.5">
                  Foreword / Editor's Introduction
                </label>
                <textarea
                  rows={3}
                  placeholder="Welcome the reader to this edition and set the literary tone..."
                  value={foreword}
                  onChange={e => setForeword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-surface-container-lowest border border-editorial-border text-sm outline-none font-serif-editorial"
                />
              </div>

              {/* Cover Art Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-editorial-ink uppercase tracking-wider">
                  Cover Art & Artwork Attribution
                </label>
                
                {/* Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {COVER_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCoverImage(preset.url);
                        setCoverArtist(preset.artist);
                      }}
                      className={`relative rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all group ${
                        coverImage === preset.url ? 'border-primary ring-2 ring-primary/30 scale-105' : 'border-editorial-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2 text-left">
                        <span className="text-[10px] text-white font-medium line-clamp-1">{preset.name}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom URL or Artist Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <input
                    type="url"
                    placeholder="Custom Cover Image URL..."
                    value={coverImage}
                    onChange={e => setCoverImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-editorial-border text-xs outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Cover Artist (e.g. Marcus Chen, Grade 12)"
                    value={coverArtist}
                    onChange={e => setCoverArtist(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-editorial-border text-xs outline-none"
                  />
                </div>
              </div>

              {/* Publication Status */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-bold text-editorial-ink uppercase tracking-wider">Publication Status:</span>
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    status === 'published'
                      ? 'bg-primary text-white shadow-m3-1'
                      : 'bg-surface-container text-editorial-muted'
                  }`}
                >
                  Published (Live to Archive)
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    status === 'draft'
                      ? 'bg-secondary text-white shadow-m3-1'
                      : 'bg-surface-container text-editorial-muted'
                  }`}
                >
                  Draft (Editor Only)
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PIECES & ARTICLES */}
          {activeTab === 'pieces' && (
            <div className="space-y-8">
              
              {/* Existing Pieces List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-editorial-ink uppercase tracking-wider">
                    Pieces in this Issue ({pieces.length})
                  </h3>
                </div>

                {pieces.length === 0 ? (
                  <p className="text-xs text-editorial-muted italic p-4 bg-surface-container-low rounded-2xl">
                    No pieces added yet. Use the form below to add student poetry, fiction, essays, or artwork.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {pieces.map((piece, idx) => (
                      <div
                        key={piece.id}
                        className="p-4 rounded-2xl bg-surface-container-lowest border border-editorial-border flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-primary text-[10px] font-bold">
                              {piece.genre}
                            </span>
                            <h4 className="font-serif italic font-bold text-sm text-editorial-ink">
                              "{piece.title}"
                            </h4>
                          </div>
                          <p className="text-xs text-editorial-muted">
                            by {piece.author.name} • {piece.author.grade}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemovePiece(piece.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                          title="Remove Piece"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add New Piece Form */}
              <div className="p-5 rounded-3xl bg-surface-container-low border border-editorial-border space-y-4">
                <h4 className="font-display font-bold text-sm text-editorial-ink flex items-center gap-2">
                  <Plus className="w-4 h-4 text-primary" />
                  Add a Student Piece / Work
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-editorial-muted uppercase mb-1">
                      Piece Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. The Blue Hour at Saint Jude’s"
                      value={newPieceTitle}
                      onChange={e => setNewPieceTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-editorial-border text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-editorial-muted uppercase mb-1">
                      Genre
                    </label>
                    <select
                      value={newPieceGenre}
                      onChange={e => setNewPieceGenre(e.target.value as Genre)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-editorial-border text-xs outline-none"
                    >
                      <option value="Poetry">Poetry</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Essay">Personal Essay / Non-Fiction</option>
                      <option value="Visual Art">Visual Art</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-editorial-muted uppercase mb-1">
                      Medium / Form
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Free verse, Short story, Oil"
                      value={newPieceMedium}
                      onChange={e => setNewPieceMedium(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-editorial-border text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-editorial-muted uppercase mb-1">
                      Student Author / Artist Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Genevieve Beaulieu"
                      value={newPieceAuthor}
                      onChange={e => setNewPieceAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-editorial-border text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-editorial-muted uppercase mb-1">
                      Author Grade / Bio
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior, Class of '26"
                      value={newPieceGrade}
                      onChange={e => setNewPieceGrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-editorial-border text-xs outline-none"
                    />
                  </div>
                </div>

                {newPieceGenre === 'Visual Art' && (
                  <div>
                    <label className="block text-[11px] font-bold text-editorial-muted uppercase mb-1">
                      Artwork Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newPieceArtUrl}
                      onChange={e => setNewPieceArtUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-editorial-border text-xs outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-editorial-muted uppercase mb-1">
                    Content / Poetic Stanzas / Story Text *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter poem lines with line breaks, or full story text..."
                    value={newPieceContent}
                    onChange={e => setNewPieceContent(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-surface border border-editorial-border text-xs outline-none font-serif-editorial"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddPiece}
                  className="px-5 py-2.5 rounded-full bg-secondary text-white font-semibold text-xs hover:bg-amber-700 transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Insert Piece into Issue
                </button>

              </div>

            </div>
          )}

          {/* TAB 3: PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-surface-container border border-editorial-border space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase">
                  <span>Vol. {volume} • No. {issueNumber}</span>
                  <span>•</span>
                  <span>{semester} {academicYear}</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-editorial-ink">{title || 'Untitled Issue'}</h3>
                <p className="text-xs font-serif-editorial italic text-editorial-muted">Theme: {theme || 'None specified'}</p>
                <div className="h-48 rounded-2xl overflow-hidden bg-editorial-ink">
                  <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-serif-editorial leading-relaxed">{foreword}</p>
                <div className="border-t border-editorial-border pt-3">
                  <p className="text-xs font-bold text-editorial-ink mb-2">Pieces Included ({pieces.length}):</p>
                  <ul className="list-disc list-inside text-xs space-y-1 text-editorial-muted font-serif">
                    {pieces.map(p => (
                      <li key={p.id}>
                        "{p.title}" by {p.author.name} ({p.genre})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-editorial-border bg-surface-container-low flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-editorial-muted hover:bg-surface-container transition"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {activeTab === 'details' && (
              <button
                type="button"
                onClick={() => setActiveTab('pieces')}
                className="px-5 py-2.5 rounded-full bg-surface-container-high text-editorial-ink font-semibold text-xs hover:bg-surface-container-highest transition"
              >
                Next: Add Pieces &rarr;
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveIssue}
              className="px-7 py-3 rounded-full bg-primary text-white font-semibold text-xs sm:text-sm hover:bg-blue-900 shadow-m3-2 active:scale-95 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{existingIssue ? 'Update Issue' : 'Publish Edition'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
