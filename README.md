# Northbridge Public Website

A polished, responsive, multi-page static website for Northbridge. The site is built with plain HTML, CSS, and JavaScript, so it can be hosted on any static hosting service without a database or server framework.

## Pages

- `index.html` — Home
- `platform.html` — Platform
- `solutions.html` — Solutions
- `ai.html` — Northbridge AI
- `company.html` — Company mission, principles, and leadership
- `about.html` — About Us, the Northbridge origin story, and founder contributions
- `contact.html` — Contact and direct founder details

## Files

- `assets/css/styles.css` — all shared design and responsive layout rules
- `assets/js/main.js` — mobile navigation and automatic footer year
- `assets/og.png` — social sharing preview
- `favicon.svg` — browser icon
- `robots.txt` and `sitemap.xml` — search-engine basics

## Preview locally

The simplest option is to open `index.html` in a browser. For a local web-server preview, run either of these commands from this folder:

```bash
python3 -m http.server 8080
```

or, if Node.js is installed:

```bash
npm run dev
```

Then open `http://localhost:8080` for the Python option or the local address shown by the Node option.

## Deploy

Upload the contents of this folder to any static host, including Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Set the project root to this folder. No build command is needed when uploading the source files directly.

If the host requires an output directory, run `npm run build` and publish the generated `dist` folder.

## Update content or styling

- Edit the page copy directly in the relevant `.html` file.
- Change the shared color, typography, spacing, or responsive tokens near the top of `assets/css/styles.css`.
- Keep the display brand as **Northbridge**.
- The visible brand and website URLs use `Northbridge` and `northbridge.in`. Contact emails intentionally retain `@northbrigde.in`, as requested. Email local parts preserve the supplied naming convention. This archive does not provision domains or mailboxes.

## Leadership details used throughout

- Yuvaan Chaudhary — Founder, CEO, Director & CFO — `YuvaanChadhary@northbrigde.in`
- Viraaj Shrivastava — CTO — `ViraajShrivastava@northbrigde.in`

## Responsive and accessibility notes

The layout uses fluid containers, flexible grids, wrapping controls, break-safe email links, and mobile navigation designed to stay inside the viewport. It also includes skip links, semantic landmarks, keyboard focus styles, active-page navigation states, descriptive page titles, and reduced-motion support.

## Vercel configuration

Upload `vercel.json` alongside `package.json` in the repository root. It selects the Other framework preset, runs `npm run build`, and publishes `dist`. Keep the Vercel Root Directory at the repository root when these files are at the top level. Commit the updated files to trigger a new deployment.
