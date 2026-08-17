export type Genre = 'Poetry' | 'Fiction' | 'Non-Fiction' | 'Visual Art' | 'Essay';

export interface Author {
  id: string;
  name: string;
  grade: string; // e.g. "Senior, Class of '26"
  bio?: string;
  avatarUrl?: string;
}

export interface Piece {
  id: string;
  title: string;
  genre: Genre;
  author: Author;
  content: string; // Markdown or poetic stanza content
  excerpt?: string;
  artUrl?: string; // Image for visual art or piece banner
  medium?: string; // e.g. "Oil on canvas", "Digital illustration", "Free verse"
  awards?: string[]; // e.g. "Editor's Choice", "Scholastic Gold Key"
  readingTimeMinutes?: number;
  featured?: boolean;
}

export interface Issue {
  id: string;
  volume: number;
  issueNumber: number;
  title: string;
  theme: string;
  publishedDate: string; // ISO date string (YYYY-MM-DD)
  semester: 'Fall' | 'Winter' | 'Spring' | 'Summer';
  academicYear: string; // e.g. "2025-2026"
  coverImage: string;
  coverArtist: string;
  foreword: string;
  editorsNote?: string;
  status: 'published' | 'draft';
  pieces: Piece[];
  downloadPdfUrl?: string;
  isCurrentIssue?: boolean;
}

export interface EditorUser {
  id: string;
  email: string;
  name: string;
  role: 'Editor-in-Chief' | 'Managing Editor' | 'Poetry Editor' | 'Art Director' | 'Faculty Advisor';
  grade?: string;
  avatar: string;
}

export interface SubmissionDraft {
  studentName: string;
  studentEmail: string;
  grade: string;
  genre: Genre;
  title: string;
  content: string;
  artistStatement?: string;
  fileAttachmentName?: string;
  submittedAt: string;
}
