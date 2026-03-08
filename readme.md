<div align="center">

# ✦ BURHANUDDIN MORISWALA

### Full Stack Developer & UI/UX Designer

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-burhanuddinmoriswala.netlify.app-E31B23?style=for-the-badge&logoColor=white)](https://burhanuddinmoriswala.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-moriswala--burhanuddin-181717?style=for-the-badge&logo=github)](https://github.com/moriswala-burhanuddin)
[![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://burhanuddinmoriswala.netlify.app)

</div>

---

## 📌 Overview

A **luxury, editorial-grade personal portfolio** built to showcase my skills, projects, and services as a Full Stack Developer. Every section is crafted for maximum visual impact — from the interactive draggable hero to the cinematic project detail pages.

> Built with React 18, Framer Motion, and a pixel-perfect custom CSS design system. Deployed on Netlify with full SEO, security headers, and SPA routing.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖱️ **Interactive Drag Mode** | Letters and UI elements are draggable across the screen |
| 🎬 **Framer Motion Animations** | Scroll-triggered reveals, parallax, and micro-animations |
| 📱 **Fully Responsive** | Designed for mobile, tablet, and desktop |
| 🌑 **Dark Project Pages** | Cinematic project detail pages with parallax hero images |
| 📞 **WhatsApp CTA** | Floating WhatsApp button for instant client contact |
| 🔎 **SEO Optimised** | Open Graph, Twitter Card, JSON-LD schema, canonical URLs |
| 🔒 **Security Headers** | HSTS, CSP, X-Frame-Options via Netlify |
| ⚡ **Performance** | Aggressive asset caching + font preloading |

---

## 🗂️ Project Structure

```
portfolio-burhanuddin/
├── public/
│   ├── _redirects          # Netlify SPA fallback routing
│   ├── robots.txt          # Search engine crawler config
│   ├── site.webmanifest    # PWA manifest
│   ├── og-image.png        # Social share preview image (1200×630)
│   └── favicon.svg         # Site favicon
│
├── src/
│   ├── assets/             # Images, fonts, static media
│   ├── components/
│   │   ├── Hero.jsx        # Interactive hero with draggable letters
│   │   ├── Navbar.jsx      # Top navigation bar
│   │   ├── Services.jsx    # What I do section
│   │   ├── CoreServices.jsx # Detailed services with skill capsules
│   │   ├── Projects.jsx    # Portfolio project grid
│   │   ├── About.jsx       # About me section
│   │   ├── Testimonials.jsx # Client testimonials
│   │   ├── SocialMedia.jsx # Social media links
│   │   ├── Contact.jsx     # Contact form & info
│   │   ├── Footer.jsx      # Site footer
│   │   ├── WhatsAppCTA.jsx # Floating WhatsApp button
│   │   ├── ScrollToTop.jsx # Back-to-top button
│   │   ├── DraggableItem.jsx   # Draggable HOC wrapper
│   │   ├── DraggableLetters.jsx # Letter-by-letter drag
│   │   └── FloatingDrag.jsx    # Floating drag UI elements
│   │
│   ├── context/
│   │   └── DragContext.jsx  # Global drag mode state
│   │
│   ├── data/
│   │   └── projectsData.js  # All project content & metadata
│   │
│   ├── pages/
│   │   └── ProjectDetail.jsx # Individual project case study page
│   │
│   ├── App.jsx              # Root app with React Router
│   ├── main.jsx             # React entry point
│   └── index.css            # Global design tokens
│
├── index.html               # HTML shell with full SEO meta tags
├── netlify.toml             # Netlify build, redirect & header config
├── vite.config.js           # Vite bundler config
├── package.json             # Dependencies & scripts
└── .gitignore               # Git ignore rules
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 |
| **Routing** | React Router DOM v7 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Styling** | Vanilla CSS (custom design system) |
| **Fonts** | Google Fonts — Inter & Playfair Display |
| **Bundler** | Vite 5 |
| **Hosting** | Netlify |
| **SEO** | JSON-LD Schema, Open Graph, Twitter Card |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm `v9+`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/moriswala-burhanuddin/burhanuddin-moriswala-portfolio.git

# 2. Navigate into the project
cd burhanuddin-moriswala-portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server (HMR enabled) |
| `npm run build` | Build optimised production bundle to `/dist` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all `.js` and `.jsx` files |

---

## 🌐 Deployment (Netlify)

This project is pre-configured for **zero-config Netlify deployment**.

### Auto-Deploy via Git

1. Push your code to GitHub
2. Connect the repo on [netlify.com](https://netlify.com)
3. Netlify auto-detects `netlify.toml` — no manual configuration needed

### Manual Deploy

```bash
# Build the project
npm run build

# Deploy the dist/ folder via Netlify CLI
npx netlify deploy --prod --dir=dist
```

### What `netlify.toml` includes

- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ✅ SPA redirect: all routes → `index.html` with `200` status
- ✅ Security headers: HSTS, CSP, X-Frame-Options, XSS protection
- ✅ Cache headers: 1-year cache for all assets, no-cache for HTML

---

## 🔍 SEO Configuration

The portfolio is fully SEO-optimised out of the box:

- **Primary meta tags** — title, description, keywords, author, robots
- **Open Graph** — rich link previews on Facebook, LinkedIn, WhatsApp
- **Twitter Card** — `summary_large_image` card for X/Twitter
- **JSON-LD Schema** — `Person`, `WebSite`, and `ProfessionalService` structured data
- **Canonical URL** — prevents duplicate content penalties
- **robots.txt** — allows all crawlers, references sitemap
- **Web App Manifest** — PWA-ready for mobile installability

> **Important:** Update the domain in `index.html` and `public/robots.txt` to your actual live URL once deployed.

---

## 📋 Customisation Checklist

Before going live, update the following:

- [ ] **`index.html`** — Replace `burhanuddinmoriswala.netlify.app` with your actual URL
- [ ] **`index.html`** — Update Twitter handle (`@burhanuddindev`)
- [ ] **`index.html`** — Update GitHub/LinkedIn URLs in JSON-LD schema
- [ ] **`public/og-image.png`** — Add your custom 1200×630px social share image
- [ ] **`public/favicon.svg`** — Add your personal favicon
- [ ] **`src/data/projectsData.js`** — Update with your real projects
- [ ] **`public/robots.txt`** — Update sitemap URL

---

## 📄 License

This project is personal portfolio source code. Feel free to use it as **inspiration**, but please do not directly copy and claim it as your own.

---

<div align="center">

**Designed & Developed with ❤️ by Burhanuddin Moriswala**

[Portfolio](https://burhanuddinmoriswala.netlify.app) · [GitHub](https://github.com/moriswala-burhanuddin) · [LinkedIn](https://linkedin.com/in/burhanuddinmoriswala)

</div>
