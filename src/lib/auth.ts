import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type AdminRole = "staff" | "admin" | "administrator";

export type SessionPayload = {
  sub: string;
  username: string;
  role: AdminRole;
};

export const SESSION_COOKIE = "admin_session";

const ROLE_RANK: Record<AdminRole, number> = {
  staff: 1,
  admin: 2,
  administrator: 3,
};

export function roleAtLeast(role: AdminRole, minimum: AdminRole) {
  return ROLE_RANK[role] >= ROLE_RANK[minimum];
}

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Add a long random string to your environment variables."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      typeof payload.sub !== "string" ||
      typeof payload.username !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/** Server Components / Route Handlers only (reads the cookie jar via next/headers). */
export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
