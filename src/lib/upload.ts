import { mkdir, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { randomUUID } from "node:crypto";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};
const MAX_BYTES = 5 * 1024 * 1024;

// Deliberately outside .next — the standalone build output (.next/standalone)
// is regenerated from scratch on every `npm run build`, which would silently
// delete anything saved under it. UPLOADS_DIR should point somewhere that
// survives rebuilds; see CPANEL-DEPLOY.txt. Defaults to a folder next to the
// project for local development, where there is no standalone/rebuild step.
export function uploadsRoot() {
  return process.env.UPLOADS_DIR || join(process.cwd(), "uploads");
}

/** Saves an uploaded doctor photo and returns its public URL path (served by /uploads/doctors/[filename]). */
export async function saveDoctorPhoto(file: File): Promise<string> {
  if (!(file.type in ALLOWED_TYPES)) {
    throw new Error("Photo must be a JPEG, PNG, or WebP image");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Photo must be smaller than 5MB");
  }

  const dir = join(uploadsRoot(), "doctors");
  await mkdir(dir, { recursive: true });

  const ext = ALLOWED_TYPES[file.type] || extname(file.name) || "";
  const filename = `${randomUUID()}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(join(dir, filename), bytes);

  return `/uploads/doctors/${filename}`;
}
