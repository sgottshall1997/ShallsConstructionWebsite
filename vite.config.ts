import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { COMPANY, yearsText } from "./shared/company";

function companyHtml(): Plugin {
  const tokens: Record<string, string> = {
    "%COMPANY_NAME%": COMPANY.legalName,
    "%COMPANY_SHORT%": COMPANY.name,
    "%COMPANY_URL%": COMPANY.url,
    "%COMPANY_REGION%": COMPANY.regionShort,
    "%COMPANY_RESPONSE%": COMPANY.responsePromise,
    "%COMPANY_YEARS%": yearsText(),
  };
  return {
    name: "company-html",
    transformIndexHtml(html) {
      return Object.entries(tokens).reduce((h, [k, v]) => h.split(k).join(v), html);
    },
  };
}

export default defineConfig({
  plugins: [react(), companyHtml()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: { fs: { strict: true, deny: ["**/.*"] } },
});
