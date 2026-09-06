# Northbridge website with Pricing

Upload the CONTENTS of github-ready/ to the root of your existing GitHub website repository, retaining assets/ and scripts/. Replace matching files. Pricing is added to all page navigation and footers.

Vercel: the included build configuration generates all eight pages, including pricing.html.
GitHub Pages: publish the repository root; all pages also work directly without a build.

The separate pricing.html is self-contained (styles and logo embedded). Place it beside index.html and contact.html. Upload the complete package to add Pricing navigation on other pages too.

All pricing wording and values are preserved. The three contact links use contact.html instead of /contact.html to reach the same Contact page under a GitHub project subdirectory.

Local preview: `npm run dev`. Build: `npm run build`. Validate: `npm run validate`.
