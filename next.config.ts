import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces .next/standalone with a self-contained server.js — the simplest
  // artifact to run under cPanel's "Setup Node.js App" (Passenger). See README.
  output: "standalone",
};

export default nextConfig;
