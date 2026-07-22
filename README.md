# Anwesha Mishra — Portfolio

This repository contains a static portfolio site served directly from the repo root.

Files of interest
- `index.html` — main page
- `styles.css` — styling
- `script.js` — interactivity
- `resume.html` — printable resume with PDF-friendly print button
- `assets/` — resume, sample docs, and other downloadable files
- `case-studies/` — individual case study pages
- `templates/` — testimonial request template

Deploying

Vercel (recommended)
```bash
npm install -g vercel
vercel --prod
```
Vercel auto-detects `index.html` at the repo root — no extra configuration needed.

GitHub Pages
Push to `main` and the workflow in `.github/workflows/pages.yml` will publish the repo root automatically.

Netlify
Drag and drop this folder onto the Netlify dashboard.

Local preview
```bash
python -m http.server 8000
# then open http://127.0.0.1:8000/
```
