import { NextRequest, NextResponse } from "next/server";
import { getSession, roleAtLeast, type AdminRole } from "@/lib/auth";
import { createAdminUser } from "@/lib/users";

const ROLES: AdminRole[] = ["administrator", "admin", "staff"];

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!roleAtLeast(session.role, "administrator")) {
    return NextResponse.json(
      { error: "Only Administrator can create logins" },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { username, password, role } = (body ?? {}) as Record<string, unknown>;

  if (typeof username !== "string" || !username.trim()) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }
  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }
  if (typeof role !== "string" || !ROLES.includes(role as AdminRole)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  try {
    const id = await createAdminUser({
      username: username.trim(),
      password,
      role: role as AdminRole,
    });
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    const code = (err as { code?: string }).code;
    if (code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "That username is already taken" }, { status: 409 });
    }
    console.error("Failed to create admin user:", err);
    return NextResponse.json({ error: "Could not create login" }, { status: 500 });
  }
}
