import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { getPool } from "@/lib/db";
import { forwardToCrm } from "@/lib/crm";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { fullName, phone, service, preferredDate } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof fullName !== "string" ||
    !fullName.trim() ||
    typeof phone !== "string" ||
    !phone.trim()
  ) {
    return NextResponse.json(
      { error: "fullName and phone are required" },
      { status: 400 }
    );
  }

  const record = {
    fullName: fullName.trim().slice(0, 190),
    phone: phone.trim().slice(0, 40),
    service: typeof service === "string" ? service.trim().slice(0, 190) || null : null,
    preferredDate:
      typeof preferredDate === "string" ? preferredDate.trim().slice(0, 40) || null : null,
    sourcePath: req.headers.get("referer")?.slice(0, 190) ?? null,
  };

  let insertId: number;
  try {
    const [result] = await getPool().query(
      `INSERT INTO appointments (full_name, phone, service, preferred_date, source_path)
       VALUES (?, ?, ?, ?, ?)`,
      [record.fullName, record.phone, record.service, record.preferredDate, record.sourcePath]
    );
    insertId = (result as { insertId: number }).insertId;
  } catch (err) {
    console.error("Failed to save appointment:", err);
    return NextResponse.json({ error: "Could not save appointment" }, { status: 500 });
  }

  const crmOk = await forwardToCrm({
    id: insertId,
    fullName: record.fullName,
    phone: record.phone,
    service: record.service,
    preferredDate: record.preferredDate,
    sourcePath: record.sourcePath,
    createdAt: new Date().toISOString(),
  });

  if (crmOk) {
    getPool()
      .query("UPDATE appointments SET crm_synced_at = NOW() WHERE id = ?", [insertId])
      .catch((err) => console.error("Failed to mark CRM sync:", err));
  }

  return NextResponse.json({ ok: true, id: insertId }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!process.env.APPOINTMENTS_API_KEY || apiKey !== process.env.APPOINTMENTS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const since = searchParams.get("since");
  const limit = Math.min(Number(searchParams.get("limit") ?? 100) || 100, 500);

  const conditions: string[] = [];
  const params: (string | number)[] = [];
  if (since) {
    conditions.push("created_at > ?");
    params.push(since);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const [rows] = await getPool().query<RowDataPacket[]>(
    `SELECT id, full_name AS fullName, phone, service, preferred_date AS preferredDate,
            source_path AS sourcePath, crm_synced_at AS crmSyncedAt, created_at AS createdAt
     FROM appointments ${where}
     ORDER BY created_at DESC
     LIMIT ?`,
    [...params, limit]
  );

  return NextResponse.json({ appointments: rows });
}
