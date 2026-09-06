import { access, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'platform.html', 'solutions.html', 'ai.html', 'pricing.html', 'company.html', 'about.html', 'contact.html'];
const titles = new Set();
const errors = [];

const requiredInEveryPage = [
  '<meta name="viewport"',
  '<meta name="description"',
  '<meta property="og:image" content="https://northbridge.in/assets/og.png">',
  'class="skip-link"',
  'id="main-content"',
  'YuvaanChadhary@northbrigde.in',
  'ViraajShrivastava@northbrigde.in',
];

for (const page of pages) {
  const html = await readFile(join(root, page), 'utf8');

  for (const needle of requiredInEveryPage) {
    if (!html.includes(needle)) errors.push(`${page}: missing ${needle}`);
  }

  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) errors.push(`${page}: expected one h1, found ${h1Count}`);

  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if (!title) errors.push(`${page}: missing title`);
  if (title && titles.has(title)) errors.push(`${page}: duplicate title “${title}”`);
  if (title) titles.add(title);

  const currentCount = (html.match(/aria-current="page"/g) || []).length;
  if (currentCount !== 2) errors.push(`${page}: expected active state in desktop and mobile navigation`);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/.test(reference)) continue;
    const localPath = reference.split(/[?#]/)[0];
    try {
      await access(join(root, localPath));
    } catch {
      errors.push(`${page}: missing linked file ${localPath}`);
    }
  }
}

for (const page of ['company.html', 'about.html', 'contact.html']) {
  const html = await readFile(join(root, page), 'utf8');
  const requiredLeadership = [
    'Yuvaan Chaudhary',
    'Founder, CEO, Director &amp; CFO',
    'Viraaj Shrivastava',
    '>CTO<',
  ];
  for (const needle of requiredLeadership) {
    if (!html.includes(needle)) errors.push(`${page}: missing leadership detail ${needle}`);
  }
}

const allHtml = (await Promise.all(pages.map((page) => readFile(join(root, page), 'utf8')))).join('\n');
for (const staleCopy of ['Yuvaan Singh', 'CEO/HR', 'VEO']) {
  if (allHtml.includes(staleCopy)) errors.push(`stale founder detail remains: ${staleCopy}`);
}

const css = await readFile(join(root, 'assets/css/styles.css'), 'utf8');
if (css.includes('100vw')) errors.push('styles.css: 100vw can create horizontal overflow');
if (!css.includes('overflow-wrap: anywhere')) errors.push('styles.css: long email wrapping rule is missing');
if (!css.includes('@media (max-width: 24rem)')) errors.push('styles.css: smallest mobile breakpoint is missing');
if (!css.includes('prefers-reduced-motion')) errors.push('styles.css: reduced-motion support is missing');

const openBraces = (css.match(/{/g) || []).length;
const closeBraces = (css.match(/}/g) || []).length;
if (openBraces !== closeBraces) errors.push('styles.css: unbalanced braces');

const js = await readFile(join(root, 'assets/js/main.js'), 'utf8');
try {
  new Function(js);
} catch (error) {
  errors.push(`main.js: ${error.message}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${pages.length} pages, internal links, leadership details, metadata, CSS safeguards, and JavaScript syntax.`);
