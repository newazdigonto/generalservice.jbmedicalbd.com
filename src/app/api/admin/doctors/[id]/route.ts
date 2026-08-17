import { NextRequest, NextResponse } from "next/server";
import { getSession, roleAtLeast } from "@/lib/auth";
import { deleteDoctor, getDoctorById, updateDoctor } from "@/lib/doctors";
import { saveDoctorPhoto } from "@/lib/upload";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!roleAtLeast(session.role, "admin")) {
    return NextResponse.json({ error: "Only Admin or Administrator can edit doctors" }, { status: 403 });
  }

  const id = Number((await params).id);
  const existing = await getDoctorById(id);
  if (!existing) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });

  const form = await req.formData();
  const name = String(form.get("name") ?? "").trim();
  const category = String(form.get("category") ?? "").trim();
  const details = String(form.get("details") ?? "").trim();
  const photo = form.get("photo");

  if (!name || !category) {
    return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
  }

  let photoUrl = existing.photoUrl;
  if (photo instanceof File && photo.size > 0) {
    try {
      photoUrl = await saveDoctorPhoto(photo);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save photo";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  await updateDoctor(id, { name, category, details: details || null, photoUrl });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!roleAtLeast(session.role, "admin")) {
    return NextResponse.json({ error: "Only Admin or Administrator can delete doctors" }, { status: 403 });
  }

  const id = Number((await params).id);
  await deleteDoctor(id);
  return NextResponse.json({ ok: true });
}
