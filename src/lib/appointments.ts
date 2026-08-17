import type { RowDataPacket } from "mysql2";
import { getPool } from "@/lib/db";

export type AppointmentRow = {
  id: number;
  fullName: string;
  phone: string;
  service: string | null;
  preferredDate: string | null;
  type: "appointment" | "test";
  createdAt: string;
};

export async function listAppointmentsByType(
  type: "appointment" | "test"
): Promise<AppointmentRow[]> {
  const [rows] = await getPool().query<RowDataPacket[]>(
    `SELECT id, full_name AS fullName, phone, service, preferred_date AS preferredDate,
            type, created_at AS createdAt
     FROM appointments
     WHERE type = ?
     ORDER BY created_at DESC`,
    [type]
  );
  return rows as unknown as AppointmentRow[];
}
