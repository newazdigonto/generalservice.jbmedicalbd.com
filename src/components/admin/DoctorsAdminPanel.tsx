"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Doctor } from "@/lib/doctors";
import type { AdminRole } from "@/lib/auth";
import DoctorForm from "./DoctorForm";

const ROLE_RANK: Record<AdminRole, number> = { staff: 1, admin: 2, administrator: 3 };
const canManage = (role: AdminRole) => ROLE_RANK[role] >= ROLE_RANK.admin;

export default function DoctorsAdminPanel({
  doctors,
  role,
}: {
  doctors: Doctor[];
  role: AdminRole;
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm("Delete this doctor profile? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) router.refresh();
    else alert("Could not delete doctor.");
  }

  return (
    <div className="mt-7 flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-white p-6">
        <div className="mb-4 text-[15px] font-semibold text-ink">Add Doctor</div>
        <DoctorForm onDone={() => router.refresh()} />
      </div>

      <div className="rounded-xl border border-border bg-white">
        <div className="border-b border-border-light px-6 py-4 text-[15px] font-semibold text-ink">
          All Doctors ({doctors.length})
        </div>
        {doctors.length === 0 && (
          <div className="px-6 py-8 text-[13.5px] text-faint">
            No doctors yet — add the first one above.
          </div>
        )}
        <div className="divide-y divide-[#F2EFF6]">
          {doctors.map((doc) =>
            editingId === doc.id ? (
              <div key={doc.id} className="px-6 py-5">
                <DoctorForm
                  doctor={doc}
                  onDone={() => {
                    setEditingId(null);
                    router.refresh();
                  }}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div key={doc.id} className="flex items-center gap-4 px-6 py-4">
                {doc.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={doc.photoUrl}
                    alt={doc.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-bg-soft" />
                )}
                <div className="flex-1">
                  <div className="text-[14.5px] font-semibold text-ink">{doc.name}</div>
                  <div className="text-[12.5px] text-faint">{doc.category}</div>
                </div>
                {canManage(role) && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingId(doc.id)}
                      className="text-[13px] font-medium text-purple hover:text-purple-dark"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(doc.id)}
                      disabled={deletingId === doc.id}
                      className="text-[13px] font-medium text-red-600 hover:text-red-700 disabled:opacity-60"
                    >
                      {deletingId === doc.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
