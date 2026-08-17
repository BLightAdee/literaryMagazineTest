/**
 * Optional production static file server for VPS or standalone container hosting
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const DIST_PATH = path.join(__dirname, 'dist');

// Serve static assets with caching
app.use(express.static(DIST_PATH, {
  maxAge: '1d',
  etag: true,
}));

// SPA fallback: send index.html for any unhandled routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ Our Lady Magazine production server running at http://localhost:${PORT}`);
});
