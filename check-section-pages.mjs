import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sections, generate, extractSection } from './generate-section-pages.mjs';
import { sectionContent } from './section-content.mjs';
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
const sitemap = readFileSync('sitemap.xml', 'utf8');
const ht = readFileSync('.htaccess', 'utf8');
const mainContents = new Set();
for (const p of sections) {
 const html = readFileSync(p.file, 'utf8');
 const source = readFileSync(p.source, 'utf8');
 assert.equal(html, generate(p), `${p.route}: stale generated HTML`);
 assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
 const url = 'https://bravobrconsultoria.com.br' + p.route;
 assert.equal(html.match(/rel="canonical"\s+href="([^"]+)"/)[1], url);
 const data = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
 assert.equal(data.find(d => d['@type'] === 'WebPage').url, url);
 assert(config.rewrites.some(r => r.source === p.route && r.destination === '/' + p.file));
 assert(ht.includes(`RewriteRule ^${p.route.slice(1)}$ ${p.file} [END]`));
 assert(sitemap.includes(`<loc>${url}</loc><lastmod>`));
 assert(html.includes(sectionContent[p.route].headline));
 assert(!html.includes('hero-video'), `${p.route}: no copied full-page hero`);
 assert(!html.includes('scrollIntoView'), `${p.route}: opens at its own heading`);
 const main = html.match(/<main\b[\s\S]*?<\/main>/)[0];
 assert(!mainContents.has(main), `${p.route}: duplicate main content`);mainContents.add(main);
 assert(html.includes(`id="${p.id}"`));
 assert(extractSection(source, p.id).length > 200);
 assert(source.includes('hero-video'), `${p.source}: source hero preserved`);
}
assert.equal(mainContents.size, sections.length);
console.log('PASS: all distinct topic pages, self canonicals, routes, sitemap, headings and original section targets.');

// Every original content section must have a standalone page. Heroes are the parent pages.
for (const source of ['index.html','foods.html','empresarial.html']) {
 const html=readFileSync(source,'utf8');
 for (const m of html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)) {
  if(m[1]==='inicio') continue;
  assert(sections.some(p=>p.source===source&&p.id===m[1]), source+': missing section page '+m[1]);
 }
}
