import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Book Appointment — JB Medical Center",
  description: "Tell us when to expect you.",
};

export default async function BookAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; doctor?: string }>;
}) {
  const { service, doctor } = await searchParams;
  const initialService = doctor ? `Consultation with ${doctor}` : service;

  return (
    <section className="grid grid-cols-1 items-start gap-14 px-[6vw] py-15 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:py-22.5">
      <div>
        <div className="text-[12px] font-semibold tracking-[0.1em] text-purple uppercase">
          Book Appointment
        </div>
        <h1 className="mt-3.5 text-[30px] font-semibold sm:text-[42px]">
          Tell us when to expect you
        </h1>
        <p className="mt-4.5 text-[15px] leading-[1.75] text-body">
          Requests are confirmed by phone. For same-day tests, call {contact.phone}{" "}
          directly.
        </p>
        <BookingForm initialService={initialService} />
      </div>
      <div className="rounded-[18px] bg-bg-soft px-7.5 py-8.5">
        <div className="text-[17px] font-semibold">Visiting</div>
        <div className="mt-4 text-[14.5px] leading-[1.9] text-body">
          {contact.address}
          <br />
          {contact.phone}
        </div>
        <div className="mt-6.5 text-[13px] tracking-[0.08em] text-faint uppercase">
          Also available
        </div>
        <div className="mt-3 flex flex-col gap-2.5 text-[14.5px] text-[#3E3860]">
          <span>Video consultation</span>
          <span>Home sample collection</span>
          <span>Home health visit</span>
        </div>
      </div>
    </section>
  );
}
