import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { getPool } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import type { AdminRole } from "@/lib/auth";

export type AdminUserSummary = {
  id: number;
  username: string;
  role: AdminRole;
  createdAt: string;
};

export async function listAdminUsers(): Promise<AdminUserSummary[]> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    "SELECT id, username, role, created_at AS createdAt FROM admin_users ORDER BY created_at ASC"
  );
  return rows as unknown as AdminUserSummary[];
}

export async function createAdminUser(input: {
  username: string;
  password: string;
  role: AdminRole;
}): Promise<number> {
  const passwordHash = await hashPassword(input.password);
  const [result] = await getPool().query<ResultSetHeader>(
    "INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)",
    [input.username, passwordHash, input.role]
  );
  return result.insertId;
}

export async function deleteAdminUser(id: number): Promise<void> {
  await getPool().query("DELETE FROM admin_users WHERE id = ?", [id]);
}
