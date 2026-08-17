import { listAppointmentsByType } from "@/lib/appointments";
import BookingsTable from "@/components/admin/BookingsTable";

export default async function AdminTestBookingsPage() {
  const rows = await listAppointmentsByType("test");

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-ink">Test Booking</h1>
      <p className="mt-1.5 text-[13.5px] text-faint">
        Health check / lab test package bookings made from the Health Checkup page,
        newest first.
      </p>
      <BookingsTable rows={rows} emptyLabel="No test bookings yet." />
    </div>
  );
}
