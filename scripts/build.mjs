import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const output = join(root, 'dist');
const pages = [
  'index.html',
  'platform.html',
  'solutions.html',
  'ai.html',
  'company.html',
  'about.html',
  'contact.html',
];

await rm(output, { force: true, recursive: true });
await mkdir(output, { recursive: true });

for (const page of pages) {
  const source = join(root, page);
  const contents = await readFile(source, 'utf8');
  if (!contents.includes('<meta name="viewport"')) {
    throw new Error(`${page} is missing its viewport metadata.`);
  }
  await cp(source, join(output, page));
}

for (const entry of ['assets', 'favicon.svg', 'robots.txt', 'sitemap.xml']) {
  await cp(join(root, entry), join(output, entry), { recursive: true });
}

console.log(`Built ${pages.length} pages in dist/`);
