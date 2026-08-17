# 📖 Our Lady Magazine

> **Official Literary & Arts Journal of Notre Dame High School**  
> *Volume 34 • Established 1991*

[![Vibe Coded](https://img.shields.io/badge/Vibe%20Coded-100%25-blueviolet?style=for-the-badge&logo=sparkles)](https://github.com/)
[![Material 3 Expressive](https://img.shields.io/badge/Material%203-Expressive%20Design-1E3A8A?style=for-the-badge&logo=google)](https://m3.material.io/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

---

## ⚡ Vibe Coding Disclaimer

> [!IMPORTANT]
> **Disclaimer**: This entire project was **vibe coded** with love, intuition, and high-frequency aesthetic flow. Every pixel, spring curve, tonal palette, and strophe was crafted to harmonize Google's Material 3 Expressive design with the timeless collegiate humanities tradition of Notre Dame.

---

## 🌟 Overview & Heritage

**Our Lady Magazine** is the flagship student-run literary and visual arts publication of Notre Dame High School. Named in honor of *Notre Dame* ("Our Lady"), the journal serves as a creative sanctuary for student poets, essayists, short fiction writers, and visual artists across grades 9 through 12.

### ✨ Key Features

- 🏛️ **Hero Showcase & Current Edition**: Instantly highlights the latest volume with cover art, themes, and curated student pieces.
- 📚 **Chronological Issue Archive**: Browse all published volumes sorted automatically by **most recent** release, with real-time search, semester filters (Fall, Winter, Spring), and academic year grouping.
- 🖋️ **Immersive Editorial Reader**:
  - Distraction-free reading environment.
  - Multi-theme support: **Classic Paper White**, **Warm Sepia**, and **Nocturne Dark**.
  - Typography controls: Switch between **Editorial Serif** (*Newsreader / EB Garamond*) and **Variable Sans** (*Google Sans Flex / Plus Jakarta Sans*), with dynamic font size scaling.
  - Formatted poetry stanza preservation and high-resolution visual art viewer with artist statements.
  - Fast table of contents and genre filtering (Poetry, Fiction, Essays, Visual Art).
- 🛡️ **Editor Authentication & Portal**:
  - Secure login portal with role-based identities (Editor-in-Chief, Managing Editor, Poetry Editor, Art Director, Faculty Advisor).
  - One-click instant demo accounts for zero-friction testing.
- 🎨 **Issue & Piece Publishing Studio**:
  - Rich issue creation and editing workflow.
  - Curated Notre Dame aesthetic cover art presets or custom media URLs.
  - Piece manager: Add multi-author poetry, prose, and artwork with grade levels and award badges (*Editor's Choice*, *Gold Key*).
  - Draft vs. Live publication state management.
  - Tactile celebration confetti upon publishing.
- 📨 **Interactive Student Submissions Portal**:
  - Live submission simulator for students to submit creative work with real-time word counting and genre guidelines.
  - Editorial review panel in the Editor Dashboard.

---

## 🎨 Design System: Google Material 3 Expressive

The application is built following Google's **Material 3 Expressive** design language:

1. **Collegiate Pastel & Tonal Palette**:
   - Primary: Notre Dame Navy (`#1E3A8A`) & Royal Blue
   - Secondary: Honey Amber & Golden Dome Gold (`#D97706`)
   - Tertiary: Sage Pine (`#0F766E`)
   - Surface Containers: Warm Literary Paper (`#FAF8F5`, `#F2EDE4`)
2. **Physics-Based Spring Interactions**:
   - Expressive bouncy spring curves (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
   - Tactile button squish and lift on hover/press.
   - Dynamic pill badges and rounded container elevation levels (`--shadow-m3-1` to `--shadow-m3-4`).
3. **Fluid Typography**:
   - Headings & Accents: **Fraunces** & **Plus Jakarta Sans / Google Sans Flex**
   - Body & Stanzas: **Newsreader** & **EB Garamond**

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js `18.0+` or `20.0+`
- npm `9.0+`

### 1. Clone & Install
```bash
git clone https://github.com/your-username/our-lady-magazine.git
cd our-lady-magazine
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The compiled, minified production assets will be output to the `dist/` directory.

---

## 🔑 Demo Editor Accounts

For instant access to the **Editor Studio**, navigate to **Editor Portal** and use any of the pre-filled demo accounts:

| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **Editor-in-Chief** | Genevieve Beaulieu (Senior) | `editor@ourlady.edu` | `notredame2026` |
| **Managing Editor** | Julian Vance (Senior) | `julian.vance@ourlady.edu` | `notredame2026` |
| **Poetry Editor** | Claire Morin (Junior) | `claire.morin@ourlady.edu` | `notredame2026` |
| **Art Director** | Marcus Chen (Senior) | `marcus.chen@ourlady.edu` | `notredame2026` |
| **Faculty Advisor** | Dr. Evelyn Holloway | `dr.holloway@ourlady.edu` | `notredame2026` |

*(You can also log in with any custom `@ourlady.edu` address).*

---

## 🌐 Server Deployment Instructions

You can deploy **Our Lady Magazine** using any of the following standard hosting methods:

### Method A: Docker / Docker Compose (Recommended for VPS)

1. Ensure Docker and Docker Compose are installed on your server.
2. Clone the repository to your server:
   ```bash
   git clone https://github.com/your-username/our-lady-magazine.git
   cd our-lady-magazine
   ```
3. Start the container in detached mode:
   ```bash
   docker compose up -d --build
   ```
4. Access the web app at `http://YOUR_SERVER_IP:8080`.

---

### Method B: Standalone Node.js Express Server (Ubuntu / Debian VPS)

1. Build the production application on the server:
   ```bash
   npm install
   npm run build
   ```
2. Install PM2 process manager:
   ```bash
   npm install -g pm2
   ```
3. Start the application:
   ```bash
   PORT=8080 pm2 start server.js --name "our-lady-magazine"
   pm2 save
   pm2 startup
   ```

---

### Method C: Nginx Reverse Proxy with SSL (Certbot)

Configure your Nginx server block (`/etc/nginx/sites-available/ourlady`):

```nginx
server {
    server_name magazine.your-school.org;

    root /var/www/our-lady-magazine/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable SSL:
```bash
sudo certbot --nginx -d magazine.your-school.org
```

---

### Method D: Static Cloud Hosting (Vercel, Netlify, Cloudflare Pages)

#### **Vercel**
```bash
npm install -g vercel
vercel
```
*Build Command*: `npm run build`  
*Output Directory*: `dist`

#### **Netlify**
- Link your GitHub repository in the Netlify Dashboard.
- Set Build Command to `npm run build` and Publish Directory to `dist`.

---

## 📂 Project Structure

```text
literaryMagazine/
├── src/
│   ├── components/
│   │   ├── editor/          # Issue & Piece Editor Studio modals
│   │   ├── issues/          # IssueCard & full-screen IssueReader
│   │   ├── layout/          # Material 3 Navbar & Footer
│   │   └── submissions/     # Student Submission portal modal
│   ├── context/
│   │   └── AuthContext.tsx  # Editor authentication & state
│   ├── pages/
│   │   ├── HomePage.tsx     # Hero showcase & latest volume
│   │   ├── IssuesPage.tsx   # Sorted archive with filters & search
│   │   ├── AboutPage.tsx    # Masthead, history & submission FAQ
│   │   ├── LoginPage.tsx    # M3 Expressive editor sign-in
│   │   └── EditorDashboard.tsx # Publication control suite
│   ├── services/
│   │   ├── mockData.ts      # Curated editions with student poetry/art
│   │   └── storage.ts       # Persistence engine & CRUD API
│   ├── types/
│   │   └── magazine.ts      # TypeScript interfaces
│   ├── App.tsx              # Main router & layout coordinator
│   ├── index.css            # M3 Expressive tokens & spring curves
│   └── main.tsx             # React DOM entry point
├── Dockerfile               # Production Docker build
├── docker-compose.yml       # Production container configuration
├── nginx.conf               # Nginx routing config
├── server.js                # Optional Node.js production server
└── README.md                # Comprehensive documentation
```

---

## 📜 License & Copyright

&copy; 2026 Notre Dame High School Literary Board. All student works are copyright of their respective student authors and artists.
