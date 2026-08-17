import { redirect } from "next/navigation";
import { getSession, roleAtLeast } from "@/lib/auth";
import { listAdminUsers } from "@/lib/users";
import UsersAdminPanel from "@/components/admin/UsersAdminPanel";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session || !roleAtLeast(session.role, "administrator")) {
    redirect("/admin/doctors");
  }

  const users = await listAdminUsers();

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-ink">Users</h1>
      <p className="mt-1.5 text-[13.5px] text-faint">
        Create or remove Admin and Staff logins for the admin panel.
      </p>
      <UsersAdminPanel users={users} currentUserId={Number(session.sub)} />
    </div>
  );
}
