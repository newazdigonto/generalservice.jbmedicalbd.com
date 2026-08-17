// Creates (or resets the password of) an admin panel login.
// Usage:  node scripts/create-admin-user.mjs <username> <password> <role>
//   role is one of: administrator, admin, staff
//
// Run this from the cPanel Terminal after `npm install`, with the app's
// environment variables active (see CPANEL-DEPLOY.txt) — or locally with a
// .env.local file present, for development.

import { readFileSync, existsSync } from "node:fs";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

function loadDotEnvFallback() {
  if (process.env.DB_HOST) return; // already provided by the real environment
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}

const ROLES = ["administrator", "admin", "staff"];

async function main() {
  const [username, password, role] = process.argv.slice(2);

  if (!username || !password || !role) {
    console.error("Usage: node scripts/create-admin-user.mjs <username> <password> <role>");
    console.error(`Role must be one of: ${ROLES.join(", ")}`);
    process.exit(1);
  }
  if (!ROLES.includes(role)) {
    console.error(`Invalid role "${role}". Must be one of: ${ROLES.join(", ")}`);
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  loadDotEnvFallback();

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const passwordHash = await bcrypt.hash(password, 12);

  await pool.query(
    `INSERT INTO admin_users (username, password_hash, role)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role = VALUES(role)`,
    [username, passwordHash, role]
  );

  console.log(`OK — "${username}" is now a ${role} login.`);
  await pool.end();
}

main().catch((err) => {
  console.error("Failed to create/update admin user:", err.message);
  process.exit(1);
});
