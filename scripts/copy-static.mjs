import { cpSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const root = process.cwd();
const distPublic = join(root, "dist", "public");
mkdirSync(distPublic, { recursive: true });

// Root public/ (robots, logo, og-image, favicon)
cpSync(join(root, "public"), distPublic, { recursive: true });

// Service content JSON next to the compiled server so cwd-independent load works
cpSync(join(root, "SERVICE_CONTENT_PRIMARY.json"), join(root, "dist", "SERVICE_CONTENT_PRIMARY.json"));
console.log("copy-static: public/ + SERVICE_CONTENT_PRIMARY.json -> dist/");
