import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DoctorSchedule from "@/components/DoctorSchedule";
import { getDoctorById } from "@/lib/doctors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const doctor = Number.isFinite(Number(id)) ? await getDoctorById(Number(id)) : null;
  return { title: doctor ? `${doctor.name} — JB Medical Center` : "Doctor — JB Medical Center" };
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctorId = Number(id);
  const doctor = Number.isFinite(doctorId) ? await getDoctorById(doctorId) : null;
  if (!doctor) notFound();

  return (
    <section className="bg-bg-soft-2 pb-15">
      <div className="flex flex-wrap gap-2 px-[6vw] py-5.5 text-[13.5px] text-muted">
        <Link href="/" className="text-muted hover:text-purple">
          Home
        </Link>
        <span>›</span>
        <Link href="/doctors" className="text-muted hover:text-purple">
          Our Doctors
        </Link>
        <span>›</span>
        <span className="text-ink">{doctor.name}</span>
      </div>
      <div className="mx-[6vw] grid grid-cols-1 items-start gap-12 bg-white px-[6vw] py-11.5 sm:grid-cols-[1fr_minmax(260px,380px)] sm:py-13.5">
        <div>
          <h1 className="m-0 text-[30px] leading-[1.15] font-semibold sm:text-[42px]">
            {doctor.name}
          </h1>
          <div className="mt-3.5 text-[14px] font-semibold tracking-[0.04em] text-body uppercase">
            {doctor.category}
          </div>
          {doctor.details && (
            <p className="mt-8.5 text-[14.5px] leading-[1.8] whitespace-pre-line text-pretty text-body">
              {doctor.details}
            </p>
          )}
          <DoctorSchedule doctorName={doctor.name} />
        </div>
        {doctor.photoUrl ? (
          <div className="relative h-80 sm:h-[620px]">
            <Image
              src={doctor.photoUrl}
              alt={doctor.name}
              fill
              sizes="(min-width: 640px) 380px, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="placeholder-media flex h-80 items-end justify-center p-3 sm:h-[620px]">
            <span className="font-mono text-[10.5px] text-[#6E6488]">
              [ portrait 900×1100 ]
            </span>
          </div>
        )}
      </div>
      <p className="mt-8.5 max-w-[1000px] px-[6vw] text-[14.5px] leading-[1.8] text-body">
        Thank you for choosing JB Medical Center. Requests do not guarantee a
        confirmed appointment — our team will call to confirm your booking and time
        slot. For urgent assistance, call +880 1965-544401.
      </p>
    </section>
  );
}
