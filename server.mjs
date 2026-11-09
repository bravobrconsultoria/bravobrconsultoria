import { sections } from "./generate-section-pages.mjs";
import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";
const root = process.cwd();
function notFound(res) {
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  createReadStream(resolve(root, "404.html"))
    .on("error", () => res.end("Página não encontrada"))
    .pipe(res);
}
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
  } catch {
    res.writeHead(400).end();
    return;
  }
  const routes = {
    ...Object.fromEntries(sections.map(p => [p.route, "/" + p.file])),
    "/": "/index.html",
    "/foods": "/foods.html",
    "/empresarial": "/empresarial.html",
  };
  const canonical = {
    ...Object.fromEntries(sections.flatMap(p => [["/" + p.file, p.route], [p.route + "/", p.route]])),
    "/index.html": "/",
    "/foods.html": "/foods",
    "/foods/": "/foods",
    "/empresarial.html": "/empresarial",
    "/empresarial/": "/empresarial",
  };
  if (canonical[pathname]) {
    res.writeHead(301, { Location: canonical[pathname] }).end();
    return;
  }
  pathname = routes[pathname] || pathname;
  const path = resolve(
    root,
    "." + (pathname === "/" ? "/index.html" : pathname),
  );
  const allowed = [
    ...sections.map(p => p.file),
    "index.html",
    "foods.html",
    "empresarial.html",
    "privacidade.html",
    "404.html",
    "styles.css",
    "app.js",
    "robots.txt",
    "sitemap.xml",
  ];
  const publicPath =
    allowed.includes(pathname.slice(1)) ||
    pathname === "/" ||
    pathname.startsWith("/assets/");
  if (
    !path.startsWith(root + sep) ||
    !publicPath ||
    pathname.split("/").some((s) => s.startsWith("."))
  ) {
    notFound(res);
    return;
  }
  let stat;
  try {
    stat = statSync(path);
    if (!stat.isFile()) throw new Error();
  } catch {
    notFound(res);
    return;
  }
  const headers = {
    "Content-Type": types[extname(path)] || "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Cache-Control": "no-cache",
    "Accept-Ranges": "bytes",
  };
  const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if (range) {
    const start = Number(range[1]),
      end = range[2]
        ? Math.min(Number(range[2]), stat.size - 1)
        : stat.size - 1;
    if (start > end || start >= stat.size) {
      res.writeHead(416, { "Content-Range": `bytes */${stat.size}` }).end();
      return;
    }
    res.writeHead(206, {
      ...headers,
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Content-Length": end - start + 1,
    });
    createReadStream(path, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { ...headers, "Content-Length": stat.size });
    if (req.method === "HEAD") res.end();
    else createReadStream(path).pipe(res);
  }
}).listen(4173, "127.0.0.1", () =>
  console.log("Bravo BR Consultoria: http://127.0.0.1:4173"),
);
