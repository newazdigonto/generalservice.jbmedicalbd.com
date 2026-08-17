import { NextRequest, NextResponse } from "next/server";
import { getSession, roleAtLeast } from "@/lib/auth";
import { deleteAdminUser } from "@/lib/users";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!roleAtLeast(session.role, "administrator")) {
    return NextResponse.json(
      { error: "Only Administrator can remove logins" },
      { status: 403 }
    );
  }

  const id = Number((await params).id);
  if (id === Number(session.sub)) {
    return NextResponse.json({ error: "You cannot remove your own login" }, { status: 400 });
  }

  await deleteAdminUser(id);
  return NextResponse.json({ ok: true });
}
