import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { ALL_ROUTES } from "@shared/routes";
import { COMPANY } from "@shared/company";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, { index: false }));

  // Unknown API paths -> JSON 404 (never the SPA shell)
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  const known = new Set(ALL_ROUTES);
  const projectPaths = new Set(COMPANY.projects.map((p) => `/projects/${p.slug}`));

  // SPA shell: 200 for routed pages, 404 (same shell, renders NotFound) otherwise.
  // Paths that look like files (have an extension) stay 404 without the SPA shell.
  app.use("*", (req, res) => {
    const p = req.baseUrl || req.path;
    if (/\.[a-zA-Z0-9]{1,8}$/.test(p) && !known.has(p)) {
      return res.status(404).type("text/plain").send("Not found");
    }
    const status = known.has(p) || projectPaths.has(p) ? 200 : 404;
    res.status(status).sendFile(path.resolve(distPath, "index.html"));
  });
}
