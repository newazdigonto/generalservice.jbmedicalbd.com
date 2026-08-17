import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createDoctor } from "@/lib/doctors";
import { saveDoctorPhoto } from "@/lib/upload";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const name = String(form.get("name") ?? "").trim();
  const category = String(form.get("category") ?? "").trim();
  const details = String(form.get("details") ?? "").trim();
  const photo = form.get("photo");

  if (!name || !category) {
    return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
  }

  let photoUrl: string | null = null;
  if (photo instanceof File && photo.size > 0) {
    try {
      photoUrl = await saveDoctorPhoto(photo);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save photo";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  const id = await createDoctor({
    name,
    category,
    details: details || null,
    photoUrl,
    createdBy: Number(session.sub),
  });

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
