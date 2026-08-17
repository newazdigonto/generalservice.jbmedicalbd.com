import { getSession } from "@/lib/auth";
import { listDoctors } from "@/lib/doctors";
import DoctorsAdminPanel from "@/components/admin/DoctorsAdminPanel";

export default async function AdminDoctorsPage() {
  const session = await getSession();
  const doctors = await listDoctors();

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-ink">Doctors</h1>
      <p className="mt-1.5 text-[13.5px] text-faint">
        {session?.role === "staff"
          ? "You can add new doctors. Editing and deleting require an Admin or Administrator login."
          : "Add, edit, or remove doctor profiles shown on the public site."}
      </p>
      <DoctorsAdminPanel doctors={doctors} role={session?.role ?? "staff"} />
    </div>
  );
}
