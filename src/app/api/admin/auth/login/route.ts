import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { getPool } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { createSessionToken, SESSION_COOKIE, type AdminRole } from "@/lib/auth";

type AdminUserRow = RowDataPacket & {
  id: number;
  username: string;
  password_hash: string;
  role: AdminRole;
};

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { username, password } = (body ?? {}) as Record<string, unknown>;
  if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  const [rows] = await getPool().query<AdminUserRow[]>(
    "SELECT id, username, password_hash, role FROM admin_users WHERE username = ? LIMIT 1",
    [username.trim()]
  );
  const user = rows[0];

  const invalid = () =>
    NextResponse.json({ error: "Invalid username or password" }, { status: 401 });

  if (!user) return invalid();

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) return invalid();

  const token = await createSessionToken({
    sub: String(user.id),
    username: user.username,
    role: user.role,
  });

  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
