// Next.js "standalone" output does not automatically include the public/
// folder or the .next/static assets — it expects the deployer to copy them
// in by hand. Doing it here as a postbuild step means `npm run build` alone
// produces a directory (.next/standalone) that is ready to run as-is, which
// is what the cPanel deployment guide (CPANEL-DEPLOY.txt) relies on.
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error("copy-standalone-assets: .next/standalone not found — did the build run with output: 'standalone'?");
  process.exit(1);
}

cpSync(join(root, "public"), join(standalone, "public"), { recursive: true });
cpSync(join(root, ".next", "static"), join(standalone, ".next", "static"), { recursive: true });

console.log("copy-standalone-assets: copied public/ and .next/static into .next/standalone");
