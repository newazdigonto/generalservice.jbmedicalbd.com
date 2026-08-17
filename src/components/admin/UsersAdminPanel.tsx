"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AdminUserSummary } from "@/lib/users";
import type { AdminRole } from "@/lib/auth";

export default function UsersAdminPanel({
  users,
  currentUserId,
}: {
  users: AdminUserSummary[];
  currentUserId: number;
}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminRole>("staff");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim(), password, role }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Could not create login");
      return;
    }
    setUsername("");
    setPassword("");
    setRole("staff");
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("Remove this login? They will no longer be able to sign in.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) router.refresh();
    else alert("Could not remove login.");
  }

  return (
    <div className="mt-7 flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-white p-6">
        <div className="mb-4 text-[15px] font-semibold text-ink">Add Login</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="rounded-lg border border-border-input px-3.5 py-2.5 text-[14px]"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 8 characters)"
              type="password"
              required
              className="rounded-lg border border-border-input px-3.5 py-2.5 text-[14px]"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
              className="rounded-lg border border-border-input px-3.5 py-2.5 text-[14px]"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
              <option value="administrator">Administrator</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="self-start rounded-full bg-purple px-6 py-2.5 text-[13.5px] font-medium text-white hover:bg-purple-dark disabled:opacity-60"
          >
            {submitting ? "Creating…" : "Create login"}
          </button>
          {error && <div className="text-[13px] text-red-600">{error}</div>}
        </form>
      </div>

      <div className="rounded-xl border border-border bg-white">
        <div className="border-b border-border-light px-6 py-4 text-[15px] font-semibold text-ink">
          All Logins ({users.length})
        </div>
        <div className="divide-y divide-[#F2EFF6]">
          {users.map((u) => (
            <div key={u.id} className="flex items-center gap-4 px-6 py-4">
              <div className="flex-1">
                <div className="text-[14.5px] font-semibold text-ink">
                  {u.username}
                  {u.id === currentUserId && (
                    <span className="ml-2 text-[12px] font-normal text-faint">(you)</span>
                  )}
                </div>
                <div className="text-[12.5px] text-faint capitalize">{u.role}</div>
              </div>
              {u.id !== currentUserId && (
                <button
                  type="button"
                  onClick={() => handleDelete(u.id)}
                  disabled={deletingId === u.id}
                  className="text-[13px] font-medium text-red-600 hover:text-red-700 disabled:opacity-60"
                >
                  {deletingId === u.id ? "Removing…" : "Remove"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
