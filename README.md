# Dynamic Dragon Apps — Landing Page

This repository contains a single-page, highly-animated landing page for the Android developer brand "Dynamic Dragon Apps".

Features:
- Dark-first premium UI with optional light mode toggle
- Smooth animations (GSAP + Lenis), scroll-triggered reveals
- Glassmorphism, soft gradients, floating micro-interactions
- Apps loaded from `data/apps.json` for easy updates
- `public/app-ads.txt` included for AdMob verification

How to use / deploy

1. Local development (recommended) — Vite + React:

```bash
# install dependencies
cd c:\Users\dhamo\OneDrive\Desktop\dynamic-dragon
npm install

# start dev server
npm run dev

# open the URL printed by Vite (usually http://localhost:5173)
```

2. Quick static preview (no npm):

```bash
python -m http.server 8000
# then open http://localhost:8000
```

3. Deploy to Vercel: create a new Project on Vercel and point it to this repository. Vercel will detect Vite and deploy automatically. Ensure `public/app-ads.txt` is present for AdMob.

Notes and next steps:
- Replace `app-ads.txt` publisher id with your AdMob publisher id.
- Replace Play Store links in `data/apps.json` with your real app links.
- Replace placeholder screenshots in `assets/images` with optimized PNG/JPEG assets.
