import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, roleAtLeast } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin-login");

  const menu = [
    { href: "/admin/doctors", label: "Doctors" },
    { href: "/admin/appointments", label: "Appointments" },
    { href: "/admin/test-bookings", label: "Test Booking" },
    ...(roleAtLeast(session.role, "administrator")
      ? [{ href: "/admin/users", label: "Users" }]
      : []),
  ];

  return (
    <div className="flex min-h-screen bg-bg-soft-2">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border-light bg-white">
        <div className="border-b border-border-light px-6 py-6">
          <Image src="/brand/logo.png" alt="JB Medical Center" width={500} height={97} className="h-9 w-auto" />
          <div className="mt-1 text-[11px] font-semibold tracking-[0.08em] text-faint uppercase">
            Admin Panel
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-4 py-5">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-ink hover:bg-bg-soft hover:text-purple"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border-light px-5 py-4">
          <div className="text-[13.5px] font-medium text-ink">{session.username}</div>
          <div className="mt-0.5 text-[12px] text-faint capitalize">{session.role}</div>
          <div className="mt-3">
            <LogoutButton />
          </div>
        </div>
      </aside>
      <main className="flex-1 px-9 py-9">{children}</main>
    </div>
  );
}
