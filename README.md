# Our Lady Magazine

> **The Official Digital Literary & Visual Arts Journal of Notre Dame High School**  
> *Volume 34 • Established 1991*

[![Material Design 3](https://img.shields.io/badge/Design%20System-Material%203%20Expressive-1E3A8A?style=flat-square&logo=google)](https://m3.material.io/)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%7C%20TypeScript-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%207-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![AI Vibe Coded](https://img.shields.io/badge/Development-AI%20Vibe%20Coded-8B5CF6?style=flat-square&logo=sparkles)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 🤖 Development Methodology & AI Vibe Coding Disclaimer

> [!NOTE]
> **Project Origin & Vibe Coding Statement**:  
> This project was developed through **vibe coding**—an emerging development paradigm where application architecture, user interfaces, logic, and styling are generated and iteratively refined using **Artificial Intelligence (AI)** guided by high-level prompts, domain requirements, and aesthetic specifications. 
>
> While the codebase leverages automated generative models for rapid prototyping and implementation, all architectural layers—including Material Design 3 Expressive tokens, component encapsulation, type safety, and deployment pipelines—have been structured to adhere to industry standards and best practices.

---

## 📖 Executive Summary

**Our Lady Magazine** is a modern, responsive web application engineered for the student-led literary board of Notre Dame High School. The platform serves dual purposes:

1. **Public Reading Experience**: An elegant, distraction-free environment for exploring published seasonal editions, individual poetry, short stories, essays, and visual art, automatically organized in reverse-chronological order.
2. **Editorial Control Suite**: An authenticated administrative interface allowing student editors and faculty advisors to curate submissions, author new issues, upload cover media, format pieces, and manage publication states.

The application adheres strictly to **Google's Material 3 Expressive** design specification, combining fluid typography, spring-physics micro-interactions, and a bespoke collegiate tonal palette.

---

## 📐 System Architecture & Technology Stack

```text
literaryMagazine/
├── src/
│   ├── components/
│   │   ├── editor/          # Issue & Piece Editor Studio
│   │   ├── issues/          # IssueCard & full-screen IssueReader
│   │   ├── layout/          # Material 3 Expressive Navbar & Footer
│   │   └── submissions/     # Student Submission portal modal
│   ├── context/
│   │   └── AuthContext.tsx  # Authentication & session state management
│   ├── pages/
│   │   ├── HomePage.tsx     # Hero showcase & latest volume release
│   │   ├── IssuesPage.tsx   # Reverse-chronological archive & filtering
│   │   ├── AboutPage.tsx    # Masthead, school history & guidelines
│   │   ├── LoginPage.tsx    # Editor sign-in interface
│   │   └── EditorDashboard.tsx # Publication control & submission review
│   ├── services/
│   │   ├── mockData.ts      # Seed data for historical volumes
│   │   └── storage.ts       # Persistence engine & client-side CRUD
│   ├── types/
│   │   └── magazine.ts      # TypeScript interfaces and domain models
│   ├── App.tsx              # Main routing & state orchestrator
│   ├── index.css            # M3 Expressive design tokens & spring physics
│   └── main.tsx             # Application bootstrap
├── Dockerfile               # Multi-stage production container build
├── docker-compose.yml       # Production orchestration
├── nginx.conf               # Nginx reverse proxy configuration
├── server.js                # Lightweight Node.js static & SPA server
└── vite.config.ts           # Bundler configuration
```

### Core Technologies
- **UI Framework**: React 19 with TypeScript 5.9
- **Design System**: Material Design 3 Expressive (Tonal color palettes, dynamic elevation, variable fonts)
- **Styling**: Tailwind CSS v4 with custom CSS variable tokens
- **Animation Engine**: Framer Motion & CSS custom spring bezier curves (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- **Icons**: Lucide React
- **Build Tool**: Vite 7

---

## 🎨 Design System Implementation

The user interface follows the **Google Material 3 Expressive** design principles:

### 1. Collegiate Tonal Palette
| Token | Hex Code | Role |
| :--- | :--- | :--- |
| `primary` | `#1E3A8A` | Notre Dame Collegiate Navy — Core brand actions |
| `primary-container` | `#DBEAFE` | Soft Blue Surface — High-emphasis containers |
| `secondary` | `#D97706` | Golden Dome Honey Amber — Editorial accents |
| `secondary-container`| `#FEF3C7` | Warm Gold Tint — Highlight cards & badges |
| `tertiary` | `#0F766E` | Deep Sage — Supplementary indicators |
| `surface` | `#FAF8F5` | Warm Literary Paper — Base reading background |
| `surface-container` | `#F2EDE4` | Muted Card Layer — Structural dividers |

### 2. Typographic Pairing
- **Headings & Display**: *Fraunces* (Optical size variable) & *Plus Jakarta Sans / Google Sans Flex*
- **Body Text & Stanzas**: *Newsreader* & *EB Garamond* (Fine editorial serif with true open-type ligatures)

---

## 🚀 Getting Started (Local Development)

### System Requirements
- Node.js `18.0.0` or later
- npm `9.0.0` or later

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-organization>/our-lady-magazine.git
   cd our-lady-magazine
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

4. **Verify production build**:
   ```bash
   npm run build
   ```

---

## 🔑 Authentication & Demo Credentials

The platform includes built-in role management for editorial staff. For evaluation purposes, pre-configured demo credentials can be accessed via the **Editor Portal**:

| Role | Contributor | Email | Password |
| :--- | :--- | :--- | :--- |
| **Editor-in-Chief** | Genevieve Beaulieu (Senior) | `editor@ourlady.edu` | `notredame2026` |
| **Managing Editor** | Julian Vance (Senior) | `julian.vance@ourlady.edu` | `notredame2026` |
| **Poetry Editor** | Claire Morin (Junior) | `claire.morin@ourlady.edu` | `notredame2026` |
| **Art Director** | Marcus Chen (Senior) | `marcus.chen@ourlady.edu` | `notredame2026` |
| **Faculty Advisor** | Dr. Evelyn Holloway | `dr.holloway@ourlady.edu` | `notredame2026` |

*Note: Any email containing `@ourlady.edu` is accepted for development and testing.*

---

## 🌐 Server Deployment Guide

### Option 1: Docker & Docker Compose (Recommended for VPS)

The repository includes a multi-stage `Dockerfile` and `docker-compose.yml` for automated, containerized deployments.

1. **Build and deploy containers**:
   ```bash
   docker compose up -d --build
   ```

2. **Verify container health**:
   ```bash
   docker compose ps
   ```
   The web service will be served on port `8080` via a lightweight Nginx Alpine container.

---

### Option 2: Linux VPS (Ubuntu / Debian) with PM2 & Node.js

1. **Build the production bundle on the target server**:
   ```bash
   npm install
   npm run build
   ```

2. **Process Management with PM2**:
   ```bash
   npm install -g pm2
   PORT=8080 pm2 start server.js --name "our-lady-magazine"
   pm2 save
   pm2 startup
   ```

---

### Option 3: Enterprise Nginx Web Server with TLS (Let's Encrypt)

Create an Nginx virtual host configuration at `/etc/nginx/sites-available/our-lady-magazine`:

```nginx
server {
    listen 80;
    server_name magazine.notredame.edu;

    root /var/www/our-lady-magazine/dist;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA Routing Fallback
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

Enable the configuration and secure with SSL:
```bash
sudo ln -s /etc/nginx/sites-available/our-lady-magazine /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d magazine.notredame.edu
```

---

### Option 4: Cloud Static Hosting (Vercel, Netlify, Cloudflare Pages)

#### **Vercel CLI**
```bash
npx vercel --prod
```
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### **Netlify**
- Connect the Git repository in the Netlify Console.
- Configure **Build command** to `npm run build` and **Publish directory** to `dist`.

---

## 🔒 Security & Persistence Architecture

- **Client Storage Engine**: Utilizes structured browser persistence (`localStorage` with JSON schema validation) for offline resilience and immediate zero-backend deployment.
- **Backend Extensibility**: The storage layer is decoupled into `src/services/storage.ts`, allowing drop-in substitution with REST APIs, Firebase, or PostgreSQL backends.
- **Sanitization**: Form inputs are validated and formatted before publication.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

*Notre Dame High School Literary Board • Volume 34 (2025–2026)*
