import type { AppointmentRow } from "@/lib/appointments";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BookingsTable({
  rows,
  emptyLabel,
}: {
  rows: AppointmentRow[];
  emptyLabel: string;
}) {
  return (
    <div className="mt-7 rounded-xl border border-border bg-white">
      <div className="border-b border-border-light px-6 py-4 text-[15px] font-semibold text-ink">
        Total: {rows.length}
      </div>
      {rows.length === 0 ? (
        <div className="px-6 py-8 text-[13.5px] text-faint">{emptyLabel}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-border-light text-[12px] text-faint uppercase">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Service / Test</th>
                <th className="px-4 py-3 font-medium">Preferred Date</th>
                <th className="px-6 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFF6]">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-3.5 font-medium text-ink">{row.fullName}</td>
                  <td className="px-4 py-3.5 text-body">{row.phone}</td>
                  <td className="px-4 py-3.5 text-body">{row.service ?? "—"}</td>
                  <td className="px-4 py-3.5 text-body">{row.preferredDate ?? "—"}</td>
                  <td className="px-6 py-3.5 text-faint">{formatDateTime(row.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
