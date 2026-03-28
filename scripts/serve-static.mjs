import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createServer } from "node:http";

const root = resolve(process.argv[2] ?? "storybook-static");
const port = Number(process.argv[3] ?? "6006");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function safePath(urlPath) {
  const raw = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = normalize(raw).replace(/^(\.\.[/\\])+/, "");
  return normalized === "/" ? "/index.html" : normalized;
}

createServer((request, response) => {
  const relativePath = safePath(request.url ?? "/");
  const filePath = join(root, relativePath);

  if (!existsSync(filePath)) {
    response.statusCode = 404;
    response.end("Not found");
    return;
  }

  const stats = statSync(filePath);
  const resolvedPath = stats.isDirectory() ? join(filePath, "index.html") : filePath;

  if (!existsSync(resolvedPath)) {
    response.statusCode = 404;
    response.end("Not found");
    return;
  }

  response.setHeader("Content-Type", contentTypes[extname(resolvedPath)] ?? "application/octet-stream");
  createReadStream(resolvedPath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}`);
});
