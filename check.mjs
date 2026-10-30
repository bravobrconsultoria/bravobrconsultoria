import { readFileSync, existsSync, statSync } from "node:fs";
import assert from "node:assert/strict";
const pages = [
  "index.html",
  "foods.html",
  "empresarial.html",
  "privacidade.html",
  "404.html",
];
const routes = {
  "/": "index.html",
  "/foods": "foods.html",
  "/empresarial": "empresarial.html",
};
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: needs one h1`);
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<meta name="viewport"/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
  for (const m of html.matchAll(/(?:src|href|poster|data-src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    if (url.startsWith("#")) {
      assert(ids.includes(url.slice(1)), `${file}: missing anchor ${url}`);
      continue;
    }
    const [pathname, anchor] = url.split("#");
    const path =
      routes[pathname] ||
      (pathname === "./" ? "index.html" : pathname.replace(/^\//, ""));
    assert(existsSync(path), `${file}: missing ${path}`);
    assert(statSync(path).size > 0, `${file}: empty ${path}`);
    if (anchor)
      assert(
        readFileSync(path, "utf8").includes(`id="${anchor}"`),
        `${file}: missing cross-page anchor ${url}`,
      );
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    assert(/\balt=/.test(m[0]), `${file}: image without alt`);
    assert(
      /\bwidth=/.test(m[0]) && /\bheight=/.test(m[0]),
      `${file}: image without dimensions`,
    );
  }
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([^<]+)<\/script>/g,
  ))
    JSON.parse(m[1]);
  for (const m of html.matchAll(/aria-controls="([^"]+)"/g))
    assert(ids.includes(m[1]), `${file}: missing panel ${m[1]}`);
  assert(
    !/foods@bravobr\.com\.br|instagram\.com\/bravobrfoods/.test(html),
    `${file}: retired contact`,
  );
  for (const match of html.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/g)) {
    for (const entry of match[1].split(",")) {
      const asset = entry.trim().split(/\s+/)[0].replace(/^\//, "");
      assert(existsSync(asset), `${file}: missing responsive asset ${asset}`);
    }
  }
}
for (const [route, file] of Object.entries(routes)) {
  const page = readFileSync(file, "utf8");
  assert(
    page.includes(`href="https://bravobrconsultoria.com.br${route}"`),
    `${file}: canonical route`,
  );
  const caseIds = [...page.matchAll(/data-case="(\d+)"/g)].map(
    (match) => match[1],
  );
  const expected =
    route === "/foods"
      ? ["1"]
      : route === "/empresarial"
        ? ["0", "2", "3"]
        : ["0", "1", "2", "3"];
  assert.deepEqual(caseIds, expected, `${file}: editorial case selection`);
  for (const match of page.matchAll(
    /data-(?:case-go|case-detail|client)="(\d+)"/g,
  ))
    assert(
      caseIds.includes(match[1]),
      `${file}: control points to an absent case`,
    );
}
const html = readFileSync("index.html", "utf8");
for (const m of html.matchAll(/aria-controls="([^"]+)"/g))
  assert(html.includes(`id="${m[1]}"`), `Missing control target ${m[1]}`);
assert(
  !/aggregateRating|ratingValue|reviewCount/.test(html),
  "No unverified ratings",
);
for (const brand of ["consultoria", "empresarial"])
  assert(
    statSync(`assets/web/${brand}-hero.mp4`).size < 3 * 1024 * 1024,
    `${brand}: hero exceeds budget`,
  );
assert.match(html, /bravobrconsultoria.com.br/);
assert(
  statSync("assets/foods/videos/hero-web.mp4").size < 3 * 1024 * 1024,
  "Hero exceeds budget",
);
console.log(
  "PASS: page structure, anchors, assets, dimensions, metadata, panel targets and video budget.",
);
