# Anwesha Mishra — Portfolio

This repository contains a static portfolio site located in the `anwesha-portfolio-deployable/` folder.

What I configured for you
- `vercel.json` — rewrites requests to `anwesha-portfolio-deployable/` so Vercel serves the correct index.

Quick steps to deploy (recommended)

1. Commit and push to your Git remote (main branch):

```bash
git add .
git commit -m "Prepare portfolio for Vercel: add vercel.json, docs, and improvements"
git push origin main
```

2. In Vercel, connect the Git repository and set the Production branch to `main`. Vercel will pick up `vercel.json` and rewrite requests to the subfolder.

Alternative (set output directory in Vercel dashboard)
- In the project settings -> Build & Output Settings, set `Output Directory` to `anwesha-portfolio-deployable` and redeploy.

Files of interest
- `anwesha-portfolio-deployable/index.html` — main page
- `anwesha-portfolio-deployable/styles.css` — styling
- `anwesha-portfolio-deployable/script.js` — interactivity
- `anwesha-portfolio-deployable/resume.html` — printable resume with PDF-friendly print button
- `vercel.json` — Vercel routing

Local preview

Start a simple HTTP server from the repository root and open `http://localhost:8000/anwesha-portfolio-deployable/`:

```bash
python -m http.server 8000
# then open http://127.0.0.1:8000/anwesha-portfolio-deployable/
```

If you want, I can also move the site files to the repository root, add a small CI, or generate a PDF resume for you.
