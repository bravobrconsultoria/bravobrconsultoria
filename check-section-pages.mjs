import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sections, generate} from './generate-section-pages.mjs';
const config=JSON.parse(readFileSync('vercel.json','utf8'));
const sitemap=readFileSync('sitemap.xml','utf8');
const ht=readFileSync('.htaccess','utf8');
for(const p of sections){
 const html=readFileSync(p.file,'utf8');
 const original=readFileSync(p.source,'utf8');
 assert.equal(html.slice(html.indexOf('<body')),original.slice(original.indexOf('<body')),p.route+': body unchanged');
 assert.equal(html,generate(p),p.route+': generated file current');
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 const url='https://bravobrconsultoria.com.br'+p.route;
 assert(html.includes(`href="${url}"`));
 const data=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 assert.equal(data.find(d=>d['@type']==='WebPage').url,url);
 assert(config.rewrites.some(r=>r.source===p.route&&r.destination==='/'+p.file));
 assert(ht.includes(`RewriteRule ^${p.route.slice(1)}$ ${p.file} [END]`));
 assert(sitemap.includes(`<loc>${url}</loc><lastmod>2026-11-09</lastmod>`));
 assert(html.includes(`document.getElementById('${p.id}')`));
}
console.log('PASS: 16 section routes, identical bodies, self canonicals, JSON-LD, sitemap and scroll targets.');
import {runInNewContext} from 'node:vm';
for (const p of sections) {
 const html=readFileSync(p.file,'utf8');
 const script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
 for(const hash of ['', '#contato']) {
  let callback, scrolled=false;
  runInNewContext(script,{window:{addEventListener:(event,fn)=>{assert.equal(event,'load');callback=fn;}},location:{hash},document:{getElementById:id=>{assert.equal(id,p.id);return {scrollIntoView:()=>{scrolled=true;}};}}});
  callback();assert.equal(scrolled,!hash);
 }
}
console.log('PASS: section scrolling runs on load and preserves explicit anchors.');
