import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const config = JSON.parse(readFileSync("vercel.json", "utf8"));
const patterns = config.builds.map(({ src, use }) => {
  assert.equal(
    use,
    "@vercel/static",
    "Production must not invoke Node functions",
  );
  return new RegExp(
    "^" +
      src
        .split("**")
        .map((part) =>
          part
            .split("*")
            .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
            .join("[^/]*"),
        )
        .join(".*") +
      "$",
  );
});
const published = (path) => patterns.some((pattern) => pattern.test(path));
for (const path of [
  "server.mjs",
  "package.json",
  ".env",
  "README.md",
  "check.mjs",
])
  assert(!published(path), `${path} must not be deployed`);
for (const page of [
  "index.html",
  "foods.html",
  "empresarial.html",
  "privacidade.html",
  "404.html",
  "styles.css",
  "app.js",
  "robots.txt",
  "sitemap.xml",
]) {
  assert(published(page), `${page} is missing from deployment`);
  if (page === "app.js") continue; // Dynamic case image paths are validated by check.mjs.
  const text = readFileSync(page, "utf8");
  const links = [
    ...text.matchAll(
      /(?:src|href|poster|data-src)="([^"]+)"|url\(["']?([^"')]+)["']?\)/g,
    ),
  ];
  for (const link of links) {
    let path = (link[1] || link[2]).split("#")[0];
    if (!path || /^(https?:|mailto:|tel:|data:)/.test(path)) continue;
    path = path.replace(/^\//, "").replace(/^\.\//, "");
    if (!path) path = "index.html";
    if (["foods", "empresarial"].includes(path)) path += ".html";
    assert(
      existsSync(path) && published(path),
      `${page}: unpublished resource ${path}`,
    );
  }
}
for (const vertical of ["foods", "empresarial"])
  assert(
    config.rewrites.some(
      (rule) =>
        rule.source === `/${vertical}` &&
        rule.destination === `/${vertical}.html`,
    ),
  );
console.log(
  "PASS: Vercel static publication, resources, routes and excluded server files.",
);
