import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { getPool } from "@/lib/db";

export type Doctor = {
  id: number;
  name: string;
  category: string;
  details: string | null;
  photoUrl: string | null;
  createdAt: string;
};

type DoctorRow = RowDataPacket & {
  id: number;
  name: string;
  category: string;
  details: string | null;
  photo_url: string | null;
  created_at: string;
};

const SELECT_COLUMNS = `
  id, name, category, details, photo_url AS photoUrl, created_at AS createdAt
`;

export async function listDoctors(): Promise<Doctor[]> {
  const [rows] = await getPool().query<DoctorRow[]>(
    `SELECT ${SELECT_COLUMNS} FROM doctors ORDER BY category ASC, name ASC`
  );
  return rows as unknown as Doctor[];
}

export async function getDoctorsGroupedByCategory(): Promise<
  { category: string; doctors: Doctor[] }[]
> {
  const doctors = await listDoctors();
  const groups = new Map<string, Doctor[]>();
  for (const doc of doctors) {
    if (!groups.has(doc.category)) groups.set(doc.category, []);
    groups.get(doc.category)!.push(doc);
  }
  return Array.from(groups.entries()).map(([category, docs]) => ({
    category,
    doctors: docs,
  }));
}

export async function getDoctorById(id: number): Promise<Doctor | null> {
  const [rows] = await getPool().query<DoctorRow[]>(
    `SELECT ${SELECT_COLUMNS} FROM doctors WHERE id = ? LIMIT 1`,
    [id]
  );
  return (rows[0] as unknown as Doctor) ?? null;
}

export async function createDoctor(input: {
  name: string;
  category: string;
  details: string | null;
  photoUrl: string | null;
  createdBy: number;
}): Promise<number> {
  const [result] = await getPool().query<ResultSetHeader>(
    `INSERT INTO doctors (name, category, details, photo_url, created_by) VALUES (?, ?, ?, ?, ?)`,
    [input.name, input.category, input.details, input.photoUrl, input.createdBy]
  );
  return result.insertId;
}

export async function updateDoctor(
  id: number,
  input: { name: string; category: string; details: string | null; photoUrl: string | null }
): Promise<void> {
  await getPool().query(
    `UPDATE doctors SET name = ?, category = ?, details = ?, photo_url = ? WHERE id = ?`,
    [input.name, input.category, input.details, input.photoUrl, id]
  );
}

export async function deleteDoctor(id: number): Promise<void> {
  await getPool().query(`DELETE FROM doctors WHERE id = ?`, [id]);
}
