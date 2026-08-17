import { Issue, Piece, SubmissionDraft, EditorUser } from '../types/magazine';
import { INITIAL_ISSUES, INITIAL_EDITORS } from './mockData';

const ISSUES_STORAGE_KEY = 'our_lady_magazine_issues_v1';
const EDITORS_STORAGE_KEY = 'our_lady_magazine_editors_v1';
const SUBMISSIONS_STORAGE_KEY = 'our_lady_magazine_submissions_v1';
const AUTH_SESSION_KEY = 'our_lady_magazine_session_v1';

export const storage = {
  getIssues(): Issue[] {
    try {
      const stored = localStorage.getItem(ISSUES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Issue[];
        // Sort descending by publication date
        return parsed.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
      }
    } catch (e) {
      console.error('Error loading issues from localStorage', e);
    }
    // Default fallback
    storage.saveIssues(INITIAL_ISSUES);
    return INITIAL_ISSUES.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  },

  saveIssues(issues: Issue[]): void {
    try {
      localStorage.setItem(ISSUES_STORAGE_KEY, JSON.stringify(issues));
    } catch (e) {
      console.error('Error saving issues to localStorage', e);
    }
  },

  getIssueById(id: string): Issue | undefined {
    const issues = storage.getIssues();
    return issues.find(issue => issue.id === id);
  },

  getLatestIssue(): Issue | undefined {
    const issues = storage.getIssues().filter(i => i.status === 'published');
    return issues[0] || INITIAL_ISSUES[0];
  },

  createIssue(newIssue: Omit<Issue, 'id'>): Issue {
    const issues = storage.getIssues();
    const id = `issue-${Date.now()}`;
    const created: Issue = {
      ...newIssue,
      id,
    };
    const updated = [created, ...issues];
    storage.saveIssues(updated);
    return created;
  },

  updateIssue(id: string, updates: Partial<Issue>): Issue {
    const issues = storage.getIssues();
    const index = issues.findIndex(i => i.id === id);
    if (index === -1) {
      throw new Error(`Issue with id ${id} not found`);
    }
    const updatedIssue = { ...issues[index], ...updates };
    issues[index] = updatedIssue;
    storage.saveIssues(issues);
    return updatedIssue;
  },

  deleteIssue(id: string): void {
    const issues = storage.getIssues();
    const filtered = issues.filter(i => i.id !== id);
    storage.saveIssues(filtered);
  },

  addPieceToIssue(issueId: string, piece: Omit<Piece, 'id'>): Piece {
    const issues = storage.getIssues();
    const issueIndex = issues.findIndex(i => i.id === issueId);
    if (issueIndex === -1) throw new Error('Issue not found');

    const newPiece: Piece = {
      ...piece,
      id: `piece-${Date.now()}`,
    };

    issues[issueIndex].pieces.push(newPiece);
    storage.saveIssues(issues);
    return newPiece;
  },

  // Submissions
  getSubmissions(): SubmissionDraft[] {
    try {
      const stored = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  },

  saveSubmission(submission: SubmissionDraft): void {
    const submissions = storage.getSubmissions();
    submissions.unshift(submission);
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
  },

  // Editors
  getEditors(): EditorUser[] {
    try {
      const stored = localStorage.getItem(EDITORS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EDITORS;
  },

  // Session
  getSession(): EditorUser | null {
    try {
      const stored = localStorage.getItem(AUTH_SESSION_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  setSession(user: EditorUser | null): void {
    if (user) {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_SESSION_KEY);
    }
  },

  resetToDefault(): void {
    localStorage.removeItem(ISSUES_STORAGE_KEY);
    storage.saveIssues(INITIAL_ISSUES);
  }
};
