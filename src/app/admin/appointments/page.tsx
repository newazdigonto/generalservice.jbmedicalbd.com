import { listAppointmentsByType } from "@/lib/appointments";
import BookingsTable from "@/components/admin/BookingsTable";

export default async function AdminAppointmentsPage() {
  const rows = await listAppointmentsByType("appointment");

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-ink">Appointments</h1>
      <p className="mt-1.5 text-[13.5px] text-faint">
        Every consultation / service booking made from the site, newest first.
      </p>
      <BookingsTable rows={rows} emptyLabel="No appointments booked yet." />
    </div>
  );
}
